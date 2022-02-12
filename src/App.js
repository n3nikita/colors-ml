import './App.css';

function App(props) {

  return (
    <div className='container-box'>
      <div className='back' style={{ background: props.colorBack, color: props.textColor }}>
        <p className='text'>Hello World</p>
      </div>
      <button className='btn btn-blue'>Choose</button>
    </div>
  );
}

export default App;
