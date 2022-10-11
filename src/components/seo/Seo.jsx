import React from "react";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "../../hooks/use-site-metadata";

export const SEO = ({ title, description, pathname, children }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
  };

  return (
    <Helmet
      title={seo.title}
      meta={[
        {
          name: `description`,
          content: seo.description,
        },
        {
          property: `image`,
          content: seo.image,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ]}
    />
  );
};
