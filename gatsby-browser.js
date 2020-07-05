import React from 'react'
import { theme as primer, Link } from '@primer/components'
import styled, { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'

import { element } from 'prop-types'

const SectionP = styled.p`
  font-size: 1.2rem;
`
const components = {
  p: SectionP,
  a: Link,
}

const theme = {
  ...primer,
  breakpoints: [ ...primer.breakpoints, '1450px' ],
  colors: {
    ...primer.colors,
    theme: {
      orange: 'rgba( 238, 153, 41, 1 )',
      blue: 'rgba( 0, 137, 250, 1 )',
    },
  },
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
