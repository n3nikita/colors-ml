import Box from './Box';
import { useState } from 'react';
import React  from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getRandomColor, hexToRgb } from './utils/colors'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Field() {
  const [data, setData] = useState([]);
  const [colorBack, setColorBack] = useState(getRandomColor);
  const [predictedColor, setPredictedColor] = useState('none');
  const [training, setTraining] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false)
  
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

  const train = (type) => {
    console.log(data);
    setTraining(true);
    fetch('http://localhost:3001/train', {
      method: 'post',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: { type, data: data},
    })
      .then((res) => {
        setTraining(false);
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.log(err); 
        setTraining(false);
      });
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

      <LoadingButton
        onClick={() => train('generated')}
        endIcon={<BlurOnIcon />}
        loading={training}
        loadingPosition="end"
        variant="outlined"
      >
        Train
      </LoadingButton>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Model trained!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Field;