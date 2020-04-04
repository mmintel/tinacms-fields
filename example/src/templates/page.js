import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import { withPlugin } from 'tinacms';
import { useGlobalJsonForm } from 'gatsby-tinacms-json';
import { useLocalRemarkForm, RemarkCreatorPlugin } from 'gatsby-tinacms-remark';
import slugify from 'slugify';
import Base from '../components/base';
import Center from '../components/center';

const editPageForm = {
  fields: [
    {
      name: 'frontmatter.title',
      component: 'text',
      label: 'Title',
    },
    {
      name: 'frontmatter.slug',
      component: 'text',
      label: 'Slug',
    },
    {
      name: 'frontmatter.related',
      component: 'pages',
      label: 'Related Pages',
    },
    {
      name: 'frontmatter.file',
      component: 'file',
      description: 'This is a pdf upload field',
      label: 'PDF',
      accept: 'application/pdf',
      parse: (file) => `../uploads/${file}`,
      uploadDir: () => 'src/uploads',
    },
    {
      name: 'frontmatter.showContent',
      component: 'condition',
      label: 'Show content',
      trigger: {
        component: 'toggle',
      },
      fields: (showContent) => {
        if (showContent) {
          return [
            {
              name: 'frontmatter.test',
              component: 'text',
              label: 'Some test',
              description: 'To prove it works with multiple fields',
            },
            {
              label: 'Body',
              component: 'markdown',
              name: 'rawMarkdownBody',
            },
          ];
        }
      },
    },
  ],
};

const editNavigationForm = {
  label: 'Navigation',
  fields: [
    {
      label: 'Main Menu',
      name: 'rawJson.main',
      component: 'group-list',
      itemProps: (item) => ({
        label: item.title,
      }),
      defaultItem: () => ({
        title: 'New Menu Item',
        internal: true,
      }),
      fields: [
        {
          label: 'Title',
          name: 'title',
          component: 'text',
        },
        {
          label: 'Internal',
          name: 'internal',
          description: 'Set to false if you want link to another website',
          component: 'condition',
          trigger: {
            component: 'toggle',
          },
          fields: (internal) => (internal ? [
            {
              label: 'Page',
              name: 'page',
              component: 'page',
            },
          ] : [
            {
              label: 'Link',
              name: 'link',
              component: 'text',
            },
          ]),
        },
      ],
    },
  ],
};

const Page = ({ data }) => {
  const [page] = useLocalRemarkForm(data.page, editPageForm);
  const [navigation] = useGlobalJsonForm(data.navigation, editNavigationForm);

  return (
    <Base>
      <Center>
        <div>
          <ul>
            { navigation.main.map((item) => (
              <li>
                { item.internal ? (
                  <Link to={item.target || '/'}>{ item.title }</Link>
                ) : (
                  <div>
                    <a href={item.target || '/'} target="_blank" rel="noopener noreferrer">{ item.title }</a> (external)
                  </div>
                )}
              </li>
            ))}
          </ul>
          { page.frontmatter.showContent && (
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
          )}
        </div>
      </Center>
    </Base>
  );
};

Page.propTypes = {
  data: PropTypes.shape({
    navigation: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
    })),
    page: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
        showContent: PropTypes.bool,
      }),
    }),
  }).isRequired,
};

const createPageForm = {
  label: 'New Page',
  fields: [
    { name: 'title', component: 'text', label: 'Title' },
    { name: 'slug', component: 'text', label: 'Slug' },
  ],
  filename(form) {
    const slug = slugify(form.title.toLowerCase());
    return `pages/${slug}.md`;
  },
  data(form) {
    const slug = slugify(form.title.toLowerCase());
    return {
      createdAt: new Date(),
      updatedAt: null,
      title: form.title,
      language: form.language,
      description: '',
      slug,
    };
  },
};

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
        showContent
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
`;

const CreatePagePlugin = new RemarkCreatorPlugin(createPageForm);

export default withPlugin(Page, CreatePagePlugin);
