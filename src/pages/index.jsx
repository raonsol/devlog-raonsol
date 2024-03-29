import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import Layout from "components/Layout";
import SEO from "components/SEO";
import Bio from "components/Bio";
import PostList from "components/PostList";
import SideTagList from "components/SideTagList";
import Divider from "components/Divider";
import VerticalSpace from "components/VerticalSpace";

import { title, description, siteUrl } from "../../blog-config";

const BlogIndex = ({ data }) => {
  const posts = data.allMdx.nodes;
  const tags = _.sortBy(data.allMdx.group, ["totalCount"]).reverse();

  if (posts.length === 0) {
    return (
      <p>
        No blog posts found. Add markdown posts to &quot;content/blog&quot; (or
        the directory you specified for the &quot;gatsby-source-filesystem&quot;
        plugin in gatsby-config.js).
      </p>
    );
  }

  return (
    <Layout>
      <VerticalSpace size={48} />
      <Bio />
      <Divider />
      <SideTagList tags={tags} postCount={posts.length} />
      <PostList postList={posts} />
    </Layout>
  );
};

export default BlogIndex;

export const Head = () => (
  <SEO title={title} description={description} url={siteUrl} />
);

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          update(formatString: "MMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`;
