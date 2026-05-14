import React from 'react'
import './Button.scss'

const Button = ({
  text,
  className,
  onClick,
  icons,
  type = 'button',   // ✅ 기본값을 'button'으로 명시 (form submit 방지)
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`}
      disabled={disabled}
    >
      {icons && <img src='/images/arrow.svg'/>}
      {text}
    </button>
  )
}

export default Button