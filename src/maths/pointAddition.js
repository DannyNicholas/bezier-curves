import createPoint from './createPoint'

// create point by adding two points
const pointAddition = ( point1, point2 ) => {
    const additionX = point1.get('x') + point2.get('x')
    const additionY = point1.get('y') + point2.get('y')
    return createPoint( additionX, additionY )
}

export default pointAddition