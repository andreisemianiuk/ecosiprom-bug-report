const path = require(`path`);

exports.createPages = async (gatsbyUtilities) => {
  const catalogList = await getCatalogList(gatsbyUtilities);
  const servicesList = await getServicesList(gatsbyUtilities);

  if (!catalogList.length || !servicesList.length) {
    return;
  }

  await createServicesPages({ servicesList, gatsbyUtilities });
  await createCatalogListPages({ catalogList, gatsbyUtilities });
};

const createServicesPages = async ({ servicesList, gatsbyUtilities }) => {
  Promise.all(
    servicesList.map(({ node }) => {
      gatsbyUtilities.actions.createPage({
        path: node.uri,
        component: require.resolve("./src/templates/service-page-template.js"),
        context: {
          id: node.id,
          parentId: node.parentId,
        },
        // defer: true,
      });
    })
  );
};

const createCatalogListPages = async ({ catalogList, gatsbyUtilities }) => {
  Promise.all(
    catalogList.map(({ node }) => {
      gatsbyUtilities.actions.createPage({
        path: node.uri,
        component: require.resolve("./src/templates/catalog-list-template.js"),
        context: {
          id: node.id,
          parentId: node.parentId,
        },
        // defer: true,
      });
    })
  );
};

async function getCatalogList({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    {
      allWpPage(
        filter: {
          slug: {
            regex: "/elektromagnitnye-klapany|gorelki-rekumat|gorelki-regemat|izluchayushchie-truby/"
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
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your catalog list`,
      graphqlResult.errors
    );
    return;
  }
  return graphqlResult.data.allWpPage.edges;
}

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
            content
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your services list items`,
      graphqlResult.errors
    );
    return;
  }
  return graphqlResult.data.allWpPage.edges;
}
