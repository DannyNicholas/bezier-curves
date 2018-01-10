import { fromJS, List } from 'immutable'
import createPoint from '../createPoint'
import createLinearControlPoints from './createLinearControlPoints'
import createLinearPath from './createLinearPath'

const pointOffset = 20

export const createInitialLinearState = (width, height, pathPoints) => {
    const start = createPoint( pointOffset, height-pointOffset )
    const finish = createPoint( width-pointOffset, height-pointOffset )
    const controlPoints = createLinearControlPoints(
        start,
        finish
    )
    return fromJS({
        paths: [
            createLinearPathDataHelper(controlPoints, pathPoints, true)
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

export const createDefaultLinearPathDataWithFixedStart = (width, height, pathPoints, start) => {
    const finish = createPoint( width-pointOffset, height-pointOffset )
    const controlPoints = createLinearControlPoints(
        start,
        finish
    )
    return createLinearPathDataHelper(controlPoints, pathPoints, false)
}

export const createDefaultLinearPathDataWithFixedFinish = (width, height, pathPoints, finish) => {    
    const start = createPoint( pointOffset, height-pointOffset )
    const controlPoints = createLinearControlPoints(
        start,
        finish
    )
    return createLinearPathDataHelper(controlPoints, pathPoints, false)
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
        paths = paths.push(createLinearPathDataHelper(controlPoints, data.pathPoints, false))
      })

      return paths
}

// create path data from supplied control points and path points
const createLinearPathDataHelper = (controlPoints, pathPoints, active) => {
    const path = createLinearPath( controlPoints, pathPoints )
    return fromJS(
        {
            path: path,
            controlPoints: controlPoints,
            pathPoints: pathPoints,
            active: active
        }
    )
}