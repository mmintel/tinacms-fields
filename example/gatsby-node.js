const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(__dirname, `./src/templates/page.js`)
  const result = await graphql(
    `
      query PageQuery {
        pages: allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    throw result.errors
  }

  const pages = result.data.pages.edges

  pages.forEach((page) => {
    const node = page.node
    const { frontmatter } = node

    createPage({
      path: frontmatter.slug,
      component: pageTemplate,
      context: {
        slug: frontmatter.slug
      }
    })
  })
}
