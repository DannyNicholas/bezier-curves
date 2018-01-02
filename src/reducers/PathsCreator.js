import { fromJS } from 'immutable'
import createPoint from '../maths/createPoint'
import createControlPoints from '../maths/createControlPoints'
import createBezierPath from '../maths/createBezierPath'

const pointOffset = 20
const defaultWidth = 540
const defaultHeight = 960
const defaultPathPoints = 100

export const createDefaultInitialState = () => {
    return createInitialState(defaultWidth, defaultHeight, defaultPathPoints)
}

export const createInitialState = (width, height, pathPoints) => {
    const start = createPoint( pointOffset, height-pointOffset )
    const startControl = createPoint( pointOffset, pointOffset )
    const finish = createPoint( width-pointOffset, height-pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const controlPoints = createControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return fromJS({
        paths: [
            createPathDataHelper(controlPoints, pathPoints, true)
        ],
        width: width,
        height: height,
        animation: {
            animating: false,
            nextIndex: 1,
            position: start
        }
    })
}

export const createDefaultPathDataWithFixedStart = (width, height, pathPoints, start) => {
    const startControl = createPoint( pointOffset, pointOffset )
    const finish = createPoint( width-pointOffset, height-pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const controlPoints = createControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return createPathDataHelper(controlPoints, pathPoints, false)
}

export const createDefaultPathDataWithFixedFinish = (width, height, pathPoints, finish) => {    
    const start = createPoint( pointOffset, height-pointOffset )
    const startControl = createPoint( pointOffset, pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const controlPoints = createControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return createPathDataHelper(controlPoints, pathPoints, false)
}

// create path data from supplied control points and path points
const createPathDataHelper = (controlPoints, pathPoints, active) => {
    const path = createBezierPath( controlPoints, pathPoints )
    return fromJS(
        {
            path: path,
            controlPoints: controlPoints,
            pathPoints: pathPoints,
            active: active
        }
    )
}