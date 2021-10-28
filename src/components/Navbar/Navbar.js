import React from 'react'
import {Link} from 'gatsby'
import {nav, navItem, navList,navLink,navActiveLink} from './Navbar.module.css'

export const Navbar = () => {
  return <nav className={nav}>
    <ul className={navList}>
      <li className={navItem}>
        <Link to={'/'} className={navLink} activeClassName={navActiveLink}>Главная</Link>
      </li>
      <li className={navItem}>
        <Link to={'/services'} className={navLink} activeClassName={navActiveLink}>Специализация(Услуги)</Link>
      </li>
       <li className={navItem}>
        <Link to={'/catalog'} className={navLink} activeClassName={navActiveLink}>Каталог</Link>
      </li>
      <li className={navItem}>
        <Link to={'/projects'} className={navLink} activeClassName={navActiveLink}>Специализация/Проекты/Направление</Link>
      </li>
      <li className={navItem}>
        <Link to={'/about'} className={navLink} activeClassName={navActiveLink}>О нас</Link>
      </li>
      <li className={navItem}>
        <Link to={'/contacts'} className={navLink} activeClassName={navActiveLink}>Контакты</Link>
      </li>
    </ul>
  </nav>
} 