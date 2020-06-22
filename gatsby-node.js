const { createFilePath } = require( 'gatsby-source-filesystem' )
const path = require( 'path' )

// Add slug for each mdx file in 'content'
exports.onCreateNode = ( { node, actions, getNode } ) => {
  const { createNodeField } = actions

  if ( node.internal.type === 'Mdx' ) {
    const slug = createFilePath( { node, getNode } )
    createNodeField( { node, value: slug, name: 'slug' } )
  }
}

exports.createPages = async ( { graphql, actions, reporter } ) => {
  const { createPage } = actions

  const result = await graphql( `
  query AllPages {
    allMdx {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter{
            templateKey
          }
        }
      }
    }
  }
  ` )

  if ( result.errors ) reporter.panicOnBuild( '🚨  ERROR: Loading "createPages" query' )

  // Create page
  const page = result.data.allMdx.edges

  // Call `createPage` for each page
  page
    .filter( ( { node: { frontmatter: { templateKey } } } ) => templateKey )
    .forEach( ( { node: { id, frontmatter: { templateKey }, fields: { slug } } } ) => {
      createPage( {
        path: slug,
        component: path.resolve( `src/templates/${templateKey}.js` ),
        context: { id },
      } )
    } )
}
