/**
 * Returns a object with RGBA.
 * @param {string} value RGBA
 * https://stackoverflow.com/a/11003212/11321732
 */
export const getColorObject = value => {
  if ( [ 'none', 'undefined', null ].includes( value ) ) return null
  const [ r, g, b, a ] = value.match( /\d+/g )
  return { r, g, b, a }
}

/**
 * Returns a string with new Alpha
 * @param {String} color RGBA
 * @returns color RGBA with updated alpha value
 */
export const changeColorAlpha = ( color, alpha ) => {
  const { r, g, b } = getColorObject( color )
  return `rgba(${r},${g},${b},${alpha})`
}
