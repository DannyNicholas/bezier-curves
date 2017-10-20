import GridAction from '../constants/GridAction'

const GridActionCreators = {
    moveControlPoint(pointType, controlPoint) {
        return {
            type: GridAction.MOVE_CONTROL_POINT,
            pointType,
            controlPoint
        }
    },
    changePathPoints(pathPoints) {
        return {
            type: GridAction.CHANGE_PATH_POINTS,
            pathPoints
        }
    }
}

export default GridActionCreators