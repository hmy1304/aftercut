import React from 'react'
import './Landing.scss'
import Button from '@/components/ui/Button'
import { NavLink } from 'react-router-dom'
const bgImages = [
  './images/bannerbg.png',
  './images/bannerbg.png',
  './images/bannerbg.png',
]
const logobg = './images/logobg.svg'

const Landing = () => {
  return (
    <section className='landing'>
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
        <div className="logo-track">
          <img src={logobg} alt="logobg" />
        </div>
        <div className="t-wrap">
          <p>나만의 애니 감상 후기- 애프터컷 .</p>
          <h2>
            <img src="/images/logo.svg" alt="logo" />
          </h2>
        </div>
        <NavLink to="/login">
          <Button text='시작하기' className='intro'/>
        </NavLink>
      </div>
    </section>
  )
}

export default Landing