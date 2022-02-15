import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Field from './Field';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div className='main'>
      <Field />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();