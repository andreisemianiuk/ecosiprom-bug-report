const path = require(`path`);

exports.createPages = async (gatsbyUtilities) => {
  const catalogList = await getCatalogList(gatsbyUtilities);
  const catalogPages = await getCatalogPages(gatsbyUtilities);
  const servicesList = await getServicesList(gatsbyUtilities);
  const projectsList = await getProjectsList(gatsbyUtilities);

  if (
    !projectsList.length ||
    !catalogList.length ||
    !servicesList.length ||
    !catalogPages.length
  ) {
    return;
  }

  await createProjectsPages({ projectsList, gatsbyUtilities });
  await createServicesPages({ servicesList, gatsbyUtilities });
  await createCatalogListPages({ catalogList, gatsbyUtilities });
  await createCatalogPages({ catalogPages, gatsbyUtilities });
};

const createProjectsPages = async ({ projectsList, gatsbyUtilities }) => {
  Promise.all(
    projectsList.map(({ node }) => {
      gatsbyUtilities.actions.createPage({
        path: node.uri,
        component: require.resolve(
          "./src/templates/projects-item/projects-item-template.js"
        ),
        context: {
          id: node.id,
          parentId: node.parentId,
        },
        // defer: true,
      });
    })
  );
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

const createCatalogPages = async ({ catalogPages, gatsbyUtilities }) => {
  Promise.all(
    catalogPages.map(({ node }) => {
      gatsbyUtilities.actions.createPage({
        path: node.uri,
        component: require.resolve("./src/templates/catalog-item-template.js"),
        context: {
          id: node.id,
          parentId: node.parentId,
          slug: `/${node.slug}/`,
        },
        // defer: true,
      });
    })
  );
};

async function getCatalogList({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    {
      allWpPage(filter: { slug: { regex: "/elektromagnitnye-klapany/" } }) {
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

async function getCatalogPages({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    {
      allWpPage(
        filter: {
          slug: {
            regex: "/regulyatory-davleniya-gaza|gazovye-filtry|regulyator-rashoda-lmv|krany-tipa-batterflyaj|elektromagnitnye-privody|servomotory|psk|vmr|vra-vla-vta|evrmnc-evrmna|vmrna|vmm|vmh|vm|vd|vu|cfk|psg|pcs/"
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
      `There was an error loading your catalog page`,
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

async function getProjectsList({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    {
      allWpPage(filter: { wpParent: { node: { slug: { eq: "projects" } } } }) {
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
      `There was an error loading your projects list items`,
      graphqlResult.errors
    );
    return;
  }
  return graphqlResult.data.allWpPage.edges;
}
