import React from 'react'
import './Button.scss'

const Button = ({
  text,
  className,
  onClick,
  icons
}) => {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {icons && <img src='/images/arrow.svg'/>}
      {text}
    </button>
  )
}

export default Button