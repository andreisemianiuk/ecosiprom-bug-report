module.exports = {
  siteMetadata: {
    siteUrl: "https://ecosiprom.gatsbyjs.io",
    title: "ecosiprom",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-plugin-modal-routing-3`,
      options: {
        // A selector to set react-modal's app root to, default is `#___gatsby`
        // See http://reactcommunity.org/react-modal/accessibility/#app-element
        appElement: "#___gatsby",

        // Object of props that will be passed to the react-modal container
        // See http://reactcommunity.org/react-modal/#usage
        modalProps: {
          style: {
            overlay: {},
            content: { inset: "inherit", padding: 0 },
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * The full URL of the WordPress site's GraphQL API.
         * Example : 'https://www.example-site.com/graphql'
         */
        url: `http://ecosiprom.com/graphql`,
        schema: {
          //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
          typePrefix: `Wp`,
        },
        develop: {
          //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
          hardCacheMediaFiles: true,
        },
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        // useAutoGen: required 'true' to use autogen
        useAutoGen: true,
        // autoGenHomeLabel: optional 'Home' is default
        autoGenHomeLabel: `Главная`,
        // exclude: optional, include this array to exclude paths you don't want to
        // generate breadcrumbs for (see below for details).
        exclude: [
          `**/dev-404-page/**`,
          `**/404/**`,
          `**/404.html`,
          `**/offline-plugin-app-shell-fallback/**`,
        ],
        // isMatchOptions: optional, include this object to configure the wildcard-match library.
        excludeOptions: {
          separator: ".",
        },
        // crumbLabelUpdates: optional, update specific crumbLabels in the path
        crumbLabelUpdates: [
          {
            pathname: "/services",
            crumbLabel: "Наши услуги",
          },
          {
            pathname: "/services",
            crumbLabel: "Наши услуги",
          },
          {
            pathname: "/services",
            crumbLabel: "Наши услуги",
          },
          {
            pathname: "/services/proekt",
            crumbLabel: "Проектирование",
          },
          {
            pathname: "/services/postavka",
            crumbLabel: "Поставка оборудования",
          },
          {
            pathname: "/services/montazh",
            crumbLabel: "Строительно-монтажные работы",
          },
          {
            pathname: "/services/pnr",
            crumbLabel: "Пусконаладочные работы",
          },
          {
            pathname: "/services/obsluzhivanie",
            crumbLabel: "Сервисное и техническое обслуживание",
          },
          {
            pathname: "/services/poverka",
            crumbLabel: "Поверка и калибровка средств измерений",
          },
          {
            pathname: "/catalog",
            crumbLabel: "Каталог",
          },
          {
            pathname: "/catalog/regulyatory-davleniya-gaza",
            crumbLabel: "Регуляторы давления газа",
          },
          {
            pathname: "/catalog/gazovye-filtry",
            crumbLabel: "Газовые фильтры",
          },
          {
            pathname: "/catalog/regulyator-rashoda-lmv",
            crumbLabel: "Регулятор расхода LMV",
          },
          {
            pathname: "/catalog/krany-tipa-batterflyaj",
            crumbLabel: 'Краны типа "баттерфляй"',
          },
          {
            pathname: "/catalog/elektromagnitnye-privody",
            crumbLabel: "Электромагнитные приводы",
          },
          {
            pathname: "/catalog/elektromagnitnye-klapany",
            crumbLabel: "Электромагнитные клапаны",
          },
          {
            pathname: "/catalog/servomotory",
            crumbLabel: "Сервомоторы",
          },
          {
            pathname: "/catalog/psk",
            crumbLabel: "Предохранительно-сбросные клапаны",
          },
          {
            pathname: "/catalog/vu",
            crumbLabel: "Предохранительно-сбросные клапаны",
          },
          {
            pathname: "/catalog/vm",
            crumbLabel: "Предохранительно-сбросные клапаны",
          },
          {
            pathname: "/catalog/vd",
            crumbLabel: "Предохранительно-сбросные клапаны",
          },
          {
            pathname: "/catalog/cfk",
            crumbLabel: "Автоматы горения CFK",
          },
          {
            pathname: "/catalog/psg",
            crumbLabel: "Датчики-реле PSG",
          },
          {
            pathname: "/catalog/pcs",
            crumbLabel: "Механическое реле PCS",
          },
          {
            pathname: "/catalog/elektromagnitnye-klapany/vmr",
            crumbLabel: "Газовые клапаны VMR и VML",
          },
          {
            pathname: "/catalog/elektromagnitnye-klapany/vra-vla-vta",
            crumbLabel: "Клапаны регулирующие VRA, VLA и VTA",
          },
          {
            pathname: "/catalog/elektromagnitnye-klapany/evrmnc-evrmna",
            crumbLabel: "Клапаны с ручным взводом EVRMNC и EVRMNA",
          },
          {
            pathname: "/catalog/elektromagnitnye-klapany/vmrna",
            crumbLabel: "Газовые клапаны VMRNA",
          },
          {
            pathname: "/catalog/elektromagnitnye-klapany/vmm",
            crumbLabel: "Блоки газовых клапанов VMM",
          },
          {
            pathname: "/catalog/elektromagnitnye-klapany/vmh",
            crumbLabel: "Газовые отсечные клапаны VMH",
          },
          {
            pathname: "/projects",
            crumbLabel: "Проекты",
          },
          {
            pathname: "/projects/stadler",
            crumbLabel: "Штадлер",
          },
          {
            pathname: "/projects/minskenergo",
            crumbLabel: "МинскЭнерго",
          },
          {
            pathname: "/projects/belgee",
            crumbLabel: "Белджи",
          },
          {
            pathname: "/projects/kronospan",
            crumbLabel: "Кроноспан",
          },
          {
            pathname: "/projects/belkaliy",
            crumbLabel: "Беларуськалий",
          },
          {
            pathname: "/projects/grodnoazot",
            crumbLabel: "Гродно Азот",
          },
          {
            pathname: "/about-us",
            crumbLabel: "О Компании",
          },
          {
            pathname: "/contacts",
            crumbLabel: "Контакты",
          },
        ],
        // trailingSlashes: optional, will add trailing slashes to the end
        // of crumb pathnames. default is false
        trailingSlashes: true,
        // usePathPrefix: optional, if you are using pathPrefix above
        // usePathPrefix: '/blog',
      },
    },
  ],
};
