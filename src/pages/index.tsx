import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Layout from "../components/Layout";

interface GraphQLResult {
  allMarkdownRemark: {
    edges: {
      node: {
        frontmatter: {
          author: string;
          categories: string[];
          date: string;
          description: string;
          title: string;
        };
        excerpt: string;
        id: string;
      };
    }[];
  };
}

const Home: React.FC = () => {
  const data: GraphQLResult = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
          edges {
            node {
              frontmatter {
                author
                categories
                date
                description
                title
              }
              excerpt(format: PLAIN)
              id
            }
          }
        }
      }
    `
  );

  const posts = data.allMarkdownRemark.edges;
  const postCards = posts.map((edge) => {
    const { author, date, description, title } = edge.node.frontmatter;
    const summary = edge.node.excerpt;
    const categories = edge.node.frontmatter.categories.join(", ");

    return (
      <div key={edge.node.id}>
        <p>{author}</p>
        <p>{date}</p>
        <p>{title}</p>
        <p>{description}</p>
        <p>{categories}</p>
        <br />
        <p>{summary}</p>
        <br />
        <br />
      </div>
    );
  });

  return <Layout>{postCards}</Layout>;
};
export default Home;
