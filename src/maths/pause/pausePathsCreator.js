import { fromJS, List } from 'immutable'
import PathType from '../../constants/PathType'
import createPoint from '../createPoint'
import createPauseControlPoints from './createPauseControlPoints'
import createPausePath from './createPausePath'

const pointOffset = 20

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
export const transformToPausePathData = (controlPoints, parameters) => {

    // get 'position' if it exists or 'start' if not
    const position = controlPoints.get('position') || controlPoints.get('start')

    const pauseControlPoints = createPauseControlPoints(position.get('point'))
    return createPausePathDataHelper(pauseControlPoints, pauseTime, true)
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

export const importPathData = (pathData) => {

    let paths = List()
    pathData.forEach((data) => {
        const position = createPoint( data.position.x, data.position.y )
        const controlPoints = createPauseControlPoints(
            position
        )
        const parameters = {pauseTime: data.pauseTime}
        paths = paths.push(createPausePathDataHelper(controlPoints, parameters, false))
      })

      return paths
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