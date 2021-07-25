import { Link } from "gatsby";
import React from "react";
import { FaFolder } from "react-icons/fa";

interface PostCardProps {
  posts: {
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
}

const PostCards: React.FC<PostCardProps> = ({ posts }) => {
  const postCardsArray = posts.map((edge) => {
    const { author, date, title } = edge.node.frontmatter;
    const excerpt = edge.node.excerpt;
    const blogLink = edge.node.fields.slug;
    const categories = edge.node.frontmatter.categories.map(
      (category, index) => {
        return (
          <li key={index}>
            <Link to={`/categories/${category}/1`}>{category + ","}</Link>
          </li>
        );
      }
    );

    return (
      <div key={edge.node.id} className="postCard">
        <Link to={blogLink}>
          <h2>{title}</h2>
        </Link>
        <span>
          {date} by {author}
        </span>
        <p>{excerpt}</p>
        <Link to={blogLink}>Read More</Link>
        <ul>
          <FaFolder />
          {categories}
        </ul>
      </div>
    );
  });

  return <div className="postCard__container">{postCardsArray}</div>;
};

export default PostCards;
