import h from "@macrostrat/hyper";
import { render } from "react-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./main.styl";

const position = [16.5, 76];
const map = h(Map, { center: position, zoom: 10 }, [
  h(TileLayer, {
    url: "http://0.0.0.0:8080/ctx-global/{z}/{x}/{y}.png",
    attribution:
      "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
  }),
]);

const base = document.createElement("div");
base.id = "map-container";
document.body.appendChild(base);

render(map, base);