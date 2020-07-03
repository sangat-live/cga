import React from 'react'
import { Heading } from '@primer/components'
import { useStaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'

import Layout from '../components/Layout'

const BG = styled( BackgroundImage )`
  width:100%;
  height: 50vh;
  background-size: cover;
  background-position: center;
`

const Overlay = styled.div`
  display: flex;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  align-items: center;
  color: white;
`

const IndexPage = () => {
  const { file: { childImageSharp: { fluid } } } = useStaticQuery( graphql`
    query GetBgImageHome {
      file(sourceInstanceName: {eq: "images"}, name: {eq: "test"}) {
        childImageSharp {
          id
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  ` )

  return (
    <Layout title="Home">
      <BG fluid={fluid}>
        <Overlay>
          <Heading>
            HOME PAGE
          </Heading>
        </Overlay>
      </BG>
    </Layout>

  )
}
export default IndexPage
