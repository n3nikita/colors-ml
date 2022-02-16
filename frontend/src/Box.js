function Box({colorBack, textColor, clicked, predicted, percent }) {
  const onClicked = () => clicked(textColor, colorBack);
  const className = `container-box ${predicted ? 'predicted' : ''}`

  return (
    <div className="box">
      <div className={className}>
        <div className='back' style={{ background: colorBack, color: textColor }}>
          <p className='text'>Hello World</p>
        </div>
      </div>
      
      <div className="percent">{percent > 0 && predicted &&
        <div>{percent}% sure</div>
      }</div>
      
    </div>
  );
}

export default Box;
