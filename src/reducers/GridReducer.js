import { fromJS } from 'immutable'
import GridAction from '../constants/GridAction'
import createBezierPath from '../maths/createBezierPath'
import createControlPoints from '../maths/createControlPoints'
import createPoint from '../maths/createPoint'

const start = createPoint( 20, 490 )
const startControl = createPoint( 20, 20 )
const finish = createPoint( 480, 480 )
const finishControl = createPoint( 480, 20 )
const controlPoints = createControlPoints(
    start,
    startControl,
    finish,
    finishControl
)

const path = createBezierPath( controlPoints, 100 )

const initialState = fromJS({
    path: path,
    controlPoints: controlPoints,
    pathPoints: 100
})

// move one of the control points and recalculate path
const moveControlPoint = (state, action) => {
    // update the moved control point with the new point position
    const newControlPoints = state.get('controlPoints').setIn([action.pointType, 'point'], action.controlPoint)
    
    // update path based on new control points
    const path = createBezierPath( newControlPoints, state.get('pathPoints') )

    // return new combined state
    return state.set('path', path).set('controlPoints', newControlPoints)
}

// change number of points on the calculated path
const changePathPoints = (state, action) => {
    // update path based on new control points
    const path = createBezierPath( state.get('controlPoints'), action.pathPoints )

    return state.set('path', path).set('pathPoints', action.pathPoints)
}

const GridReducer = (state = initialState, action) => {
    
    console.log(action)

    switch (action.type) {
        case GridAction.MOVE_CONTROL_POINT:
            return moveControlPoint(state, action)

        case GridAction.CHANGE_PATH_POINTS:
            return changePathPoints(state, action)  

        default:
            return state
    }
}

export default GridReducer