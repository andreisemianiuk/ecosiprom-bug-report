const path = require(`path`)

exports.createPages = async gatsbyUtilities => {
  const productItems = await getProductItems(gatsbyUtilities)
  const productList = await getProductList(gatsbyUtilities)

  // const projectItems = await getProjectItems(gatsbyUtilities)
  // const projectList = await getProjectList(gatsbyUtilities)

  const servicestList = await getServicesList(gatsbyUtilities)

  if (
    // ||
    // !projectItems.length ||
    // !projectList.length
    !productItems.length ||
    !productList.length ||
    !servicestList.length
  ) {
    return
  }
  await createProductItemPages({ productItems, gatsbyUtilities })
  await createProductListPages({ productList, gatsbyUtilities })
  await createServicesListPages({ servicestList, gatsbyUtilities })

  // await createProjectItemPages({ productItems, gatsbyUtilities })
  // await createProjectListPages({ productList, gatsbyUtilities })
}
const createProductItemPages = async ({ productItems, gatsbyUtilities }) => {
  Promise.all(
    productItems.map(({ node }) => {
      if (
        node.slug !== 'electromagnitnye-klapany' ||
        node.slug !== 'gorelki-rekumat' ||
        node.slug !== 'izluchayushchie-truby'
      ) {
        gatsbyUtilities.actions.createPage({
          path: node.uri,
          component: require.resolve(
            './src/templates/modal-product-item-template.js'
          ),
          context: {
            id: node.id,
            parentId: node.parentId,
          },
          // defer: true,
        })
      }
    })
  )
}
// const createProjectItemPages = async ({ productItems, gatsbyUtilities }) => {
//   Promise.all(
//     productItems.map(({ node }) => {
//       if (
//         node.slug !== 'electromagnitnye-klapany' ||
//         node.slug !== 'gorelki-rekumat' ||
//         node.slug !== 'izluchayushchie-truby'
//       ) {
//         gatsbyUtilities.actions.createPage({
//           path: node.uri,
//           component: require.resolve(
//             './src/templates/modal-product-item-template.js'
//           ),
//           context: {
//             id: node.id,
//             parentId: node.parentId,
//           },
//           // defer: true,
//         })
//       }
//     })
//   )
// }
const createProductListPages = async ({ productList, gatsbyUtilities }) => {
  Promise.all(
    productList.map(({ node }) => {
      gatsbyUtilities.actions.createPage({
        path: node.uri,
        component: require.resolve('./src/templates/product-list-template.js'),
        context: {
          id: node.id,
          parentId: node.parentId,
        },
        // defer: true,
      })
    })
  )
}
const createServicesListPages = async ({ servicestList, gatsbyUtilities }) => {
  Promise.all(
    servicestList.map(({ node }) => {
      gatsbyUtilities.actions.createPage({
        path: node.uri,
        component: require.resolve('./src/templates/services-list-template.js'),
        context: {
          id: node.id,
          parentId: node.parentId,
        },
        // defer: true,
      })
    })
  )
}
// const createProjectListPages = async ({ productList, gatsbyUtilities }) => {
//   Promise.all(
//     productList.map(({ node }) => {
//       gatsbyUtilities.actions.createPage({
//         path: node.uri,
//         component: require.resolve('./src/templates/project-list-template.js'),
//         context: {
//           id: node.id,
//           parentId: node.parentId,
//         },
//         // defer: true,
//       })
//     })
//   )
// }
async function getProductItems({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    {
      allWpPage(
        filter: {
          wpParent: {
            node: {
              slug: {
                in: [
                  "armatura-privody-regulyatory"
                  "electromagnitnye-klapany"
                  "toplivnye-nasosy"
                  "datchiki-rele-avtomaty-goreniya"
                  "prom-gorelki"
                  "gorelki-rekumat"
                  "gorelki-regemat"
                  "izluchayushchie-truby"
                ]
              }
            }
          }
        }
      ) {
        edges {
          node {
            id
            parentId
            uri
            slug
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your product items`,
      graphqlResult.errors
    )
    return
  }
  return graphqlResult.data.allWpPage.edges
}
// async function getProjectItems({ graphql, reporter }) {
//   const graphqlResult = await graphql(`
//     {
//       allWpPage(filter: { wpParent: { node: { slug: { in: [] } } } }) {
//         edges {
//           node {
//             id
//             parentId
//             uri
//             slug
//           }
//         }
//       }
//     }
//   `)

//   if (graphqlResult.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your project items`,
//       graphqlResult.errors
//     )
//     return
//   }
//   return graphqlResult.data.allWpPage.edges
// }
async function getProductList({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    {
      allWpPage(
        filter: {
          slug: {
            regex: "/armatura-privody-regulyatory|electromagnitnye-klapany|toplivnye-nasosy|datchiki-rele-avtomaty-goreniya|prom-gorelki|gorelki-rekumat|gorelki-regemat|izluchayushchie-truby/"
          }
        }
      ) {
        edges {
          node {
            id
            parentId
            slug
            uri
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your product items`,
      graphqlResult.errors
    )
    return
  }
  return graphqlResult.data.allWpPage.edges
}
// async function getProjectList({ graphql, reporter }) {
//   const graphqlResult = await graphql(`
//     {
//       allWpPage(filter: { slug: {} }) {
//         edges {
//           node {
//             id
//             parentId
//             slug
//             uri
//           }
//         }
//       }
//     }
//   `)

//   if (graphqlResult.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your project items`,
//       graphqlResult.errors
//     )
//     return
//   }
//   return graphqlResult.data.allWpPage.edges
// }
async function getServicesList({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    {
      allWpPage(filter: { wpParent: { node: { slug: { eq: "services" } } } }) {
        edges {
          node {
            id
            slug
            uri
            parentId
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your services list items`,
      graphqlResult.errors
    )
    return
  }
  return graphqlResult.data.allWpPage.edges
}
