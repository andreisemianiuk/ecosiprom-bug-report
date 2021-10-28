import * as React from 'react'
import {Navbar} from '../Navbar/Navbar'

export default function Layout ({children}) {
  return (
    <main>
      <Navbar/>
       {/*Content*/}
      {children}
      {/*<Footer/>*/}
    </main>
  )
}