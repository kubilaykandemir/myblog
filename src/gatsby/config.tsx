/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

export default {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/../pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/../blog/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {},
    },
    // {
    //   resolve: `gatsby-plugin-mdx`,
    //   options: {
    //     extensions: [".mdx", ".md"],
    //   },
    // },
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};
