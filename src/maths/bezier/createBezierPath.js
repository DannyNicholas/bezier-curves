import { fromJS } from 'immutable'

import calculateBezierPoint from './calculateBezierPoint'

// calulate all points on Bezier path from start to finish
const createBezierPath = ( controlPoints, parameters ) => {

    const path = []
    const numberOfPoints = parameters.pathPoints

    for (let i = 0; i <= numberOfPoints; i++)
        {
            // calculate current path parameter from 0 to 1
            const t = i / numberOfPoints
            const pathPoint = calculateBezierPoint( controlPoints, t )
            path.push(pathPoint)
        }

    return fromJS(path)
}

export default createBezierPath