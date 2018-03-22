import { fromJS, List } from 'immutable'
import PathType from '../../constants/PathType'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../../constants/DimensionDefault'
import createPoint from '../createPoint'
import createBezierControlPoints from './createBezierControlPoints'
import createBezierPath from './createBezierPath'

const pointOffset = 20
const defaultParameters = {pathPoints: 100}

export const getBezierStartPoint = (controlPoints) => {
    return controlPoints.get('start').get('point')
}

export const getBezierFinishPoint = (controlPoints) => {
    return controlPoints.get('finish').get('point')
}

export const getBezierStartKey = () => {
    return 'start'
}

export const getBezierFinishKey = () => {
    return 'finish'
}

export const createDefaultInitialBezierState = () => {
    return createInitialBezierState(DEFAULT_WIDTH, DEFAULT_HEIGHT, defaultParameters)
}

export const createInitialBezierState = (width, height, parameters) => {
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
            createBezierPathDataHelper(controlPoints, parameters, true)
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
export const transformToBezierPathData = (width, controlPoints, parameters) => {
    const startControl = createPoint( pointOffset, pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const bezierControlPoints = createBezierControlPoints(
        controlPoints.get('start').get('point'),
        startControl,
        controlPoints.get('finish').get('point'),
        finishControl
    )
    return createBezierPathDataHelper(bezierControlPoints, parameters, true)
}

export const createDefaultBezierPathDataWithFixedStart = (width, height, parameters, start) => {
    const startControl = createPoint( pointOffset, pointOffset )
    const finish = createPoint( width-pointOffset, height-pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const controlPoints = createBezierControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return createBezierPathDataHelper(controlPoints, parameters, false)
}

export const createDefaultBezierPathDataWithFixedFinish = (width, height, parameters, finish) => {    
    const start = createPoint( pointOffset, height-pointOffset )
    const startControl = createPoint( pointOffset, pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const controlPoints = createBezierControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return createBezierPathDataHelper(controlPoints, parameters, false)
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
        const parameters = {pathPoints: data.pathPoints}
        paths = paths.push(createBezierPathDataHelper(controlPoints, parameters, false))
      })

      return paths
}

// create path data from supplied control points and path points
const createBezierPathDataHelper = (controlPoints, parameters, active) => {
    const path = createBezierPath( controlPoints, parameters )
    return fromJS(
        {
            type: PathType.BEZIER,
            path: path,
            controlPoints: controlPoints,
            parameters: parameters,
            active: active
        }
    )
}