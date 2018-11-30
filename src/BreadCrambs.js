import React from 'react';

export default ({pageNumber, activePageIndex, onCrumbClick}) => {
  return (
    <div className='crumbs'>
      {
        Array.from({length: pageNumber}).map((_, index) => {
          return (
            <button
               style={{cursor: 'pointer', border: index === activePageIndex ? '1px solid black' : 'none'}}
               key={index} onClick={onCrumbClick(index)}
            >
              {index + 1}
            </button>
          )
        })
      }
    </div>
  );
}
