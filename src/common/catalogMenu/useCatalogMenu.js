import React, { useContext } from 'react'

const CatalogMenuContext = React.createContext()

export function CatalogMenuProvider({ children }) {
  const menu = useProviderCatalogMenu()
  return (
    <CatalogMenuContext.Provider value={menu}>
      {children}
    </CatalogMenuContext.Provider>
  )
}

export const useCatalogMenu = () => {
  return useContext(CatalogMenuContext)
}

function useProviderCatalogMenu() {
  const menuInitialState = {
    armaturaPrivodyRegulyatory: false,
    electromagnitnyeKlapany: false,
    promGorelki: false,
    gorelkiRekumat: false,
    gorelkiRegemat: false,
    izluchayushchieTruby: false,
    toplivnyeNasosy: false,
    datchikiReleAvtomatyGoreniya: false,
  }
  const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case 'ARMATURA-PRIVODY-REGULYATORY':
        return {
          ...state,
          armaturaPrivodyRegulyatory: payload.armaturaPrivodyRegulyatory,
        }
      case 'REGULYATORY-DAVLENIYA-GAZA':
        return {
          ...state,
          regulyatoryDavleniyaGaza: payload.regulyatoryDavleniyaGaza,
        }
      case 'PROM-GORELKI':
        return {
          ...state,
          promGorelki: payload.promGorelki,
        }
      case 'GORELKI-REKUMAT':
        return {
          ...state,
          gorelkiRekumat: payload.gorelkiRekumat,
        }
      case 'GORELKI-REGEMAT':
        return {
          ...state,
          gorelkiRegemat: payload.gorelkiRegemat,
        }
      case 'TOPLIVNYE-NASOSY':
        return {
          ...state,
          toplivnyeNasosy: payload.toplivnyeNasosy,
        }
      case 'IZLUCHAYUSHCHIE-TRUBY':
        return {
          ...state,
          izluchayushchieTruby: payload.izluchayushchieTruby,
        }
      case 'DATCHIKI-RELE-AVTOMATY-GORENIYA':
        return {
          ...state,
          datchikiReleAvtomatyGoreniya: payload.datchikiReleAvtomatyGoreniya,
        }
      case 'ELECTROMAGNITNYE-KLAPANY':
        return {
          ...state,
          electromagnitnyeKlapany: payload.electromagnitnyeKlapany,
        }
      case 'HIDE-ALL':
        const obj = {}
        for (let key in menuInitialState) {
          obj[key] = false
        }
        return {
          ...state,
          ...obj,
        }
      default:
        return { ...state }
    }
  }

  const [state, dispatch] = React.useReducer(reducer, menuInitialState)
  return { state, dispatch }
}
