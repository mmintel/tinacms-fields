module.exports = {
  plugins: [
    'gatsby-tinacms-json',
    'gatsby-transformer-json',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'src/data',
        name: 'data',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'src/pages',
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        sidebar: {
          position: 'displace',
        },
        plugins: [
          'gatsby-tinacms-git',
          'gatsby-tinacms-remark',
        ],
      },
    },
  ],
};
