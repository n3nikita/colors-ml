import App from './App';
import { useState } from 'react';
import React, { Component }  from 'react';



function Field() {
  const getRandomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  
  const [data, setData] = useState([]);
  const [colorBack, setColorBack] = useState(getRandomColor);

  const refreshAndSave = (type, color) => {
    data.push({ type, color });
    setData(data);
    console.log(data);

    setColorBack(getRandomColor);
  }

  return (
    <>
      <div className='container'>
        <App textColor="black" colorBack={colorBack} clicked={refreshAndSave} />
        <App textColor="white" colorBack={colorBack} clicked={refreshAndSave} />

      </div>
      <button onClick={() => {
        setColorBack(getRandomColor);
      }}>Random!!!</button>
    </>
  );
}

export default Field;