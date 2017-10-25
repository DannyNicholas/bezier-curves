import { fromJS } from 'immutable'
import createPoint from '../maths/createPoint'
import createControlPoints from '../maths/createControlPoints'
import createBezierPath from '../maths/createBezierPath'

const pointOffset = 20

export const createDefaultPath = (maxX, maxY, pathPoints) => {
    const start = createPoint( pointOffset, maxY-pointOffset )
    const startControl = createPoint( pointOffset, pointOffset )
    const finish = createPoint( maxX-pointOffset, maxY-pointOffset )
    const finishControl = createPoint( maxX-pointOffset, pointOffset )
    const controlPoints = createControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return fromJS({
        paths: [
            createPathDataHelper(controlPoints, pathPoints)
        ]
    })
}

export const createDefaultPathDataWithFixedStart = (maxX, maxY, pathPoints, start) => {
    const startControl = createPoint( pointOffset, pointOffset )
    const finish = createPoint( maxX-pointOffset, maxY-pointOffset )
    const finishControl = createPoint( maxX-pointOffset, pointOffset )
    const controlPoints = createControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return createPathDataHelper(controlPoints, pathPoints)
}

export const createDefaultPathDataWithFixedFinish = (maxX, maxY, pathPoints, finish) => {    
    const start = createPoint( pointOffset, maxY-pointOffset )
    const startControl = createPoint( pointOffset, pointOffset )
    const finishControl = createPoint( maxX-pointOffset, pointOffset )
    const controlPoints = createControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return createPathDataHelper(controlPoints, pathPoints)
}

// create path data from supplied control points and path points
const createPathDataHelper = (controlPoints, pathPoints) => {
    const path = createBezierPath( controlPoints, pathPoints )
    return fromJS(
        {
            path: path,
            controlPoints: controlPoints,
            pathPoints: pathPoints
        }
    )
}