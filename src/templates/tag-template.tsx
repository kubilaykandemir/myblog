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
          slug: string;
          description: string;
          date: string;
          image: string;
          author: string;
          tags: string[];
        };
      };
    }[];
  };
}

const TagTemplate: React.FC<PageProps<GraphQLResult>> = ({ data }) => {
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

export default TagTemplate;

export const query = graphql`
  query TagTemplateQuery($tag: String, $limit: Int, $skip: Int) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: $tag } } }
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
            slug
            description
            date
            image
            author
            tags
          }
        }
      }
    }
  }
`;
