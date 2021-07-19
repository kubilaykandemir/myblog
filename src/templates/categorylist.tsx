import { Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";

interface PageContextType {
  categoriesArray: string[];
}

const CategoryList: React.FC<PageProps<null, PageContextType>> = ({
  pageContext,
}) => {
  const categoriesArray = pageContext.categoriesArray;
  const listOfArrays = categoriesArray.map((category, index) => {
    return (
      <li key={index}>
        <Link className="categories__links" to={`/categories/${category}/1`}>
          {category.replace(category[0], category[0].toUpperCase())}
        </Link>
      </li>
    );
  });
  return (
    <Layout>
      <div className="categories__container">
        <ul>{listOfArrays}</ul>
      </div>
    </Layout>
  );
};

export default CategoryList;
