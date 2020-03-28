import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { withPlugin } from 'tinacms'
import { useGlobalJsonForm } from 'gatsby-tinacms-json'
import { useLocalRemarkForm, RemarkCreatorPlugin } from 'gatsby-tinacms-remark'
import slugify from 'slugify'
import README from '../../../README.md'
import Base from '../components/base'
import Center from '../components/center'

require('prismjs/themes/prism-okaidia.css')

const Page = ({ data }) => {
  const [page] = useLocalRemarkForm(data.page, editPageForm)
  const [navigation] = useGlobalJsonForm(data.navigation, editNavigationForm)

  return (
    <Base>
      <Center>
        { page.frontmatter.useReadme ? (
          <div dangerouslySetInnerHTML={{ __html: README }} />
        ) : (
          <div>
            <ul>
              { navigation.main.map(item => (
                <li>
                  { item.internal ?  (
                    <Link to={item.target}>{ item.title }</Link>
                  ) : (
                    <a href={item.target || '/'} target="_blank">{ item.title }</a>
                  )}
                </li>
              ))}
            </ul>
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
          </div>
        )}
      </Center>
    </Base>
  )
}

Page.propTypes = {
  data: PropTypes.shape({
    navigation: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string
    })),
    page: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string
      })
    })
  })
}

const createPageForm = {
  label: 'New Page',
  fields: [
    { name: 'title', component: 'text', label: 'Title' },
    { name: 'slug', component: 'text', label: 'Slug' }
  ],
  filename(form) {
    const slug = slugify(form.title.toLowerCase())
    return `pages/${slug}.md`
  },
  data(form) {
    const slug = slugify(form.title.toLowerCase())
    return {
      createdAt: new Date(),
      updatedAt: null,
      title: form.title,
      language: form.language,
      description: '',
      slug
    }
  }
}

const editPageForm = {
  fields: [
    {
      name: 'frontmatter.title',
      component: 'text',
      label: 'Title'
    },
    {
      name: 'frontmatter.slug',
      component: 'text',
      label: 'Slug'
    },
    {
      name: 'frontmatter.useReadme',
      component: 'condition',
      label: 'Use Readme',
      trigger: {
        component: 'toggle'
      },
      fields: useReadme => {
        if (!useReadme) {
          return [
            {
              name: 'frontmatter.test',
              component: 'text',
              label: 'Some test',
              description: 'To prove it works with multiple fields'
            },
            {
              label: 'Body',
              component: 'markdown',
              name: 'rawMarkdownBody'
            }
          ]
        }
      }
    }
  ]
}

const editNavigationForm = {
  label: "Navigation",
  fields: [
    {
      label: "Main Menu",
      name: "rawJson.main",
      component: "group-list",
      itemProps: item => ({
        label: item.title,
      }),
      defaultItem: () => ({
        title: 'New Menu Item',
        internal: true
      }),
      fields: [
        {
          label: "Title",
          name: "title",
          component: "text"
        },
        {
          label: 'Internal',
          name: 'internal',
          description: 'Set to false if you want link to another website',
          component: "condition",
          trigger: {
            component: "toggle"
          },
          fields: (internal) => {
            return internal ? [
              {
                label: "Slug",
                name: "slug",
                component: "text"
              }
            ] : [
              {
                label: "Link",
                name: "link",
                component: "text",
              }
            ]
          }
        },
      ],
    },
  ],
}

export const pageQuery = graphql`
  query($slug: String!) {
    page: markdownRemark(
      frontmatter: {
        slug: { eq: $slug }
      }
    ) {
      id
      html
      frontmatter {
        slug
        title
        useReadme
      }

      fileRelativePath
      rawMarkdownBody
      rawFrontmatter
    }
    navigation: dataJson(
      fileRelativePath: { eq: "/src/data/navigation.json" }
    ) {
      main {
        title
        slug
        link
        internal
      }

      rawJson
      fileRelativePath
    }
  }
`

const CreatePagePlugin = new RemarkCreatorPlugin(createPageForm)

export default withPlugin(Page, CreatePagePlugin)
