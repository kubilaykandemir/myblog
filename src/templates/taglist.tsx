import { Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";

interface PageContextType {
  tagsArray: string[];
}

const TagList: React.FC<PageProps<null, PageContextType>> = ({
  pageContext,
}) => {
  const tagsArray = pageContext.tagsArray;
  const listOfArrays = tagsArray.map((tag, index) => {
    return (
      <li key={index}>
        <Link to={`/tags/${tag}/1`}>
          {tag.replace(tag[0], tag[0].toUpperCase())}
        </Link>
      </li>
    );
  });
  return (
    <Layout>
      <ul>{listOfArrays}</ul>
    </Layout>
  );
};

export default TagList;
