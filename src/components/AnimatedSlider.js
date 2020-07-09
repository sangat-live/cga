import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'
import { node, number } from 'prop-types'

const CustomCursor = styled.div`
 &:hover {
  cursor: grab;
 }
`

const AnimatedSlider = ( { children, widthConstraint, ...props } ) => (
  <CustomCursor>
    <ScrollContainer hideScrollbars nativeMobileScroll>

      <motion.div
        style={{ display: 'flex' }}
        drag
        dragDirectionLock
        dragConstraints={{
          top: 0,
          bottom: 0,
          left: widthConstraint,
          right: 0,
        }}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 50 }}
        dragElastic={0.2}
        {...props}
      >
        {children}
      </motion.div>

    </ScrollContainer>
  </CustomCursor>
)

AnimatedSlider.propTypes = {
  children: node.isRequired,
  widthConstraint: number.isRequired,
}

export default AnimatedSlider
