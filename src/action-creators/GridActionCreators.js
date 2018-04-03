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
    changePathParameter(index, parameterKey, parameterValue) {
        return {
            type: GridAction.CHANGE_PARAMETER,
            index,
            parameterKey,
            parameterValue
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
    transformPath(index, pathType) {
        return {
            type: GridAction.TRANSFORM_PATH,
            index,
            pathType
        }
    },
    changeDimensions(width, height) {
        return {
            type: GridAction.CHANGE_DIMENSIONS,
            width,
            height
        }
    },
    animationOn() {
        return function(dispatch, getState) {
            
            // turn animation on
            dispatch({
                type: GridAction.ANIMATION_ON
            })

            // start animation
            actions.animate(dispatch, getState)
        }
    },
    animationOff() {
        return {
            type: GridAction.ANIMATION_OFF
        }
    },
    animate() {
        return {
            type: GridAction.ANIMATE
        }
    },
    importPaths(jsonData) {
        return {
            type: GridAction.IMPORT_PATHS,
            jsonData
        }
    }
}

const actions = {

    // animation loop until animation turned off
    animate(dispatch, getState) {
        if (getState().get('animation').get('animating')) {
            dispatch({
                type: GridAction.ANIMATE
            })

            setTimeout(() => {
                this.animate(dispatch, getState)
            },8)
        }
    }

}

export default GridActionCreators