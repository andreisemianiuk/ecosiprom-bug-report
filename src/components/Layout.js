import * as React from 'react'
import {Navbar} from './Navbar'
import {StaticImage} from 'gatsby-plugin-image'
import {container,header,rightWrapper} from '../styles/layout.module.css'
import {Link} from 'gatsby'
import {ContactHeader} from './ContactHeader'

export default function Layout({children}) {
  return (
    <main className={container}>
      <header className={header}>
        <Link to={'/'}><Logo/></Link>
        <div className={rightWrapper}>
          <ContactHeader/>
          <Navbar/>
        </div>
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