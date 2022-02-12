import './App.css';

function App({colorBack, textColor, clicked }) {
  const onClicked = () => clicked(textColor, colorBack);

  return (
    <div className='container-box' onClick={onClicked}>
      <div className='back' style={{ background: colorBack, color: textColor }}>
        <p className='text'>Hello World</p>
      </div>
    </div>
  );
}

export default App;
