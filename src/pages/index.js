import React from 'react'
import { BaseStyles, Box } from '@primer/components'
import { useStaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'
import useScrollPosition from '@react-hook/window-scroll'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { useSiteMetadata } from '../hooks'
import Navigation from '../components/NavigationBar'
import Footer from '../components/Footer'
import SEO from '../components/seo'

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
  text-align: center;
  margin: 0 0 4px 0;
  font-size: 2.7rem;
  font-weight: 800;
  line-height: normal;
`

const SiteMotto = styled.p`
  margin:0;
  font-weight: 300;
  font-style: italic;
  font-size: 1.2rem;
`

const IndexPage = () => {
  const {
    file: { childImageSharp: { fluid } },
    mdx: { body: whatWeDoBody },
  } = useStaticQuery( graphql`
    query GetHomePage {
      file(sourceInstanceName: {eq: "images"}, name: {eq: "home"}) {
        childImageSharp {
          id
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mdx(frontmatter: {title: {eq: "What we do"}}) {
        body
      }
    }
  ` )

  const { title: siteTitle, motto } = useSiteMetadata()

  const scrollY = useScrollPosition( 60 )
  const navBarColor = scrollY > 150 ? 'theme.blue' : 'transparent'

  return (
    <BaseStyles>

      <SEO title="Home" />

      <Navigation bgColorNav={navBarColor} />

      <div style={{ height: '101.4vh', marginTop: '-80px' }}>
        <BackgroundImage fluid={fluid} style={{ height: '100%' }}>

          <Overlay>
            <Heading>
              <SiteName>{siteTitle}</SiteName>
              <SiteMotto>{motto}</SiteMotto>
            </Heading>
          </Overlay>

        </BackgroundImage>
      </div>

      <Box
        mx={[ 30, null, 90, 150, 250, 300 ]}
        paddingY="10vh"
      >
        <SiteName>What we do</SiteName>
        <MDXRenderer>
          {whatWeDoBody}
        </MDXRenderer>
      </Box>
      <Footer />
    </BaseStyles>
  )
}

export default IndexPage
