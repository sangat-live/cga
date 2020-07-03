import React from 'react'
import { BaseStyles } from '@primer/components'
import { useStaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'
import useScrollPosition from '@react-hook/window-scroll'

import Navigation from '../components/NavigationBar'

const Overlay = styled.div`
  height: 100%;
  color: white;
  background-color: rgba(0,0,0,0.6);
`

const Heading = styled.div`
  margin-top: 35vh;
  text-align: center;
`

const SiteName = styled.h1`
  margin: 0 0 4px 0;
  font-size: 2.7rem;
  font-weight: 800;
  line-height: normal;
`

const Moto = styled.p`
  margin:0;
  font-weight: 300;
  font-style: italic;
  font-size: 1.2rem;
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

  const scrollY = useScrollPosition( 60 )
  const navBarColor = scrollY > 100 ? 'theme.blue' : 'transparent'

  return (
    <BaseStyles>
      <BackgroundImage fluid={fluid} style={{ height: '100vh' }}>

        <Overlay>

          <Navigation bgColorNav={navBarColor} />

          <Heading>
            <SiteName>Chandigarh Gatka Association</SiteName>
            <Moto>Let&rsquo;s Play Gatka</Moto>
          </Heading>

        </Overlay>

      </BackgroundImage>
    </BaseStyles>
  )
}
export default IndexPage
