import React from "react";
import SEO from "components/SEO";
import { graphql } from "gatsby";

import Layout from "components/Layout";
import Article from "components/Article";

import { siteUrl } from "../../blog-config";

const Post = ({ data, children }) => {
  const post = data.mdx;
  const { previous, next, seriesList } = data;

  const { title, date, update, tags, series } = post.frontmatter;
  const { readingTime } = post.fields;

  let filteredSeries = [];
  if (series !== null) {
    filteredSeries = seriesList.edges.map((seriesPost) => {
      if (seriesPost.node.id === post.id) {
        return {
          ...seriesPost.node,
          currentPost: true,
        };
      } else {
        return {
          ...seriesPost.node,
          currentPost: false,
        };
      }
    });
  }

  return (
    <Layout>
      <Article>
        <Article.Header
          title={title}
          date={date}
          update={update}
          tags={tags}
          minToRead={Math.round(readingTime.minutes)}
        />
        {filteredSeries.length > 0 && (
          <Article.Series header={series} series={filteredSeries} />
        )}
        <Article.Body>{children}</Article.Body>
        <Article.Footer previous={previous} next={next} />
      </Article>
    </Layout>
  );
};

export default Post;

export const Head = ({ data }) => {
  const post = data.mdx;
  return (
    <SEO
      title={post.frontmatter.title}
      description={post.excerpt}
      url={`${siteUrl}${post.fields.slug}`}
    />
  );
};

export const pageQuery = graphql`
  query (
    $id: String!
    $series: String
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 200)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        update(formatString: "MMMM DD, YYYY")
        tags
        series
      }
      fields {
        slug
        readingTime {
          minutes
        }
      }
    }
    seriesList: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
