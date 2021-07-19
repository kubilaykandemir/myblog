// create a file path
import path from "path";
// import { slugify } from './src/utils/Utilities';
import { createFilePath } from "gatsby-source-filesystem";
import _ from "lodash";
import { GatsbyNode } from "gatsby";

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;
  //ensure we are processing only markdown
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "blog",
    });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  // https://www.gatsbyjs.com/docs/creating-and-modifying-pages/
  interface GraphQLResult {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            slug: string;
          };
          frontmatter: {
            categories: string[];
          };
        };
      }[];
      totalCount: number;
    };
  }

  const { createPage } = actions;

  const result = await graphql<GraphQLResult>(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              categories
            }
          }
        }
        totalCount
      }
    }
  `);

  if (!result.data) {
    throw new Error("Failed getting GraphQL results");
  }

  // All categories in my markdown files
  const posts = result.data.allMarkdownRemark.edges;
  // const numberOfPages = result.data.allMarkdownRemark.totalCount;
  const categoryTemplate = path.resolve(
    "./src/templates/category-template.tsx"
  );
  const categoryListTemplate = path.resolve("./src/templates/categorylist.tsx");

  let allCategories: string[] = [];
  _.each(posts, (edge) => {
    if (_.get(edge, "node.frontmatter.categories")) {
      allCategories = allCategories.concat(edge.node.frontmatter.categories);
    }
  });
  const uniqAllCategories = _.uniq(allCategories);

  createPage({
    path: `/categories/`,
    component: categoryListTemplate,
    context: {
      categoriesArray: uniqAllCategories,
    },
  });

  uniqAllCategories.forEach((category) => {
    const filteredPosts = posts.filter((element) =>
      element.node.frontmatter.categories.includes(category)
    );
    const limit = 10;
    const numPages = filteredPosts.length;
    const pageNumber = Math.ceil(numPages / limit);
    for (let i = 0; i < pageNumber; i++) {
      createPage({
        path: `/categories/${category}/${i + 1}`,
        component: categoryTemplate,
        context: {
          category,
          limit: limit,
          skip: i * limit,
          numPages: numPages,
          currentPage: i + 1,
        },
      });
    }
  });

  // get the blog-template path
  const blogTemplate = path.resolve("./src/templates/blog-template.tsx");
  // get posts array from query

  posts.forEach(({ node }, index: number) => {
    createPage({
      path: node.fields.slug,
      component: blogTemplate,
      context: {
        slug: node.fields.slug,
        prev: index === 0 ? null : posts[index - 1],
        next: posts.length - 1 ? null : posts[index + 1],
      },
    });
  });
};
