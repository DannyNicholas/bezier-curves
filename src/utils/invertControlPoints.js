import createPoint from '../maths/createPoint'

// invert all points in y-axis
export const invertControlPoints = (controlPoints, height) => {
    let invertedControlPoints = controlPoints
    controlPoints.forEach((controlPoint, key) => {
        const point = controlPoint.get('point')
        const invertedPoint = invertPoint(point, height)
        const newControlPoint = controlPoint.set('point', invertedPoint)
        
        invertedControlPoints = invertedControlPoints.set(key, newControlPoint)
    })
    return invertedControlPoints
}

// invert point in y-axis
const invertPoint = (point, height) => {
    return createPoint( point.get('x'), height - point.get('y') )
}