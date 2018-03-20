import PathType from '../../constants/PathType'
import createBezierPath from '../bezier/createBezierPath'
import {
    getBezierStartPoint,
    getBezierFinishPoint,
    createDefaultInitialBezierState,
    createDefaultBezierPathDataWithFixedStart,
    createDefaultBezierPathDataWithFixedFinish,
    transformToBezierPathData
} from '../bezier/bezierPathsCreator'
import createLinearPath from '../linear/createLinearPath'
import {
    getLinearStartPoint,
    getLinearFinishPoint,
    createDefaultLinearPathDataWithFixedStart,
    createDefaultLinearPathDataWithFixedFinish,
    transformToLinearPathData
} from '../linear/linearPathsCreator'
import createPausePath from '../pause/createPausePath'
import {
    getPauseStartPoint,
    getPauseFinishPoint,
    createDefaultPausePathDataWithFixedStart,
    createDefaultPausePathDataWithFixedFinish,
    transformToPausePathData
} from '../pause/pausePathsCreator'

const bezier = {
    createDefaultInitialState: (width, height, pathPoints) => createDefaultInitialBezierState(width, height, pathPoints),
    createDefaultPathDataWithFixedStart: (width, height, pathPoints, start) => createDefaultBezierPathDataWithFixedStart(width, height, pathPoints, start),
    createDefaultPathDataWithFixedFinish: (width, height, pathPoints, finish) => createDefaultBezierPathDataWithFixedFinish(width, height, pathPoints, finish),
    createPath: (controlPoints, pathPoints) => createBezierPath(controlPoints, pathPoints),
    transformPathData: (width, controlPoints, pathPoints) => transformToBezierPathData(width, controlPoints, pathPoints),
    getStartPoint: (controlPoints) => getBezierStartPoint(controlPoints),
    getFinishPoint: (controlPoints) => getBezierFinishPoint(controlPoints)
}

const linear = {
    createDefaultPathDataWithFixedStart: (width, height, pathPoints, start) => createDefaultLinearPathDataWithFixedStart(width, height, pathPoints, start),
    createDefaultPathDataWithFixedFinish: (width, height, pathPoints, finish) => createDefaultLinearPathDataWithFixedFinish(width, height, pathPoints, finish),
    createPath: (controlPoints, pathPoints) => createLinearPath(controlPoints, pathPoints),
    transformPathData: (controlPoints, pathPoints) => transformToLinearPathData(controlPoints, pathPoints),
    getStartPoint: (controlPoints) => getLinearStartPoint(controlPoints),
    getFinishPoint: (controlPoints) => getLinearFinishPoint(controlPoints)
}

const pause = {
    createDefaultPathDataWithFixedStart: (width, height, pathPoints, start) => createDefaultPausePathDataWithFixedStart(pathPoints, start),
    createDefaultPathDataWithFixedFinish: (width, height, pathPoints, finish) => createDefaultPausePathDataWithFixedFinish(pathPoints, finish),
    createPath: (controlPoints, pathPoints) => createPausePath(controlPoints, pathPoints),
    transformPathData: (controlPoints, pathPoints) => transformToPausePathData(controlPoints, pathPoints),
    getStartPoint: (controlPoints) => getPauseStartPoint(controlPoints),
    getFinishPoint: (controlPoints) => getPauseFinishPoint(controlPoints)
}

// create and return the initial default path data
// this is always a bezier path
export const createDefaultInitialState = (width, height, pathPoints) =>
    bezier.createDefaultInitialState(width, height, pathPoints)

// get starting point for path data of the wanted type
export const getStartPoint = (type, controlPoints) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.getStartPoint(controlPoints)

        case PathType.LINEAR:
            return linear.getStartPoint(controlPoints)

        case PathType.PAUSE:
            return pause.getStartPoint(controlPoints)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// get finish point for path data of the wanted type
export const getFinishPoint = (type, controlPoints) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.getFinishPoint(controlPoints)

        case PathType.LINEAR:
            return linear.getFinishPoint(controlPoints)

        case PathType.PAUSE:
            return pause.getFinishPoint(controlPoints)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// create and return path data of the wanted type
export const createPath = (type, controlPoints, pathPoints) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.createPath(controlPoints, pathPoints)

        case PathType.LINEAR:
            return linear.createPath(controlPoints, pathPoints)

        case PathType.PAUSE:
            return pause.createPath(controlPoints, pathPoints)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// create and return path data with fixed start point of the wanted type
export const createDefaultPathDataWithFixedStart = (type, width, height, pathPoints, start) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.createDefaultPathDataWithFixedStart(width, height, pathPoints, start)

        case PathType.LINEAR:
            return linear.createDefaultPathDataWithFixedStart(width, height, pathPoints, start)

        case PathType.PAUSE:
            return pause.createDefaultPathDataWithFixedStart(width, height, pathPoints, start)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// create and return path data with fixed finish point of the wanted type
export const createDefaultPathDataWithFixedFinish = (type, width, height, pathPoints, finish) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.createDefaultPathDataWithFixedFinish(width, height, pathPoints, finish)

        case PathType.LINEAR:
            return linear.createDefaultPathDataWithFixedFinish(width, height, pathPoints, finish)

        case PathType.PAUSE:
            return pause.createDefaultPathDataWithFixedFinish(width, height, pathPoints, finish)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// create and return transformed path data to the wanted type
export const transformPathData = (type, width, height, controlPoints, pathPoints) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.transformPathData(width, controlPoints, pathPoints)

        case PathType.LINEAR:
            return linear.transformPathData(controlPoints, pathPoints)

        case PathType.PAUSE:
            return pause.transformPathData(controlPoints, pathPoints)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}
