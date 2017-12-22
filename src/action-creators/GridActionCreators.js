import GridAction from '../constants/GridAction'

const GridActionCreators = {
    moveControlPoint(index, pointType, controlPoint) {
        return {
            type: GridAction.MOVE_CONTROL_POINT,
            index,
            pointType,
            controlPoint
        }
    },
    changePathPoints(index, pathPoints) {
        return {
            type: GridAction.CHANGE_PATH_POINTS,
            index,
            pathPoints
        }
    },
    insertPathDataBefore(index) {
        return {
            type: GridAction.INSERT_PATH_DATA_BEFORE,
            index
        }
    },
    insertPathDataAfter(index) {
        return {
            type: GridAction.INSERT_PATH_DATA_AFTER,
            index
        }
    },
    deletePathData(index) {
        return {
            type: GridAction.DELETE_PATH_DATA,
            index
        }
    },
    activatePath(index) {
        return {
            type: GridAction.ACTIVATE_PATH,
            index
        }
    },
    changeDimensions(width, height) {
        return {
            type: GridAction.CHANGE_DIMENSIONS,
            width,
            height
        }
    }
}

export default GridActionCreators