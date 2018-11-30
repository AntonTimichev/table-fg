import React from 'react';
import UserAddress from './UserAddress';

export default ({user}) => {
  return (
    <div className='user-info'>
      {
        Object.keys(user).map((prop, index) => {
          return (
            prop === 'address' ?
            <span key={index}>
              <b style={{textTransform: 'capitalize'}}>
                {prop}:
              </b><br />
              <UserAddress address={user[prop]} />
            </span> :
            <span key={index}>
            <b style={{textTransform: 'capitalize'}}>
              {prop}:{' '}
            </b>
              {user[prop]}
            </span>
          )
        })
      }
    </div>
  )
}

