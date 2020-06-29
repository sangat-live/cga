import React from 'react'
import { BorderBox, Flex } from '@primer/components'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { string } from 'prop-types'

import { changeColorAlpha } from '../lib/utils'

const GatsbyLink = styled( Link )`
  color: inherit;
  text-decoration: none;
`

const NewsBorderBox = styled( BorderBox )`
  border-color: ${( { theme: { colors } } ) => colors.theme.blue};
  box-shadow: 0 0 3px 1px ${( { theme: { colors } } ) => changeColorAlpha( colors.theme.blue, 0.2 )};

  &:hover {
    border-color: ${( { theme: { colors } } ) => colors.theme.orange};
    box-shadow: 0px 0px 3px 1px ${( { theme: { colors } } ) => changeColorAlpha( colors.theme.orange, 0.2 )};
  }
`

const NewsHeading = styled.h1`
  margin: 0;
  font-size: 1.5em;
  margin-bottom: 0.5rem;

  /* No margin needed on small screens */
  @media(max-width: ${( { theme: { breakpoints: [ small ] } } ) => small}){
    margin-bottom: 0;
  }
`

const NewsContent = styled.p`
  margin: 0;
  font-size: 1.2em;
  margin-bottom: 0.5em;

  /* Show only three lines */
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  /* Hide on small screens */
  @media(max-width: ${( { theme: { breakpoints: [ small ] } } ) => small}){
    display: none;
  }
`

const Date = styled.footer`
  font-size: 0.7em;
  text-align: right;
  opacity: 0.5;
`

const NewsBox = ( { url, title, excerpt, date, ...props } ) => (
  <GatsbyLink to={url}>
    <NewsBorderBox {...props}>

      <Flex mx={5} my={3} flexDirection="column">
        <NewsHeading>{title}</NewsHeading>
        <NewsContent>{excerpt}</NewsContent>
        <Date>{date}</Date>
      </Flex>

    </NewsBorderBox>
  </GatsbyLink>
)

NewsBox.propTypes = {
  url: string,
  title: string,
  excerpt: string,
  date: string,
}

NewsBox.defaultProps = {
  url: null,
  title: null,
  excerpt: null,
  date: null,
}

export default NewsBox
