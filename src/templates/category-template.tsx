import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import PostCards from "../components/PostCards";

interface GraphQLResult {
  allMarkdownRemark: {
    edges: {
      node: {
        id: string;
        frontmatter: {
          author: string;
          title: string;
          description: string;
          date: string;
          categories: string[];
        };
        excerpt: string;
        fields: {
          slug: string;
        };
      };
    }[];
  };
}

const CategoryTemplate: React.FC<PageProps<GraphQLResult>> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <PostCards posts={posts} />
    </Layout>
  );
};

export default CategoryTemplate;

export const query = graphql`
  query CategoryTemplateQuery($category: String, $limit: Int, $skip: Int) {
    allMarkdownRemark(
      filter: { frontmatter: { categories: { eq: $category } } }
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          excerpt
          frontmatter {
            title
            description
            date
            author
            categories
          }
        }
      }
    }
  }
`;
