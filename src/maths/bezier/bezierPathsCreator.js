import { fromJS, List } from 'immutable'
import PathType from '../../constants/PathType'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../../constants/DimensionDefault'
import createPoint from '../createPoint'
import createBezierControlPoints from './createBezierControlPoints'
import createBezierPath from './createBezierPath'

const pointOffset = 20
const defaultPathPoints = 100

export const getBezierStartPoint = (controlPoints) => {
    return controlPoints.get('start').get('point')
}

export const getBezierFinishPoint = (controlPoints) => {
    return controlPoints.get('finish').get('point')
}

export const createDefaultInitialBezierState = () => {
    return createInitialBezierState(DEFAULT_WIDTH, DEFAULT_HEIGHT, defaultPathPoints)
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

// transform from another path type to bezier
export const transformToBezierPathData = (width, controlPoints, pathPoints) => {
    const startControl = createPoint( pointOffset, pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const bezierControlPoints = createBezierControlPoints(
        controlPoints.get('start').get('point'),
        startControl,
        controlPoints.get('finish').get('point'),
        finishControl
    )
    return createBezierPathDataHelper(bezierControlPoints, pathPoints, true)
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
            type: PathType.BEZIER,
            path: path,
            controlPoints: controlPoints,
            pathPoints: pathPoints,
            active: active
        }
    )
}