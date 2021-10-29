import * as React from 'react'
import {Navbar} from './Navbar'
import {container} from '../styles/layout.module.css'

export default function Layout ({children}) {
  return (
    <main className={container}>
      <Navbar/>
       {/*Content*/}
      {children}
      {/*<Footer/>*/}
    </main>
  )
}