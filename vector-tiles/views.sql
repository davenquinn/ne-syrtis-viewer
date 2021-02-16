DROP MATERIALIZED VIEW map_units;
CREATE MATERIALIZED VIEW map_units AS
WITH units AS (
SELECT
	unit_name AS "name",
	ST_Transform(wkb_geometry, 900916) geometry,
	'watershed_goudge' source
FROM watershed_goudge.units
UNION ALL
SELECT
	name,
	ST_Transform(shape, 900916) geometry,
	'jezero_usgs' source
FROM jezero_usgs.units
UNION ALL
SELECT
	unit_id,
	ST_Transform(wkb_geometry, 900916) geometry,
	'sulfates_quinn' source
FROM sulfates_quinn.units
WHERE unit_id NOT IN ('noachian')
)
SELECT
	row_number() OVER (),
	*
FROM units;

CREATE INDEX map_units_geometry_index
  ON map_units
  USING GIST (geometry);


-- NOTE: Symbology for Jezero USGS map can be found at
-- https://planetarymapping.wr.usgs.gov/interactive/sim3464
INSERT INTO unit_symbology (unit_id, map_id)
SELECT DISTINCT ON (name, source) name, source FROM map_units
ON CONFLICT DO NOTHING;