import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Text } from '@primer/components'
import { shape, string } from 'prop-types'
import title from 'title'

import Layout from '../components/Layout'
import { NewsBorderBox as ImageBox } from '../components/NewsBox'
import { RemoveNum } from '../lib/utils'
import AnimatedSlider from '../components/AnimatedSlider'

const ImageCard = ( { image, name, ...props } ) => (
  <ImageBox mx={2} my={1} maxWidth="fit-content" {...props}>
    <Img fixed={image} alt={`Image of ${title( RemoveNum( name ) )}`} />
    <Text mt={1} mb={2} pl={3} fontSize="1.4rem" as="h4">
      {title( RemoveNum( name ) )}
    </Text>
  </ImageBox>
)

ImageCard.propTypes = {
  image: shape( {} ).isRequired,
  name: string.isRequired,
}

const About = () => {
  const { org, coaches } = useStaticQuery( graphql`
  query GetAboutPage {
    org: allFile(
      filter: {sourceInstanceName: {eq: "images"}, relativeDirectory:{eq:"team/org"}},
      sort: {fields: name}
      ) {
      ...ImageCard
    }
    coaches: allFile(
      filter: {sourceInstanceName: {eq: "images"}, relativeDirectory:{eq:"team/coaches"}},
      sort: {fields: name}
      ) {
      ...ImageCard
      }
  }
  fragment ImageCard on FileConnection {
    edges {
      node {
        name
        childImageSharp {
          id
          fixed(height:400, width:300, quality:100) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
    }
  }
` )

  return (
    <Layout title="About">

      <Text as="h1">Board of Directors</Text>
      <AnimatedSlider widthConstraint={-190}>

        {org.edges.map( ( {
          node: {
            childImageSharp: { id, fixed },
            name,
          },
        } ) => (
          <ImageCard
            key={id}
            image={fixed}
            name={name}
          />
        ) )}
      </AnimatedSlider>

      <Text as="h1">Coaches</Text>
      <AnimatedSlider widthConstraint={-190}>
        {coaches.edges.map( ( {
          node: {
            childImageSharp: { id, fixed },
            name,
          },
        } ) => (
          <ImageCard key={id} image={fixed} name={name} />
        ) )}
      </AnimatedSlider>

    </Layout>
  )
}
export default About
