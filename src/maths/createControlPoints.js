import { fromJS } from 'immutable'

const createControlPoints = ( start, startControl, finish, finishControl ) => {
    return fromJS({
        start: start,
        startControl: startControl,
        finish: finish,
        finishControl: finishControl
    })
}

export default createControlPoints