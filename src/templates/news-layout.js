import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { shape } from 'prop-types'
import { Flex, ButtonOutline } from '@primer/components'
import { ArrowLeftIcon } from '@primer/styled-octicons'
import styled from 'styled-components'

import Layout from '../components/Layout'

const Button = styled( ButtonOutline )`
  width: 4em;
  background-color: transparent;
  box-shadow: none;
  color: ${( { theme: { colors } } ) => colors.theme.blue};
  border: 1px solid ${( { theme: { colors } } ) => colors.theme.blue};
  border-radius: 10px;

  &:focus {
    border: 1px solid white;
    box-shadow: none;
    background-color: inherit;
  }

  &:hover {
    background-color: ${( { theme: { colors } } ) => colors.theme.orange};
    border: 1px solid ${( { theme: { colors } } ) => colors.theme.orange};
  }
`

const NewsTemplate = ( { data: { mdx: { body, frontmatter: { title } } } } ) => (
  <Layout title={title}>

    <h1>{title}</h1>

    <MDXRenderer>{body}</MDXRenderer>

    <Flex justifyContent="flex-end">
      <Button onClick={() => window.history.go( -1 )}>
        <ArrowLeftIcon aria-label="back" />
      </Button>
    </Flex>

  </Layout>
)

NewsTemplate.propTypes = {
  data: shape( { mdx: shape( {} ).isRequired } ).isRequired,
}

export const pageQuery = graphql`
query GetNewsPage($id: String) {
  mdx(id: { eq: $id }, frontmatter: {templateKey: {eq:"news-layout"}}) {
    id
    body
    frontmatter{
      title
    }
  }
}
`

export default NewsTemplate
