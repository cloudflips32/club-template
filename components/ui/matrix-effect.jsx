'use client';

import React, { useState, useEffect } from 'react'

const MatrixEffect = ({particle}) => {
  // Toggle between "0" and "1" and update CSS accordingly
  // This will ensure each particle will have a unique pattern

  const particles = Array.from({ length: particle }, () => ( Math.random() > 0.5 ? "0" : "1") );
  
  const [matrixs, setMatrixs] = useState(particles);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatrixs((prevMatrixs) =>
        prevMatrixs.map((char) => (char === "0" ? "1" : "0")) 
      )
    }, 250)

    return () => clearInterval(interval)
  }, []);

  return (
    <div className="matrixs">
      {matrixs.map((char, index) => (
        <div 
          key={index} 
          className="matrix" 
          character={char}>
        </div>
      ))}
    </div>
  )
}

export default MatrixEffect
