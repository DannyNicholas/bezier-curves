import PathType from '../../constants/PathType'
import createBezierPath from '../bezier/createBezierPath'
import {
    createDefaultInitialBezierState,
    createDefaultBezierPathDataWithFixedStart,
    createDefaultBezierPathDataWithFixedFinish,
    transformToBezierPathData
} from '../bezier/bezierPathsCreator'
import createLinearPath from '../linear/createLinearPath'
import {
    createDefaultLinearPathDataWithFixedStart,
    createDefaultLinearPathDataWithFixedFinish,
    transformToLinearPathData
} from '../linear/linearPathsCreator'

const bezier = {
    createDefaultInitialState: (width, height, pathPoints) => createDefaultInitialBezierState(width, height, pathPoints),
    createDefaultPathDataWithFixedStart: (width, height, pathPoints, start) => createDefaultBezierPathDataWithFixedStart(width, height, pathPoints, start),
    createDefaultPathDataWithFixedFinish: (width, height, pathPoints, finish) => createDefaultBezierPathDataWithFixedFinish(width, height, pathPoints, finish),
    createPath: (controlPoints, pathPoints) => createBezierPath(controlPoints, pathPoints),
    transformPathData: (width, controlPoints, pathPoints) => transformToBezierPathData(width, controlPoints, pathPoints)
}

const linear = {
    createDefaultPathDataWithFixedStart: (width, height, pathPoints, start) => createDefaultLinearPathDataWithFixedStart(width, height, pathPoints, start),
    createDefaultPathDataWithFixedFinish: (width, height, pathPoints, finish) => createDefaultLinearPathDataWithFixedFinish(width, height, pathPoints, finish),
    createPath: (controlPoints, pathPoints) => createLinearPath(controlPoints, pathPoints),
    transformPathData: (controlPoints, pathPoints) => transformToLinearPathData(controlPoints, pathPoints)
}

// create and return the initial default path data
// this is always a bezier path
export const createDefaultInitialState = (width, height, pathPoints) =>
    bezier.createDefaultInitialState(width, height, pathPoints)

// create and return path data of the wanted type
export const createPath = (type, controlPoints, pathPoints) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.createPath(controlPoints, pathPoints)

        case PathType.LINEAR:
            return linear.createPath(controlPoints, pathPoints)

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

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}
