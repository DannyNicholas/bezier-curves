import createPoint from './createPoint'

// create point by subtracting two points
const pointSubtraction = ( point1, point2 ) => {
    const subtractionX = point1.get('x') - point2.get('x')
    const subtractionY = point1.get('y') - point2.get('y')
    return createPoint( subtractionX, subtractionY )
}

export default pointSubtraction