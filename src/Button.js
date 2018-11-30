import React from 'react';

export default ({onButtonClick, isToggle}) => {
  return (
    isToggle ?
    <button className='load-btn' onClick={onButtonClick}>
      Загрузить данные
    </button> :
    <button className='load-btn' onClick={null}>
      ГОТОВО
    </button>
  )
}
