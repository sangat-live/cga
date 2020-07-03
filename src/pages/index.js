import React from 'react'
import { Heading, BaseStyles } from '@primer/components'
import { useStaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'

import Navigation from '../components/NavigationBar'

const BG = styled( BackgroundImage )`
  width:100%;
  height: 50vh;
  background-size: cover;
  background-position: center;
`

const Overlay = styled.div`
  height: 100%;
  background-color: rgba(0,0,0,0.6);
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
    <BaseStyles>
      <BG fluid={fluid}>
        <Overlay>
          <Navigation />
          <Heading>
            HOME PAGE
          </Heading>
        </Overlay>
      </BG>
    </BaseStyles>
  )
}
export default IndexPage
