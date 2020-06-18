import { useEffect, useState, useCallback } from 'react'
import { debounce } from 'lodash'

export { default as useSiteMetadata } from './use-site-metadata'
export { default as useSearch } from './use-search'

export const useNavDrawerState = breakpoint => {
  // Handle string values from themes with units at the end
  if ( typeof breakpoint === 'string' ) {
    // eslint-disable-next-line no-param-reassign
    breakpoint = parseInt( breakpoint, 10 )
  }
  const [ isOpen, setOpen ] = useState( false )

  const onResize = useCallback( () => {
    if ( window.innerWidth >= breakpoint ) {
      setOpen( false )
    }
  }, [ setOpen ] )

  const debouncedOnResize = useCallback(
    debounce( onResize, 250 ), [
      onResize,
    ],
  )

  // eslint-disable-next-line consistent-return
  useEffect( () => {
    if ( isOpen ) {
      window.addEventListener( 'resize', debouncedOnResize )
      return () => {
        // cancel any debounced invocation of the resize handler
        debouncedOnResize.cancel()
        window.removeEventListener( 'resize', debouncedOnResize )
      }
    }
  }, [ isOpen, debouncedOnResize ] )

  return [ isOpen, setOpen ]
}
