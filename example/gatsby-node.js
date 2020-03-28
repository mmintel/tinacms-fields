const path = require(`path`)
const Prism = require('prismjs')

require('prismjs/components/prism-bash')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-rest')
require('prismjs/components/prism-jsx')

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

exports.onCreateWebpackConfig = ({
  actions
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader'
            },
            {
              loader: 'markdown-loader',
              options: {
                highlight: function (code, lang) {
                  return Prism.highlight(code, Prism.languages[lang], lang);
                }
              }
            }
          ]
        }
      ]
    }
  })
}
