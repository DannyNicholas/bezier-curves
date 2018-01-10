import { fromJS } from 'immutable'

const createBezierControlPoints = ( start, startControl, finish, finishControl ) => {
    return fromJS({
        start: {
            name: 'start',
            point: start
        },
        startControl: {
            name: 'startControl',
            point: startControl
        },
        finish: {
            name: 'finish',
            point: finish
        },
        finishControl: {
            name: 'finishControl',
            point: finishControl
        }
    })
}

export default createBezierControlPoints