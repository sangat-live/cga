import React from 'react'
import { theme as primer, Link } from '@primer/components'
import { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import { element } from 'prop-types'

const components = {
  a: Link,
}

const theme = {
  ...primer,
  themeBlue: 'rgba( 0, 137, 250, 1 )',
  themeOrange: 'rgba( 238, 153, 41, 1 )',
}

export const wrapRootElement = ( { element } ) => (
  <MDXProvider components={components}>
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  </MDXProvider>
)

wrapRootElement.propTypes = {
  element,
}

wrapRootElement.defaultProps = {
  element: null,
}
