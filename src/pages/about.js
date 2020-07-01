import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/Layout'

const About = () => {
  const { mdx: { body } } = useStaticQuery( graphql`
    query GetAboutPage {
      mdx(frontmatter: {title: {eq: "About"}}) {
        id
        body
      }
    }
  ` )

  return (
    <Layout title="About">
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  )
}
export default About
