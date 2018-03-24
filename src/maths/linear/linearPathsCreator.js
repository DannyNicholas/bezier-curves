import { fromJS, List } from 'immutable'
import PathType from '../../constants/PathType'
import createPoint from '../createPoint'
import createLinearControlPoints from './createLinearControlPoints'
import createLinearPath from './createLinearPath'
import {
    getStartPoint,
    getFinishPoint
} from '../facade/pathsCreator'

const pointOffset = 20
const DEFAULT_PATH_POINTS = 100

export const getLinearStartPoint = (controlPoints) => {
    return controlPoints.get('start').get('point')
}

export const getLinearFinishPoint = (controlPoints) => {
    return controlPoints.get('finish').get('point')
}

export const getLinearStartKey = () => {
    return 'start'
}

export const getLinearFinishKey = () => {
    return 'finish'
}

export const createInitialLinearState = (width, height, parameters) => {
    const start = createPoint( pointOffset, height-pointOffset )
    const finish = createPoint( width-pointOffset, height-pointOffset )
    const controlPoints = createLinearControlPoints(
        start,
        finish
    )
    
    return fromJS({
        paths: [
            createLinearPathDataHelper(controlPoints, parameters, true)
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

// transform from another path type to linear
export const transformToLinearPathData = (previousType, controlPoints, parameters) => {

    const start = getStartPoint(previousType, controlPoints)
    const finish = getFinishPoint(previousType, controlPoints)
    const pathPoints = parameters.get('pathPoints') || DEFAULT_PATH_POINTS
    const newParameters = parameters.set('pathPoints', pathPoints)

    const linearControlPoints = createLinearControlPoints(
        start,
        finish
    )
    return createLinearPathDataHelper(linearControlPoints, newParameters, true)
}

export const createDefaultLinearPathDataWithFixedStart = (width, height, parameters, start) => {
    const finish = createPoint( width-pointOffset, height-pointOffset )
    const controlPoints = createLinearControlPoints(
        start,
        finish
    )
    return createLinearPathDataHelper(controlPoints, parameters, false)
}

export const createDefaultLinearPathDataWithFixedFinish = (width, height, parameters, finish) => {    
    const start = createPoint( pointOffset, height-pointOffset )
    const controlPoints = createLinearControlPoints(
        start,
        finish
    )
    return createLinearPathDataHelper(controlPoints, parameters, false)
}

export const importPathData = (pathData) => {

    let paths = List()
    pathData.forEach((data) => {
        const start = createPoint( data.start.x, data.start.y )
        const finish = createPoint( data.finish.x, data.finish.y )
        const controlPoints = createLinearControlPoints(
            start,
            finish
        )
        const parameters = fromJS({pathPoints: data.pathPoints})
        paths = paths.push(createLinearPathDataHelper(controlPoints, parameters, false))
      })

      return paths
}

// create path data from supplied control points and path points
const createLinearPathDataHelper = (controlPoints, parameters, active) => {
    const path = createLinearPath( controlPoints, parameters )
    return fromJS(
        {
            type: PathType.LINEAR,
            path: path,
            controlPoints: controlPoints,
            parameters: parameters,
            active: active
        }
    )
}