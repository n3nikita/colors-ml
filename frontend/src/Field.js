import Box from './Box';
import { useState } from 'react';
import React  from 'react';
import Button from '@mui/material/Button';
import { getRandomColor, hexToRgb } from './utils/colors'

function Field() {
  const [data, setData] = useState([]);
  const [colorBack, setColorBack] = useState(getRandomColor);
  const [predictedColor, setPredictedColor] = useState('none');
  
  const refreshAndSave = (type, color) => {
    data.push({ type: type === 'white' ? 1 : 0, color: hexToRgb(color) });
    setData(data);

    setColorBack(getRandomColor);
  }

  const predict = () => {
    fetch('http://localhost:3001/predict', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color: hexToRgb(colorBack) }),
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        setPredictedColor(body[0] > 0.5);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <h1>Choose color</h1>
      <div className='container'>
        <Box textColor="black" colorBack={colorBack} clicked={refreshAndSave} />
        <Box textColor="white" colorBack={colorBack} clicked={refreshAndSave} />
      </div>

      <Button variant="text" size="large" onClick={predict}>
        Predict
      </Button>

      {/* <Button variant="outlined" size="large" onClick={() => {
        // setColorBack(getRandomColor);
        fetch('http://localhost:3001/', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
        }).then((res) => console.log(res)).catch((err) => console.log(err))
      }}>Train</Button> */}
    </>
  );
}

export default Field;