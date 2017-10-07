import GridAction from '../constants/GridAction'

const GridActionCreators = {
    moveControlPoint(pointType, controlPoint) {
        return {
            type: GridAction.MOVE_CONTROL_POINT,
            pointType,
            controlPoint
        }
    }
}

export default GridActionCreators