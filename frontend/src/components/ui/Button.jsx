import React from 'react'
import './Button.scss'

const Button = ({
  text,
  className,
  onClick,
  icons,
  kakao,
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
      {kakao && <img src="/images/kakao-logo.svg" alt="카카오" className="kakao-icon"/>}
      {icons && <img src='/images/arrow.svg'/>}
      {text}
    </button>
  )
}

export default Button