import React, { useRef, useEffect } from 'react';
import './StringEllipsis.scss';

const StringEllipsis = ({ string }) => {
  const start = useRef(null);
  const end = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    isEllipse();
    window.addEventListener('resize', isEllipse);
    return () => {
      window.removeEventListener('resize', isEllipse);
    };
  }, []);

  useEffect(() => {
    isEllipse();
  }, [string]);

  const isEllipse = () => {
    if (start.current && container.current) {
      if (start.current.scrollWidth > container.current.clientWidth) {
        end.current.style.display = 'block';
      } else {
        end.current.style.display = 'none';
      }
    }
  };

  if (!string) {
    return null;
  }

  return (
    <span ref={container} className='middleEllipsis'>
      <span ref={start} className='start'>
        {string}
      </span>
      <span ref={end} className='end'>
        {string}
      </span>
    </span>
  );
};

export default StringEllipsis;
