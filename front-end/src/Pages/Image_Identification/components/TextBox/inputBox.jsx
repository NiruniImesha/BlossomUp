import React from 'react'

const inputBox = ({type , classes , elementId}) => {
  return (
    <input type={type}  className={classes} id={elementId} />
  )
}

export default inputBox