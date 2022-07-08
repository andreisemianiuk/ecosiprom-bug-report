// normalize CSS across browsers
import "./src/css/normalize.css";

// custom CSS styles
import "./src/css/style.css";

// import custom font
import "@fontsource/raleway";

// import styles for breadcrumbs
import "gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css";

import React from "react";
import { CatalogMenuProvider } from "./src/common/catalogMenu/useCatalogMenu";
export const wrapRootElement = ({ element }) => (
  <CatalogMenuProvider>{element}</CatalogMenuProvider>
);
