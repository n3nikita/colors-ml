import Box from './Box';
import { useState } from 'react';
import React  from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getRandomColor, hexToRgb } from './utils/colors'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const PREDICTION = {
  BLACK: 'black',
  WHITE: 'white',
  NONE: 'none'
}

function Field() {
  const [data, setData] = useState([]);
  const [colorBack, setColorBack] = useState(getRandomColor);
  const [prediction, setPrediction] = useState(PREDICTION.NONE);
  const [training, setTraining] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [percent, setPercent] = useState(0);
  
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
        setPrediction(body[0] > body[1] ? PREDICTION.BLACK : PREDICTION.WHITE) 
        const percent = body[0] > body[1] ? body[0] : body[1];
        setPercent((percent * 100).toFixed())
      })
      .catch((err) => {
        console.log(err);
        setPrediction(PREDICTION.NONE);
      });
  }

  const train = (type) => {
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

  const next = () => {
    setColorBack(getRandomColor);
    setPercent(0);
    setPrediction(PREDICTION.NONE);
  } 

  return (
    <>
      <h1>Color Prediction</h1>
      <div className='container'>
        <Box 
          textColor="black" 
          colorBack={colorBack} 
          clicked={refreshAndSave}
          predicted={prediction === 'black'}
          percent={percent}
        />
        <Box 
          textColor="white" 
          colorBack={colorBack} 
          clicked={refreshAndSave} 
          predicted={prediction === 'white'}
          percent={percent}
        />
      </div>

      <div className='button-container'>
        <Button 
          variant="outlined" 
          onClick={predict} 
          startIcon={<TrackChangesIcon />} 
          disabled={prediction != PREDICTION.NONE}
          size='large'
        >
          Predict
        </Button>
        <Button 
          variant="outlined" 
          onClick={next} 
          endIcon={<ArrowForwardIosIcon />}
          size='large'
        >
          Next
        </Button>
      </div>

      <LoadingButton
        onClick={() => train('generated')}
        startIcon={<AutorenewIcon />}
        loading={training}
        loadingPosition="start"
        variant="outlined"
        size='large'
      >
        Train model
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