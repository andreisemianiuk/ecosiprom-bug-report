import * as React from 'react'
import parse, { domToReact } from 'html-react-parser'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  @media ${devices.mobileL} {
    /* font-size: 0.9rem; */
  }
`

const ProjectsPage = ({ data }) => {
  let { content } = data.wpPage
  const options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'sidebar') {
        return <Sidebar>{domToReact(domNode.children, options)}</Sidebar>
      }
    },
  }
  return <Layout>{parse(content, options)}</Layout>
}

export default ProjectsPage

export const pageQuery = graphql`
  query ProjectsPageQuery {
    wpPage(title: { eq: "Проекты" }) {
      content
    }
  }
`
