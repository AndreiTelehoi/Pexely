import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const ImagesPage = () => {
    const [count, setCount] = useState(0);

   useEffect(() => {
    
        axios.get('https://api.thedogapi.com/v1/breeds').then(response => {
            console.log(response);
        });
   });

  return (
    <div className="App">
        <h1>Our Dogs</h1>
    </div>
  );
}
