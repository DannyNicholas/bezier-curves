import { fromJS } from 'immutable'

const createLinearControlPoints = ( start, finish ) => {
    return fromJS({
        start: {
            name: 'start',
            point: start
        },
        finish: {
            name: 'finish',
            point: finish
        }
    })
}

export default createLinearControlPoints