import React from 'react';

export default ({address}) => {
  return (
    <span className='address-info'>
      {
        Object.keys(address).map((prop, index) => {
          return (
            <span key={index}>
              <i>
                {prop}:{' '}
              </i>
              {address[prop]}<br />
            </span>
          )
        })
      }
    </span>
  )
}
