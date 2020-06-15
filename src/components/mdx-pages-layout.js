import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { shape } from 'prop-types'

import Layout from './Layout'
import SEO from './seo'

export default function PageTemplate( { data: { mdx } } ) {
  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} />
      <MDXProvider>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

PageTemplate.propTypes = {
  data: shape( { mdx: shape( {} ).isRequired } ).isRequired,
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
