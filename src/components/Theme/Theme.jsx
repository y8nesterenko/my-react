import React from "react";
import style from "./Theme.module.css";

const Theme = (props) => {
  const setFontSize = (e, size) => {
    document
      .querySelectorAll(".chooseSize span")
      .forEach((span) => span.classList.remove(style.active));
    e.target.classList.toggle(style.active);
    document.querySelector("html").style.fontSize = size;
  };

  const setColor = (e, color) => {
    document
      .querySelectorAll(".chooseColor span")
      .forEach((span) => span.classList.remove(style.active));
    e.target.classList.toggle(style.active);
    document
      .querySelector(":root")
      .style.setProperty("--primary-color-hue", color);
  };

  const setBackgroundColor = (e, light, white, dark) => {
    document
      .querySelectorAll(".chooseBg div")
      .forEach((span) => span.classList.remove(style.active));
    if (e.target.matches("div")) {
      e.target.classList.toggle(style.active);
    }
    e.target.parentElement.classList.toggle(style.active);
    let root = document.querySelector(":root").style;
    root.setProperty("--light-color-lightness", light);
    root.setProperty("--white-color-lightness", white);
    root.setProperty("--dark-color-lightness", dark);
  };

  return (
    <div className={style.customizeTheme}>
      <div className={style.card}>
        <h2>Customize your view</h2>
        <p className="textMuted">Manage your font size, color and background</p>

        {/* --------------FONT-SIZES-------------- */}
        <div className={style.fontSize}>
          <h4>Font Size</h4>
          <div>
            <h6>Aa</h6>
            <div className={`chooseSize ${style.chooseSize}`}>
              <span
                onClick={(e) => setFontSize(e, "10px")}
                className={style.fontSize1}
              ></span>
              <span
                onClick={(e) => setFontSize(e, "13px")}
                className={style.fontSize2}
              ></span>
              <span
                onClick={(e) => setFontSize(e, "16px")}
                className={style.fontSize3 + " " + style.active}
              ></span>
              <span
                onClick={(e) => setFontSize(e, "19px")}
                className={style.fontSize4}
              ></span>
              <span
                onClick={(e) => setFontSize(e, "22px")}
                className={style.fontSize5}
              ></span>
            </div>
            <h3>Aa</h3>
          </div>
        </div>

        {/*--------------PRIMARY COLORS--------------*/}
        <div className={style.color}>
          <h4>Color</h4>
          <div className={`chooseColor ${style.chooseColor}`}>
            <span
              className={style.color1 + " " + style.active}
              onClick={(e) => setColor(e, 252)}
            ></span>
            <span
              className={style.color2}
              onClick={(e) => setColor(e, 52)}
            ></span>
            <span
              className={style.color3}
              onClick={(e) => setColor(e, 352)}
            ></span>
            <span
              className={style.color4}
              onClick={(e) => setColor(e, 152)}
            ></span>
            <span
              className={style.color5}
              onClick={(e) => setColor(e, 202)}
            ></span>
          </div>
        </div>

        {/*--------------BACKGROUND COLORS--------------*/}
        <div className={style.background}>
          <h4>Background</h4>
          <div className={`chooseBg ${style.chooseBg}`}>
            <div
              className={style.bg1 + " " + style.active}
              onClick={(e) => setBackgroundColor(e, "95%", "100%", "17%")}
            >
              <span></span>
              <h5 htmlFor={style.bg1}>Light</h5>
            </div>
            <div
              className={style.bg2}
              onClick={(e) => setBackgroundColor(e, "30%", "20%", "85%")}
            >
              <span></span>
              <h5 htmlFor={style.bg2}>Dim</h5>
            </div>
            <div
              className={style.bg3}
              onClick={(e) => setBackgroundColor(e, "10%", "10%", "100%")}
            >
              <span></span>
              <h5 htmlFor={style.bg3}>Lights Out</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theme;
