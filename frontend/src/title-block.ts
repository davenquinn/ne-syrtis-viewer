import { hyperStyled } from "@macrostrat/hyper";
import styles from "./main.styl";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DisplayQuality } from "cesium-viewer";

const h = hyperStyled(styles);

const Link = ({ to, children, ...rest }) => {
  return h(
    "li",
    null,
    h(NavLink, { to, activeClassName: styles["is-active"], ...rest }, children)
  );
};

const Control = (props) => {
  const { options, title, onChange, selected } = props;
  return h("span.control", [
    h("span.control-title", title + ":"),
    h(
      Object.entries(options).map((d) => {
        const onClick = () => onChange(d[1]);
        let main;
        if (d[1] == selected) {
          main = h("span.option.selected", { key: d[0] }, d[0]);
        } else {
          main = h("a.option", { href: "#", onClick, key: d[0] }, d[0]);
        }
        return h([" ", main]);
      })
    ),
  ]);
};

const QualityControl = () => {
  const selected = useSelector((s) => s.displayQuality);
  const options = {
    low: DisplayQuality.Low,
    high: DisplayQuality.High,
  };
  return h(Control, { title: "Quality", options, selected });
};

const ExaggerationControl = () => {
  const selected = useSelector((s) => s.verticalExaggeration);
  const options = {
    none: 1,
    "1.5x": 1.5,
    "2x": 2,
  };
  return h(Control, { title: "terrain exaggeration", options, selected });
};

const MiniControls = () => {
  return h("div.mini-controls", [
    h(QualityControl),
    ", ",
    h(ExaggerationControl),
    ".",
  ]);
};

const SoftwareInfo = () => {
  return h("div.software-info", [
    h("p.version", "v0.1 – July 2020"),
    h(
      "p.directions",
      "Navigate by scrolling or with arrow keys. \
       Drag the 3D display to pan, Ctrl+drag to rotate."
    ),
    h(MiniControls),
  ]);
};

const TitleBlock = () => {
  return h("div.title-block", [
    h("h1.title", [
      "Jezero Crater's context within northeast Syrtis Major",
      h("span.subtitle", " — a multiscale interactive exploration"),
    ]),
    h("div.auth-affil", [
      h(
        "h3.author",
        null,
        h("a", { href: "https://davenquinn.com" }, "Daven Quinn")
      ),
      h("h4.affiliation", [
        "University of Wisconsin – Madison, ",
        h("a", { href: "https://macrostrat.org" }, "Macrostrat"),
      ]),
    ]),
    h(SoftwareInfo),
    h(
      "nav",
      null,
      h("ul", [
        h(Link, { to: "/", exact: true }, "Story"),
        h(Link, { to: "/about" }, "The viewer"),
        h(Link, { to: "/list", className: styles["positions"] }, "#"),
      ])
    ),
  ]);
};

export { TitleBlock, Link };