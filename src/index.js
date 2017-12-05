import React from 'react';
import ReactDOM from 'react-dom';
import Image from './Image';


ReactDOM.render(
  <Image
    imageUrl={'https://media.dev.mojoreads.com/250x360/32511de9-1e1c-4d22-845a-f5678dbf374f.png'}
    placeHolder={'/react-image/placeHolder.gif'}
    alt={'image'}
  />,
  document.getElementById('root')
);
