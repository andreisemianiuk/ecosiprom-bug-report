import * as React from 'react'
import Layout from '../../components/Layout'
import {graphql, Link} from 'gatsby'
import {MDXRenderer} from 'gatsby-plugin-mdx'

const DesignPage = () => {
  // console.log(data)
  // const text = data.allMdx.nodes[0]
  return (
    <div>Design</div>
    // <Layout>
    //   DesignPage Page
    //   <MDXRenderer>{text.body}</MDXRenderer>
    //   <div><Link to={'/services'}>Back</Link></div>
    // </Layout>
  )
}

export default DesignPage


// export const query = graphql`
//   query Design {
//     allMdx(filter: {frontmatter: {slug: {name: {eq: "design"}}}}) {
//       nodes {
//         frontmatter {
//           title
//         }
//         body
//       }
//     }
//   }
// `