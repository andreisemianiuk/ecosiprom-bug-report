// normalize CSS across browsers
import "./src/css/normalize.css";

// custom CSS styles
import "./src/css/style.css";

// import custom font
import "@fontsource/raleway";

// import styles for breadcrumbs
import "gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css";

import React from "react";
import { AppProvider } from "./src/api/contextApi";
export const wrapRootElement = ({ element }) => (
  <AppProvider>{element}</AppProvider>
);
