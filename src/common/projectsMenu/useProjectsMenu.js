import React, { useContext } from 'react'

const ProjectsMenuContext = React.createContext()

export function ProjectsMenuProvider({ children }) {
  const menu = useProviderProjectsMenu()
  return (
    <ProjectsMenuContext.Provider value={menu}>
      {children}
    </ProjectsMenuContext.Provider>
  )
}

export const useProjectsMenu = () => {
  return useContext(ProjectsMenuContext)
}

function useProviderProjectsMenu() {
  const menuInitialState = {
    // armaturaPrivodyRegulyatory: false,
    // electromagnitnyeKlapany: false,
    // promGorelki: false,
    // gorelkiRekumat: false,
    // gorelkiRegemat: false,
    // izluchayushchieTruby: false,
    // toplivnyeNasosy: false,
    // datchikiReleAvtomatyGoreniya: false,
  }
  const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      // case 'ARMATURA-PRIVODY-REGULYATORY':
      //   return {
      //     ...state,
      //     armaturaPrivodyRegulyatory: payload.armaturaPrivodyRegulyatory,
      //   }
      // case 'PROM-GORELKI':
      //   return {
      //     ...state,
      //     promGorelki: payload.promGorelki,
      //   }
      // case 'GORELKI-REKUMAT':
      //   return {
      //     ...state,
      //     gorelkiRekumat: payload.gorelkiRekumat,
      //   }
      // case 'GORELKI-REGEMAT':
      //   return {
      //     ...state,
      //     gorelkiRegemat: payload.gorelkiRegemat,
      //   }
      // case 'TOPLIVNYE-NASOSY':
      //   return {
      //     ...state,
      //     toplivnyeNasosy: payload.toplivnyeNasosy,
      //   }
      // case 'IZLUCHAYUSHCHIE-TRUBY':
      //   return {
      //     ...state,
      //     izluchayushchieTruby: payload.izluchayushchieTruby,
      //   }
      // case 'DATCHIKI-RELE-AVTOMATY-GORENIYA':
      //   return {
      //     ...state,
      //     datchikiReleAvtomatyGoreniya: payload.datchikiReleAvtomatyGoreniya,
      //   }
      // case 'ELECTROMAGNITNYE-KLAPANY':
      //   return {
      //     ...state,
      //     electromagnitnyeKlapany: payload.electromagnitnyeKlapany,
      //   }
      case 'HIDE-ALL':
        const obj = {}
        for (let key in menuInitialState) {
          obj[key] = false
        }
        return {
          ...obj,
        }
      default:
        return { ...state }
    }
  }

  const [state, dispatch] = React.useReducer(reducer, menuInitialState)
  return { state, dispatch }
}
