import { fromJS } from 'immutable'

const createControlPoints = ( start, startControl, finish, finishControl ) => {
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

export default createControlPoints