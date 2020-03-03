import React, { useEffect, useState, useRef } from 'react';
import './ShowMore.scss';

const ShowMore = props => {
  const className = `value ${props.className || ''}`.trim();
  const ref = useRef(null);
  const [read, setRead] = useState(0);
  useEffect(() => {
    if (ref && ref.current) {
      if (ref.current.scrollHeight > 100) {
        setRead(1);
      }
    }
  }, [props.data]);

  const getClass = () => {
    if (read === 1) {
      return 'show-more';
    }
    if (read === 2) {
      return 'show-less';
    }
  };

  return (
    <div className='ShowMore'>
      <div ref={ref} className={`${className} ${getClass()}`}>
        {props.data}
      </div>
      {read === 1 && <button onClick={() => setRead(2)}>Show More</button>}
      {read === 2 && <button onClick={() => setRead(1)}>Show Less</button>}
    </div>
  );
};

export default ShowMore;
