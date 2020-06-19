import React from 'react'
import { Box, BaseStyles } from '@primer/components'
import { node, string } from 'prop-types'

import Navigation from './NavigationBar'
import SEO from './seo'

const Layout = ( { title, children, ...props } ) => (
  <BaseStyles>
    <SEO title={title} />
    <Navigation />
    <Box m={4} {...props}>
      {children}
    </Box>
  </BaseStyles>
)

Layout.propTypes = {
  title: string,
  children: node.isRequired,
}

Layout.defaultProps = {
  title: null,
}

export default Layout
