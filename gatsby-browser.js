// custom typefaces
// import "typeface-montserrat"
// import "typeface-merriweather"

// normalize CSS across browsers
import './src/css/normalize.css'

// custom CSS styles
import './src/css/style.css'

import React from 'react'
import { CatalogMenuProvider } from './src/common/catalogMenu/useCatalogMenu'
export const wrapRootElement = ({ element }) => (
  <CatalogMenuProvider>{element}</CatalogMenuProvider>
)
