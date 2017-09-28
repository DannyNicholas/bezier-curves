import { fromJS } from 'immutable'
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
    path: path
})

const GridReducer = (state = initialState, action) => {
    
    console.log(action)

    switch (action.type) {
           
        default:
            return state
    }
}

export default GridReducer