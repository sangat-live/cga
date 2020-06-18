import React, { useState } from 'react'
import { BorderBox, Flex, Link, Text, Button } from '@primer/components'
import { XIcon } from '@primer/styled-octicons'

import primerNavItems from '../lib/nav.yml'

import Drawer from './Drawer'

export function useNavDrawerState() {
  const [ isOpen, setOpen ] = useState( false )

  return [ isOpen, setOpen ]
}

const NavDrawer = ( { isOpen, onDismiss } ) => (
  <Drawer isOpen={isOpen} onDismiss={onDismiss}>
    <Flex
      flexDirection="column"
      height="100%"
      bg="gray.9"
      style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch' }}
    >

      <Flex flexDirection="column" flex="1 0 auto" color="blue.2" bg="gray.9">
        <BorderBox border={0} borderRadius={0} borderBottom={1} borderColor="gray.7">

          <Flex py={3} pl={4} pr={3} alignItems="center" justifyContent="space-between">

            <Link href="/" color="inherit">CGA</Link>

            <Button aria-label="Close" onClick={onDismiss}>
              <XIcon />
            </Button>

          </Flex>

        </BorderBox>

        <Flex flexDirection="column">
          <PrimerNavItems items={primerNavItems} />
        </Flex>

      </Flex>

    </Flex>
  </Drawer>
)

function PrimerNavItems( { items } ) {
  return items.map( ( item, index ) => (
    <BorderBox
      key={item.title}
      border={0}
      borderRadius={0}
      borderTop={index !== 0 ? 1 : 0}
      borderColor="gray.7"
      p={4}
    >
      {item.children ? (
        <div key={index}>
          {( { open, toggle } ) => (
            <>
              <summary onClick={toggle} style={{ cursor: 'pointer' }}>
                <Flex alignItems="center" justifyContent="space-between">
                  <Text>{item.title}</Text>
                  {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Flex>
              </summary>
              <Flex flexDirection="column" mt={2}>
                {item.children.map( child => (
                  <Link
                    key={child.title}
                    href={child.url}
                    py={1}
                    mt={2}
                    fontSize={1}
                    color="inherit"
                  >
                    {child.title}
                  </Link>
                ) )}
              </Flex>
            </>
          )}
        </div>
      ) : (
        <Link key={index} href={item.url} color="inherit" display="block">
          {item.title}
        </Link>
      )}
    </BorderBox>
  ) )
}

export default NavDrawer
