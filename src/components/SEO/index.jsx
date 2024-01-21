import React from "react";
import { siteUrl } from "../../../blog-config";

const SEO = ({ title, description, url }) => {
  return (
    <>
      <title>{title}</title>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
    </>
  );
};

export default SEO;
