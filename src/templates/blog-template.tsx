import React from "react";
import Layout from "../components/Layout";
import { graphql, PageProps } from "gatsby";

interface GraphQLResult {
  markdownRemark: {
    html: string;
    frontmatter: {
      author: string;
      date: string;
      description: string;
      categories: [string];
      title: string;
    };
  };
}

const BlogTemplate: React.FC<PageProps<GraphQLResult>> = ({ data }) => {
  // const { id } = props.data.markdownRemark
  const { title, categories, description } = data.markdownRemark.frontmatter;
  // const { prev, next } = props.pageContext

  return (
    <Layout>
      <div>{title}</div>
      <div>{description}</div>
      <div>{categories}</div>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  );
};

export default BlogTemplate;

export const query = graphql`
  query BlogTemplateQuery($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        author
        date
        description
        categories
        title
      }
    }
  }
`;
