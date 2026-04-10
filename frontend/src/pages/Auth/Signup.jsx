import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import './Auth.scss'
import {signup} from '@/api/auth.api'

const bgImages = [
  './images/bannerbg.png',
  './images/bannerbg.png',
  './images/bannerbg.png',
]

const Signup = () => {
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name:'',
    email:'',
    password:'',
    passwordConfirm:'',
    phone:'',
  })

  const handleChange = (e) => {
    const {name, value} = e.target

    setForm((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const validateForm = () => {
    if (!form.name.trim()) {
      return "이름을 입력하세요."
    }
    if (!form.email.trim()) {
      return "이메일을 입력하세요."
    }
    if (!form.password.trim()) {
      return "비밀번호를 입력하세요"
    }
    if (form.password.length < 6) {
      return "비밀번호를 6자 이상 입력하세요."
    }
    if (!form.passwordConfirm.trim()) {
      return "비밀번호를 호가인을 입력하세요"
    }
    if (form.password !== form.passwordConfirm) {
      return "비밀번호와 비밀번호 확인이 일치하지 않습니다."
    }
    if (!form.phone.trim()) {
      return "전화번호를 입력하세요."
    }

    return ''
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const validationMessage = validateForm()

    if (validationMessage) {
      setError(validationMessage)

      return
    }

    setError('')
    setIsLoading(true)
    try {
      await signup(form)
      alert("회원가입이 완료되었습니다.")
      navigate('/login')
    } catch (error) {
      setError(error.message || "회원 가입 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

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
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <Input 
            type="text"
            placeholder="이름을 입력하세요."
            value={form.name}
            onChange={handleChange}
            name="name"
            />
            <Input 
            type="email"
            name="email"
            placeholder="이메일을 입력하세요."
            value={form.email}
            onChange={handleChange}
            />
            <Input 
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요."
            />
            <Input 
            type="password"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력하세요."
            />
            <Input 
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="전화번로를 입력하세요."
            />
          </div>
          {error && <p className='error-text'>{error}</p>}
          <div className="auth-btn-wrap">
            <Button 
            text={isLoading ? "가입 중..." : "회원가입"}
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