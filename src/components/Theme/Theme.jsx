import React from "react";
import style from "./Theme.module.css";

const Theme = (props) => {
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
            <div className={style.chooseSize}>
              <span className={style.fontSize1 + " " + style.active}></span>
              <span className={style.fontSize2}></span>
              <span className={style.fontSize3}></span>
              <span className={style.fontSize4}></span>
              <span className={style.fontSize5}></span>
            </div>
            <h3>Aa</h3>
          </div>
        </div>

        {/*--------------PRIMARY COLORS--------------*/}
        <div className={style.color}>
          <h4>Color</h4>
          <div className={style.chooseColor}>
            <span className={style.color1 + " " + style.active}></span>
            <span className={style.color2}></span>
            <span className={style.color3}></span>
            <span className={style.color4}></span>
            <span className={style.color5}></span>
          </div>
        </div>

        {/*--------------BACKGROUND COLORS--------------*/}
        <div className={style.background}>
          <h4>Background</h4>
          <div className={style.chooseBg}>
            <div className={style.bg1 + " " + style.active}>
              <span></span>
              <h5 htmlFor={style.bg1}>Light</h5>
            </div>
            <div className={style.bg2}>
              <span></span>
              <h5 htmlFor={style.bg2}>Dim</h5>
            </div>
            <div className={style.bg3}>
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
