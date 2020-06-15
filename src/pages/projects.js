import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

const Projects = () => {
  const data = useStaticQuery( graphql`
  query Projects {
    allMdx(filter: {fileAbsolutePath: {regex: "/projects/"}}, sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }  
  ` )

  return (
    <Layout>
      <SEO title="Projects" />
      {data.allMdx.edges.map( ( { node } ) => (
        <div>
          <Link to={node.fields.slug}>
            <h3>{node.frontmatter.title}</h3>
          </Link>
        </div>
      ) )}
    </Layout>
  )
}

export default Projects
