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
          <Link
            key={index}
            className="blogCard__category"
            to={`/categories/${category}/1`}
          >
            {category + ","}
          </Link>
        );
      }
    );

    return (
      <div key={edge.node.id} className="blogCard">
        <Link className="blogCard__title" to={blogLink}>
          <h2>{title}</h2>
        </Link>
        <p className="blogCard__date">
          {date} by {author}
        </p>
        <p className="blogCard__excerpt">{excerpt}</p>
        <Link to={blogLink} className="blogCard__link">
          Read More
        </Link>
        <p className="blogCard__categories">
          <FaFolder />
          {categories}
        </p>
      </div>
    );
  });

  return <div className="blogCard__container">{postCardsArray}</div>;
};

export default PostCards;
