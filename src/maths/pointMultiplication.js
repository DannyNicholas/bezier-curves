import createPoint from './createPoint'

// create point scaled by multiplier
export const pointMultiplication = ( point, multiplier ) => {
    const scaledX = point.get('x') * multiplier
    const scaledY = point.get('y') * multiplier
    return createPoint( scaledX, scaledY )
}

export default pointMultiplication