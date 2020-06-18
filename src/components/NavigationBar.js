import React, { useContext } from 'react'
import { BorderBox, Flex, Text, ButtonOutline, themeGet } from '@primer/components'
import { ThreeBarsIcon, XIcon } from '@primer/styled-octicons'
import styled, { ThemeContext } from 'styled-components'
import { Link } from 'gatsby'
import { func, bool } from 'prop-types'

import { useNavDrawerState } from '../hooks'
import nav from '../lib/nav.yml'
import Drawer from './Drawer'

const GatsbyLink = styled( Link )`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: ${themeGet( 'themeOrange' )};
  }
`

const Button = styled( ButtonOutline )`
  background-color: transparent;
  box-shadow: none;
  color: white;
  border: 1px solid white;

  &:focus {
    border: 1px solid white;
    box-shadow: none;
    background-color: inherit;
  }

  &:hover {
    background-color: ${themeGet( 'themeOrange' )};
    color: ${themeGet( 'themeBlue' )};
    border: 1px solid ${themeGet( 'themeOrange' )};
  }
`

const ActiveBorderBox = styled( BorderBox )`
  &:hover {
    background-color: ${themeGet( 'themeOrange' )};
    color: ${themeGet( 'themeBlue' )};
}
`

const Brand = styled( Text )`
  font-size: 2em;
  font-weight: bold;
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

    <GatsbyLink key={title} to={url}>
      <Text fontSize={3}>{title}</Text>
    </GatsbyLink>

  </BorderBox>
) )

const NavDrawerItems = ( { items, onDismiss } ) => items.map( ( { title, url }, index ) => (
  <GatsbyLink
    key={title}
    to={url}
    color="inherit"
    display="block"
    activeStyle={{ color: themeGet( 'themeOrange' ) }}
    onClick={onDismiss}
  >
    <ActiveBorderBox
      key={title}
      border={0}
      borderRadius={0}
      borderTop={index !== 0 ? 1 : 0}
      borderColor="transparent"
      borderBottomColor="white"
      py={2}
      pl={4}
    >

      <Text fontSize={4}>{title}</Text>

    </ActiveBorderBox>
  </GatsbyLink>
) )

const NavDrawer = ( { isOpen, onDismiss } ) => {
  const { themeBlue } = useContext( ThemeContext )

  return (
    <Drawer isOpen={isOpen} onDismiss={onDismiss}>
      <Flex
        flexDirection="column"
        height="100%"
        bg={themeBlue}
      >

        <Flex flexDirection="column" flex="1 0 auto">
          <BorderBox border={0} borderRadius={0} borderBottom={1} borderColor="transparent" borderBottomColor="white">

            <Flex py={3} pl={4} pr={3} alignItems="center" justifyContent="space-between">

              <GatsbyLink to="/" color="inherit">
                <Brand>CGA</Brand>
              </GatsbyLink>

              <Button aria-label="Close" onClick={onDismiss}>
                <XIcon size={20} />
              </Button>

            </Flex>

          </BorderBox>

          <Flex flexDirection="column">
            <NavDrawerItems items={nav} onDismiss={onDismiss} />
          </Flex>

        </Flex>

      </Flex>
    </Drawer>
  )
}

NavDrawer.propTypes = {
  isOpen: bool.isRequired,
  onDismiss: func.isRequired,
}

const Navigation = () => {
  const { themeBlue, breakpoints } = useContext( ThemeContext )
  const [ isNavDrawerOpen, setIsNavDrawerOpen ] = useNavDrawerState( breakpoints[ 2 ] )
  const closeDrawer = () => setIsNavDrawerOpen( false )

  return (
    <Flex
      flexDirection="column"
      height="100%"
      style={{ overflow: 'auto' }}
    >

      <Flex flexDirection="column" flex="1 0 auto" color="white" bg={themeBlue}>
        <BorderBox border={0} borderRadius={0} borderBottom={0} borderColor="transparent">

          <Flex py={2} pl={[ 4, 4, 4, 6 ]} pr={3} alignItems="center" justifyContent="space-between">

            <GatsbyLink to="/">
              <Brand>CGA</Brand>
            </GatsbyLink>

            {/* Web */}
            <Flex
              display={[ 'none', null, null, 'flex' ]}
              flexDirection="row"
              pr={[ 2, 2, 6 ]}
            >
              <NavItems items={nav} />
            </Flex>

            {/* Mobile */}
            <Flex display={[ 'flex', null, null, 'none' ]} paddingRight={[ 2, 4, 4, 4 ]}>
              <Button aria-expanded={isNavDrawerOpen} onClick={() => setIsNavDrawerOpen( true )}>
                <ThreeBarsIcon size={22} />
              </Button>
            </Flex>

          </Flex>

          <NavDrawer
            isOpen={isNavDrawerOpen}
            onDismiss={closeDrawer}
          />

        </BorderBox>
      </Flex>

    </Flex>
  )
}

export default Navigation
