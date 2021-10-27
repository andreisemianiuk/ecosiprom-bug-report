import React from 'react'
import {Link} from 'gatsby'
import {nav, navItem, navList,navLink} from './navbar.module.css'

export const Navbar = () => {
  return <nav className={nav}>
    <ul className={navList}>
      <li className={navItem}>
        <Link to={'/'} className={navLink}>Главная</Link>
      </li>
      <li className={navItem}>
        <Link to={'/services'} className={navLink}>Специализация(Услуги)</Link>
      </li>
      <li className={navItem}>
        <Link to={'/catalog'} className={navLink}>Каталог</Link>
      </li>
      <li className={navItem}>
        <Link to={'/projects'} className={navLink}>Специализация/Проекты/Направление</Link>
      </li>
      <li className={navItem}>
        <Link to={'/about'} className={navLink}>О нас</Link>
      </li>
      <li className={navItem}>
        <Link to={'/contacts'} className={navLink}>Контакты</Link>
      </li>
    </ul>
  </nav>
} 