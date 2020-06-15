const { createFilePath } = require( 'gatsby-source-filesystem' )
const path = require( 'path' )

// Add slug for each mdx file in 'content'
exports.onCreateNode = ( { node, actions, getNode } ) => {
  const { createNodeField } = actions

  if ( node.internal.type === 'Mdx' ) {
    const slug = createFilePath( {
      node,
      getNode,
      basePath: ' contents',
    } )

    createNodeField( {
      node,
      value: slug,
      name: 'slug',
    } )
  }
}

exports.createPages = async ( { graphql, actions, reporter } ) => {
  const { createPage } = actions
  const templateFile = path.resolve( 'src/components/mdx-pages-layout.js' )

  const result = await graphql( `
  query AddTemplate {
    allMdx {
      edges {
        node {
          id
          fields {
            slug
          }
        }
      }
    }
  }  
  ` )

  if ( result.errors ) {
    reporter.panicOnBuild( '🚨  ERROR: Loading "createPages" query' )
  }

  // Create page
  const page = result.data.allMdx.edges

  // Call `createPage` for each page
  page.forEach( ( { node } ) => {
    createPage( {
      path: node.fields.slug,
      component: templateFile,
      context: {
        id: node.id,
      },
    } )
  } )
}
