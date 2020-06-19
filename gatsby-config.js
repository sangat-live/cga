module.exports = {
  siteMetadata: {
    title: 'Chandigarh Gatka Association',
    description: 'Chandigarh Gatka Association',
    author: '@saihaj',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'mdx',
        path: `${__dirname}/content/data`,

      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Chandigarh Gatka Association',
        short_name: 'CGA',
        start_url: '/',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [ '.mdx', '.md' ],
        defaultLayouts: {
          default: require.resolve( './src/components/Layout.js' ),
        },
      },
    },
  ],
}
