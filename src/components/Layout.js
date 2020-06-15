/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Box, BaseStyles } from '@primer/components'

import Navigation from './NavigationBar'

const Layout = ( { ...props } ) => (
  <BaseStyles>
    <Navigation />
    <Box m={4}>
      {props.children}
    </Box>
  </BaseStyles>
)

export default Layout
