import { fromJS } from 'immutable'
import PathType from '../../constants/PathType'
import createPoint from '../createPoint'
import createPauseControlPoints from './createPauseControlPoints'
import createPausePath from './createPausePath'
import {
    getStartPoint
} from '../facade/pathsCreator'

const pointOffset = 20
const DEFAULT_PAUSE_TIME = 2

export const getPauseStartPoint = (controlPoints) => {
    return controlPoints.get('position').get('point')
}

export const getPauseFinishPoint = (controlPoints) => {
    return controlPoints.get('position').get('point')
}

export const getPauseStartKey = () => {
    return 'position'
}

export const getPauseFinishKey = () => {
    return 'position'
}

export const createInitialPauseState = (width, height, parameters) => {
    const position = createPoint( width-pointOffset, height-pointOffset )
    const controlPoints = createPauseControlPoints(
        position
    )
    return fromJS({
        paths: [
            createPausePathDataHelper(controlPoints, parameters, true)
        ],
        width: width,
        height: height,
        animation: {
            animating: false,
            nextIndex: 1,
            position: position
        }
    })
}

// transform from another path type to pause
export const transformToPausePathData = (previousType, controlPoints, parameters) => {

    // set 'position' to 'start' of previous path
    const position = getStartPoint(previousType, controlPoints)
    const pauseTime = parameters.get('pauseTime') || DEFAULT_PAUSE_TIME
    const newParameters = parameters.set('pauseTime', pauseTime)
    const pauseControlPoints = createPauseControlPoints(position)

    return createPausePathDataHelper(pauseControlPoints, newParameters, true)
}

export const createDefaultPausePathDataWithFixedStart = (parameters, start) => {
    const controlPoints = createPauseControlPoints(
        start
    )
    return createPausePathDataHelper(controlPoints, parameters, false)
}

export const createDefaultPausePathDataWithFixedFinish = (parameters, finish) => {    
    const controlPoints = createPauseControlPoints(
        finish
    )
    return createPausePathDataHelper(controlPoints, parameters, false)
}

export const importPausePathData = (data) => {
    const position = createPoint( data.position.x, data.position.y )
    const controlPoints = createPauseControlPoints(
        position
    )
    const parameters = fromJS({pauseTime: data.pauseTime})

    return createPausePathDataHelper(controlPoints, parameters, false)
}

// create path data from supplied control points and pause time
const createPausePathDataHelper = (controlPoints, parameters, active) => {
    const path = createPausePath( controlPoints, parameters )
    return fromJS(
        {
            type: PathType.PAUSE,
            path: path,
            controlPoints: controlPoints,
            parameters: parameters,
            active: active
        }
    )
}