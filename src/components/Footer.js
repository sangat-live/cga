import React, { useContext } from 'react'
import moment from 'moment'
import { Flex } from '@primer/components'
import { ThemeContext } from 'styled-components'

import { useSiteMetadata } from '../hooks'

const Footer = () => {
  const { title } = useSiteMetadata()
  const { colors: { theme: { blue } } } = useContext( ThemeContext )

  return (
    <footer style={{ color: 'white', backgroundColor: `${blue}` }}>
      <Flex>
        <Flex py={2} mx="auto">
          {`© ${moment().format( 'YYYY' )} ${title}`}
        </Flex>
      </Flex>
    </footer>
  )
}
export default Footer
