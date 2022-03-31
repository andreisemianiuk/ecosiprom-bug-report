import React from 'react'
import { CatalogMenuProvider } from './src/common/catalogMenu/useCatalogMenu'
export const wrapRootElement = ({ element }) => (
  <CatalogMenuProvider>{element}</CatalogMenuProvider>
)
