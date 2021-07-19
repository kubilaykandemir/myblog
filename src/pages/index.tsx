import React from "react";
// import { useFlexSearch } from "react-use-flexsearch";
const flexSearch = require("react-use-flexsearch");
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import PostCards from "../components/PostCards";
import { graphql, useStaticQuery } from "gatsby";

const Home: React.FC = () => {
  interface GraphQLResult {
    localSearchBlog: {
      store: any;
      index: string;
    };
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
          fields: {
            slug: string;
          };
        };
      }[];
    };
  }

  const data: GraphQLResult = useStaticQuery(
    graphql`
      query {
        localSearchBlog {
          store
          index
        }
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
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  let searchQuery = null;
  if (typeof window !== "undefined") {
    searchQuery = new URLSearchParams(window.location.search).get("s");
  }
  const { index, store } = data.localSearchBlog;

  const searchResult = unFlattenResults(
    flexSearch.useFlexSearch(searchQuery, index, store)
  );

  const posts = searchQuery ? searchResult : data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SearchBar />
      <PostCards posts={posts} />
    </Layout>
  );
};
export default Home;

interface searchResultPostType {
  author: string;
  date: string;
  title: string;
  excerpt: string;
  slug: string;
  description: string;
  categories: string[];
  id: string;
}

const unFlattenResults = (results: any[]) => {
  return results.map((post: searchResultPostType) => {
    const { author, date, title, excerpt, slug, categories, description, id } =
      post;
    return {
      node: {
        frontmatter: {
          author,
          categories,
          description,
          date,
          title,
        },
        excerpt,
        fields: {
          slug,
        },
        id,
      },
    };
  });
};
