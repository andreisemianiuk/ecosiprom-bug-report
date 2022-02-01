// exports.createPages = async ({actions,graphql}) => {
//   const result = await graphql(`
//     {
//       allWpPage {
//         nodes {
//           id
//           uri
//           content
//         }
//       }
//     }
//   `)
//
//   const pages = result.data.allWpPage.nodes
//   pages.forEach(page => {
//     actions.createPage({
//       path: page.uri,
//       component: require.resolve('./src/templates/page-template.js'),
//       context: {
//         id: page.id
//       }
//     })
//   })
// }