import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import './Auth.scss'

const bgImages = [
  './images/bannerbg.png',
  './images/bannerbg.png',
  './images/bannerbg.png',
]
const logobg = './images/logobg.svg'

const Signup = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <section className='auth'>
      <div className="landing-bg">
        <div className="bg-track">
          {[...bgImages,...bgImages].map((src,i)=>(
            <div key={i} className="bg-item">
              <img src={src} alt="bg" />
            </div>
          ))}
        </div>
      </div>
      <div className="inner">
        <div className="auth-box">
          <nav>
            <h2>회원가입</h2>
            <Button 
            text="뒤로가기"
            className="back"
            icons
            onClick={handleBack}
            />
          </nav>
        </div>
        <form className="auth-form">
          <div className="form-group">
            <Input 
            type="text"
            placeholder="이메일을 입력하세요."
            />
            <Input 
            type="email"
            placeholder="이메일을 입력하세요."
            />
            <Input 
            type="password"
            placeholder="비밀번호를 입력하세요."
            />
            <Input 
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            />
            <Input 
            type="text"
            placeholder="전화번로를 입력하세요."
            />
          </div>
          <div className="auth-btn-wrap">
            <Button 
            text="회원가입"
            type="submit"
            className="intro"
            />
          </div>
        </form>
        <div className="auth-now">
          <span>
            이미 계정이 있으신가요?
          </span>
          <Link to="/login">
            <span className="login-span">
              로그인하기
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Signup