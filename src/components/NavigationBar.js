import React from 'react'
import { BorderBox, Flex, Text } from '@primer/components'

import styled from 'styled-components'
import { Link } from 'gatsby'

import { BlueColor } from '../lib/theme'
import nav from '../lib/nav.yml'

const GatsbyLink = styled( Link )`
  color: inherit;
  text-decoration: none;
`

const NavItems = ( { items } ) => items.map( ( { title, url }, index ) => (
  <BorderBox
    key={title}
    border={0}
    borderRadius={0}
    borderTop={index !== 0 ? 1 : 0}
    borderColor="transparent"
    paddingLeft={[ 3, 3, 4 ]}
  >
    <GatsbyLink key={title} to={url} style={{ color: 'inherit', display: 'block' }}>
      <Text fontSize={3}>
        {title}
      </Text>
    </GatsbyLink>

  </BorderBox>
) )

const Navigation = () => (
  <Flex
    flexDirection="column"
    height="100%"
    style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch' }}
  >

    <Flex flexDirection="column" flex="1 0 auto" color="white" bg={BlueColor}>
      <BorderBox border={0} borderRadius={0} borderBottom={0} borderColor={BlueColor}>

        <Flex py={2} pl={[ 4, 4, 6 ]} pr={3} alignItems="center" justifyContent="space-between">

          <GatsbyLink to="/">
            <Text fontSize={5} fontWeight="bold">CGA</Text>
          </GatsbyLink>

          <Flex flexDirection="row" pr={[ 2, 2, 6 ]}>
            <NavItems items={nav} />
          </Flex>

        </Flex>

      </BorderBox>
    </Flex>

  </Flex>
)

export default Navigation
