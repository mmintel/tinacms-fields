import { useStaticQuery, graphql } from 'gatsby';

export default () => {
  const { pages } = useStaticQuery(
    graphql`
      query allCollectionsQuery {
        pages: allMarkdownRemark {
          nodes {
            id
            frontmatter {
              title
            }
          }
        }
      }
    `,
  );
  return pages.nodes;
};
