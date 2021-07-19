/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

interface NormalizerFuctionInput {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          frontmatter: {
            author: string;
            date: string;
            description: string;
            title: string;
            categories: string[];
          };
          excerpt: string;
          id: string;
          fields: {
            slug: string;
          };
          rawMarkdownBody: string;
        };
      }[];
    };
  };
}

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
      options: {
        excerpt_separator: `<!-- end -->`,
      },
    },
    {
      resolve: `gatsby-plugin-local-search`,
      options: {
        name: "blog",
        engine: `flexsearch`,
        query: `
          {
            allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
              edges {
                node {
                  frontmatter {
                    author
                    date
                    description
                    title
                    categories
                  }
                  excerpt(format: PLAIN)
                  id
                  fields {
                    slug
                  }
                  rawMarkdownBody
                }
              }
            }
          }
      `,

        ref: "id",
        index: ["title", "description", "excerpt", "slug", "rawMarkdownBody"],
        store: [
          "author",
          "date",
          "title",
          "excerpt",
          "slug",
          "description",
          "id",
          "categories",
        ],
        normalizer: ({ data }: NormalizerFuctionInput) =>
          data.allMarkdownRemark.edges.map((edge) => {
            return {
              title: edge.node.frontmatter.title,
              author: edge.node.frontmatter.author,
              date: edge.node.frontmatter.date,
              excerpt: edge.node.excerpt,
              slug: edge.node.fields.slug,
              description: edge.node.frontmatter.description,
              id: edge.node.id,
              categories: edge.node.frontmatter.categories,
            };
          }),
      },
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
