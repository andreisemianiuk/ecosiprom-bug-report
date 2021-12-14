import React from 'react'
import {graphql, Link, useStaticQuery} from 'gatsby'
import {nav, navActiveLink, navItem, navLink, navList} from '../styles/navbar.module.css'

export const Navbar = () => {
  const {
    wpMenu: {
      menuItems: {nodes},
    },
  } = useStaticQuery(graphql`
    query NavbarQuery {
      wpMenu {
        menuItems {
          nodes {
            path
            id
            label
          }
        }
      }
    }
  `)
  return <nav className={nav}>
    <ul className={navList}>
      {/*{*/}
      {/*  nodes.map(({id, label, path}, i) =>*/}
      {/*    i > 0 &&*/}
      {/*    (<li key={id} className={navItem}>*/}
      {/*      <Link to={`${path}`} className={navLink} activeClassName={navActiveLink}>*/}
      {/*        {label}*/}
      {/*      </Link>*/}
      {/*    </li>))*/}
      {/*}*/}
      <li className={navItem}>
        <Link to={'/services'} className={navLink} activeClassName={navActiveLink}>Услуги</Link>
      </li>
      <li className={navItem}>
        <Link to={'/catalog'} className={navLink} activeClassName={navActiveLink}>Каталог</Link>
      </li>
      <li className={navItem}>
        <Link to={'/projects'} className={navLink} activeClassName={navActiveLink}>Специализация и Проекты</Link>
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