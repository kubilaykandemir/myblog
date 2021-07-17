import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";

interface GraphQLResult {
  allMarkdownRemark: {
    edges: {
      node: {
        id: string;
        frontmatter: {
          title: string;
          description: string;
          date: string;
          image: string;
          author: string;
          categories: string[];
        };
      };
    }[];
  };
}

const CategoryTemplate: React.FC<PageProps<GraphQLResult>> = ({ data }) => {
  const edges = data.allMarkdownRemark.edges;
  const postArray = edges.map((edge) => {
    const frontMatter = edge.node.frontmatter;
    return (
      <div key={edge.node.id}>
        <h2>{frontMatter.title}</h2>
        <h2>{frontMatter.author}</h2>
        <h2>{frontMatter.date}</h2>
        <h2>{frontMatter.description}</h2>
      </div>
    );
  });

  return <Layout>{postArray}</Layout>;
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
          frontmatter {
            title
            description
            date
            image
            author
            categories
          }
        }
      }
    }
  }
`;
