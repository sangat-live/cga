import React from 'react'
import { Box, Flex } from '@primer/components'
import { node, string, arrayOf } from 'prop-types'

import Navigation from './NavigationBar'
import SEO from './seo'
import Footer from './Footer'

const Layout = ( { title, children, keywords, ...props } ) => (
  <Flex flexDirection="column" minHeight="100vh">
    <SEO title={title} keywords={keywords} />
    <Navigation />
    <Flex flex="1 1 auto" flexDirection="row" css={{ zIndex: 0 }}>
      <Box my={[ 20, 20, null, 40 ]} mx={[ 30, null, 90, 150, 250, 300 ]} {...props}>
        {children}
      </Box>
    </Flex>
    <Footer />
  </Flex>
)

Layout.propTypes = {
  title: string,
  keywords: arrayOf( string ),
  children: node.isRequired,
}

Layout.defaultProps = {
  title: undefined,
  keywords: undefined,
}

export default Layout
