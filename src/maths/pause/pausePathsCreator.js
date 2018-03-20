import { fromJS, List } from 'immutable'
import PathType from '../../constants/PathType'
import createPoint from '../createPoint'
import createPauseControlPoints from './createPauseControlPoints'
import createPausePath from './createPausePath'

const pointOffset = 20

export const createInitialPauseState = (width, height, pauseTime) => {
    const position = createPoint( width-pointOffset, height-pointOffset )
    const controlPoints = createPauseControlPoints(
        position
    )
    return fromJS({
        paths: [
            createPausePathDataHelper(controlPoints, pauseTime, true)
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
export const transformToPausePathData = (controlPoints, pauseTime) => {

    // get 'position' if it exists or 'start' if not
    const position = controlPoints.get('position') || controlPoints.get('start')

    const pauseControlPoints = createPauseControlPoints(position.get('point'))
    return createPausePathDataHelper(pauseControlPoints, pauseTime, true)
}

export const createDefaultPausePathDataWithFixedStart = (pauseTime, start) => {
    const controlPoints = createPauseControlPoints(
        start
    )
    return createPausePathDataHelper(controlPoints, pauseTime, false)
}

export const createDefaultPausePathDataWithFixedFinish = (pauseTime, finish) => {    
    const controlPoints = createPauseControlPoints(
        finish
    )
    return createPausePathDataHelper(controlPoints, pauseTime, false)
}

export const importPathData = (pathData) => {

    let paths = List()
    pathData.forEach((data) => {
        const position = createPoint( data.position.x, data.position.y )
        const controlPoints = createPauseControlPoints(
            position
        )
        paths = paths.push(createPausePathDataHelper(controlPoints, data.pauseTime, false))
      })

      return paths
}

// create path data from supplied control points and pause time
const createPausePathDataHelper = (controlPoints, pauseTime, active) => {
    const path = createPausePath( controlPoints, pauseTime )
    return fromJS(
        {
            type: PathType.PAUSE,
            path: path,
            controlPoints: controlPoints,
            pauseTime: pauseTime,
            active: active
        }
    )
}