import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'
import { node, shape } from 'prop-types'

const CustomCursor = styled.div`
 &:hover {
  cursor: grab;
 }
`

const AnimatedSlider = ( { children, constraint } ) => (
  <CustomCursor>
    <ScrollContainer hideScrollbars nativeMobileScroll>
      <motion.div ref={constraint}>

        <motion.div
          style={{ display: 'flex' }}
          drag
          dragConstraints={constraint}
          dragElastic={0.1}
          dragMomentum={false}
        >
          {children}
        </motion.div>

      </motion.div>
    </ScrollContainer>
  </CustomCursor>
)

AnimatedSlider.propTypes = {
  children: node.isRequired,
  constraint: shape( {} ).isRequired,
}

export default AnimatedSlider
