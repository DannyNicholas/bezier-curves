import { fromJS } from 'immutable'
import GridAction from '../constants/GridAction'
import createBezierPath from '../maths/createBezierPath'
import createControlPoints from '../maths/createControlPoints'
import createPoint from '../maths/createPoint'

const start = createPoint( 0, 500 )
const startControl = createPoint( 0, 0 )
const finish = createPoint( 500, 500 )
const finishControl = createPoint( 500, 0 )
const controlPoints = createControlPoints(
    start,
    startControl,
    finish,
    finishControl
)

const path = createBezierPath( controlPoints, 100 )

const initialState = fromJS({
    path: path,
    controlPoints: controlPoints
})

const moveControlPoint = (state, action) => {
    const newControlPoints = state.get('controlPoints').set(action.pointType, action.controlPoint)
    const path = createBezierPath( newControlPoints, 100 )
    return state.set('path', path).set('controlPoints', newControlPoints)
}

const GridReducer = (state = initialState, action) => {
    
    console.log(action)

    switch (action.type) {
        case GridAction.MOVE_CONTROL_POINT:
            return moveControlPoint(state, action)

        default:
            return state
    }
}

export default GridReducer