import * as React from 'react'
import {Navbar} from './Navbar'
import {StaticImage} from 'gatsby-plugin-image'
import {container,header} from '../styles/layout.module.css'
import {Link} from 'gatsby'

export default function Layout({children}) {
  return (
    <main className={container}>
      <header className={header}>
        <Link to={'/'}><Logo/></Link>
        <Navbar/>
      </header>
      {/*Content*/}
      {children}
      {/*<Footer/>*/}
    </main>
  )
}

function Logo() {
  return (
    <StaticImage
      src="../images/ecosiprom-logo.png"
      alt="Logo for site"
      placeholder="blurred"
      layout="fixed"
      width={300}
    />
  )
}