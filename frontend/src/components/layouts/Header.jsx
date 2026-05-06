import React from 'react'
import './Header.scss'
import {useAuth} from '@/store/auth.store'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import {logout as logoutApi} from '@/api/auth.api'

const Header = () => {
  const navigate = useNavigate()
  const {logout} = useAuth()

  const menus = [
    {
      name: '내 후기',
      link: '/app/memos'
    },
    {
      name: '프로필',
      link: '/app/profile'
    },
    {
      name: '설정',
      link: '/app/setting'
    }
  ]

  const handleLogout = async() => {
    try {
      await logoutApi()
      logout()
      navigate("/")
    } catch (error) {
      alert(error.message || "로그아웃 오류")
    }
  }

  return (
    <header>
      <div className="inner">
        <h1>
          <Link to="/app">
            <img src="/images/logo-hd.svg" alt="logo" />
          </Link>
        </h1>
        <div className="right">
          <ul>
            {menus.map((menu, i)=>(
              <li key={i}>
                <Button 
                className="sq"
                onClick={()=>navigate(menu.link)}
                text={menu.name}
                />
              </li>
            ))}
          </ul>
          <Button 
          text="로그아웃"
          onClick={handleLogout}
          className="header-btn"
          />
        </div>
      </div>
    </header>
  )
}

export default Header