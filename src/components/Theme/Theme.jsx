import React, { useState, useEffect } from 'react';
import style from './Theme.module.css';

const Theme = (props) => {
  const [pickedFontSize, setPickedFontSize] = useState('16px');
  const [pickedColor, setPickedColor] = useState('purple');
  const [pickedBackgroundColor, setPickedBackgroundColor] = useState('light');

  useEffect(() => {
    setPickedFontSize(window.localStorage.getItem('pickedFontSize'));
  }, []);
  useEffect(() => {
    setPickedColor(window.localStorage.getItem('pickedColor'));
  }, []);
  useEffect(() => {
    setPickedBackgroundColor(
      window.localStorage.getItem('pickedBackgroundColor')
    );
  }, []);

  const setFontSize = (e, size) => {
    setPickedFontSize(e.target.id);
    window.localStorage.setItem('pickedFontSize', e.target.id);
    document.querySelector('html').style.fontSize = size;
  };

  const setColor = (e, color) => {
    setPickedColor(e.target.id);
    window.localStorage.setItem('pickedColor', e.target.id);
    document
      .querySelector(':root')
      .style.setProperty('--primary-color-hue', color);
  };

  const setBackgroundColor = (e, light, white, dark) => {
    setPickedBackgroundColor(e.target.id || e.target.parentElement.id);
    window.localStorage.setItem(
      'pickedBackgroundColor',
      e.target.id || e.target.parentElement.id
    );
    let root = document.querySelector(':root').style;
    root.setProperty('--light-color-lightness', light);
    root.setProperty('--white-color-lightness', white);
    root.setProperty('--dark-color-lightness', dark);
  };

  console.log(pickedBackgroundColor);

  return (
    <div className={style.customizeTheme}>
      <div className={style.card}>
        <h2>Customize your view</h2>
        <p className='textMuted'>Manage your font size, color and background</p>

        {/* --------------FONT-SIZES-------------- */}
        <div className={style.fontSize}>
          <h4>Font Size</h4>
          <div>
            <h6>Aa</h6>
            <div className={`chooseSize ${style.chooseSize}`}>
              <span
                onClick={(e) => setFontSize(e, '10px')}
                className={
                  pickedFontSize === '10px'
                    ? style.fontSize1 + ' ' + style.active
                    : style.fontSize1
                }
                id='10px'
              ></span>
              <span
                onClick={(e) => setFontSize(e, '13px')}
                className={
                  pickedFontSize === '13px'
                    ? style.fontSize2 + ' ' + style.active
                    : style.fontSize2
                }
                id='13px'
              ></span>
              <span
                onClick={(e) => setFontSize(e, '16px')}
                className={
                  pickedFontSize === '16px'
                    ? style.fontSize3 + ' ' + style.active
                    : style.fontSize3
                }
                id='16px'
              ></span>
              <span
                onClick={(e) => setFontSize(e, '19px')}
                className={
                  pickedFontSize === '19px'
                    ? style.fontSize4 + ' ' + style.active
                    : style.fontSize4
                }
                id='19px'
              ></span>
              <span
                onClick={(e) => setFontSize(e, '22px')}
                className={
                  pickedFontSize === '22px'
                    ? style.fontSize5 + ' ' + style.active
                    : style.fontSize4
                }
                id='22px'
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
              className={
                pickedColor === 'purple'
                  ? style.color1 + ' ' + style.active
                  : style.color1
              }
              onClick={(e) => setColor(e, 252)}
              id='purple'
            ></span>
            <span
              className={
                pickedColor === 'yellow'
                  ? style.color2 + ' ' + style.active
                  : style.color2
              }
              onClick={(e) => setColor(e, 52)}
              id='yellow'
            ></span>
            <span
              className={
                pickedColor === 'red'
                  ? style.color3 + ' ' + style.active
                  : style.color3
              }
              onClick={(e) => setColor(e, 352)}
              id='red'
            ></span>
            <span
              className={
                pickedColor === 'green'
                  ? style.color4 + ' ' + style.active
                  : style.color4
              }
              onClick={(e) => setColor(e, 152)}
              id='green'
            ></span>
            <span
              className={
                pickedColor === 'blue'
                  ? style.color5 + ' ' + style.active
                  : style.color5
              }
              onClick={(e) => setColor(e, 202)}
              id='blue'
            ></span>
          </div>
        </div>

        {/*--------------BACKGROUND COLORS--------------*/}
        <div className={style.background}>
          <h4>Background</h4>
          <div className={`chooseBg ${style.chooseBg}`}>
            <div
              className={
                pickedBackgroundColor === 'light'
                  ? style.bg1 + ' ' + style.active
                  : style.bg1
              }
              onClick={(e) => setBackgroundColor(e, '95%', '100%', '17%')}
              id='light'
            >
              <span></span>
              <h5 htmlFor={style.bg1}>Light</h5>
            </div>
            <div
              className={
                pickedBackgroundColor === 'dim'
                  ? style.bg2 + ' ' + style.active
                  : style.bg2
              }
              onClick={(e) => setBackgroundColor(e, '30%', '20%', '85%')}
              id='dim'
            >
              <span></span>
              <h5 htmlFor={style.bg2}>Dim</h5>
            </div>
            <div
              className={
                pickedBackgroundColor === 'dark'
                  ? style.bg3 + ' ' + style.active
                  : style.bg3
              }
              onClick={(e) => setBackgroundColor(e, '10%', '10%', '100%')}
              id='dark'
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
