import { fromJS, List } from 'immutable'
import createPoint from '../createPoint'
import createBezierControlPoints from './createBezierControlPoints'
import createBezierPath from './createBezierPath'

const pointOffset = 20
const defaultWidth = 540
const defaultHeight = 960
const defaultPathPoints = 100

export const createDefaultInitialBezierState = () => {
    return createInitialBezierState(defaultWidth, defaultHeight, defaultPathPoints)
}

export const createInitialBezierState = (width, height, pathPoints) => {
    const start = createPoint( pointOffset, height-pointOffset )
    const startControl = createPoint( pointOffset, pointOffset )
    const finish = createPoint( width-pointOffset, height-pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const controlPoints = createBezierControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return fromJS({
        paths: [
            createBezierPathDataHelper(controlPoints, pathPoints, true)
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

export const createDefaultBezierPathDataWithFixedStart = (width, height, pathPoints, start) => {
    const startControl = createPoint( pointOffset, pointOffset )
    const finish = createPoint( width-pointOffset, height-pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const controlPoints = createBezierControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return createBezierPathDataHelper(controlPoints, pathPoints, false)
}

export const createDefaultBezierPathDataWithFixedFinish = (width, height, pathPoints, finish) => {    
    const start = createPoint( pointOffset, height-pointOffset )
    const startControl = createPoint( pointOffset, pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const controlPoints = createBezierControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return createBezierPathDataHelper(controlPoints, pathPoints, false)
}

export const importPathData = (pathData) => {

    let paths = List()
    pathData.forEach((data) => {
        const start = createPoint( data.start.x, data.start.y )
        const startControl = createPoint( data.startControl.x, data.startControl.y )
        const finish = createPoint( data.finish.x, data.finish.y )
        const finishControl = createPoint( data.finishControl.x, data.finishControl.y )
        const controlPoints = createBezierControlPoints(
            start,
            startControl,
            finish,
            finishControl
        )
        paths = paths.push(createBezierPathDataHelper(controlPoints, data.pathPoints, false))
      })

      return paths
}

// create path data from supplied control points and path points
const createBezierPathDataHelper = (controlPoints, pathPoints, active) => {
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