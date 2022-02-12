import App from './App';
import { useState } from 'react';
import React, { Component }  from 'react';



function Field() {
  const getRandomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  const [colorBack, setColorBack] = useState(getRandomColor);

  return (
    <>
      <div className='container'>
        <App textColor="black" colorBack={colorBack} />
        <App textColor="white" colorBack={colorBack} />

      </div>
      <button onClick={() => {
        setColorBack(getRandomColor);
      }}>Random!!!</button>
    </>
  );
}

export default Field;