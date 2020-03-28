module.exports = {
  plugins: [
    'gatsby-tinacms-json',
    'gatsby-transformer-json',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `src/data`,
        name: `data`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `src/pages`,
        name: `pages`
      }
    },
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        sidebar: {
          position: 'displace'
        },
        plugins: [
          'gatsby-tinacms-git',
          'gatsby-tinacms-remark'
        ]
      }
    }
  ]
}
