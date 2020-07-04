import React from 'react'
import { BaseStyles, Flex } from '@primer/components'
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
  padding-top: 40vh;
  text-align: center;
`

const SiteName = styled.h1`
  margin: 0 0 4px 0;
  font-size: 2.7rem;
  font-weight: 800;
  line-height: normal;
`

const SiteMoto = styled.p`
  margin:0;
  font-weight: 300;
  font-style: italic;
  font-size: 1.2rem;
`

const IndexPage = () => {
  const { file: { childImageSharp: { fluid } } } = useStaticQuery( graphql`
    query GetBgImageHome {
      file(sourceInstanceName: {eq: "images"}, name: {eq: "home"}) {
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
  const navBarColor = scrollY > 150 ? 'theme.blue' : 'transparent'

  return (
    <BaseStyles>

      <Navigation bgColorNav={navBarColor} />

      <div style={{ height: '102vh', marginTop: '-80px' }}>
        <BackgroundImage fluid={fluid} style={{ height: '100%' }}>

          <Overlay>
            <Heading>
              <SiteName>Chandigarh Gatka Association</SiteName>
              <SiteMoto>Let&rsquo;s Play Gatka</SiteMoto>
            </Heading>
          </Overlay>

        </BackgroundImage>
      </div>

    </BaseStyles>
  )
}
export default IndexPage
