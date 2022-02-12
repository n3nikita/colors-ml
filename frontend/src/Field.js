import App from './App';
import { useState } from 'react';
import React, { Component }  from 'react';


function Field() {
  const getRandomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  const hexToRgb = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
      , (m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1).match(/.{2}/g)
      .map(x => parseInt(x, 16));
  
  const [data, setData] = useState([]);
  const [colorBack, setColorBack] = useState(getRandomColor);

  const refreshAndSave = (type, color) => {
    console.log(type);
    data.push({ type: type === 'white' ? 1 : 0, color: hexToRgb(color) });
    setData(data);

    setColorBack(getRandomColor);
  }

  return (
    <>
      <b>Choose</b>
      <div className='container'>
        <App textColor="black" colorBack={colorBack} clicked={refreshAndSave} />
        <App textColor="white" colorBack={colorBack} clicked={refreshAndSave} />

      </div>
      <button onClick={() => {
        // setColorBack(getRandomColor);
        fetch('http://localhost:3001/', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
        }).then((res) => console.log(res)).catch((err) => console.log(err))
      }}>Train!!</button>
    </>
  );
}

export default Field;