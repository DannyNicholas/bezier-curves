import { fromJS } from 'immutable'

const createPoint = ( x, y ) => {
    return fromJS({
        x: x,
        y: y
    })
}

export default createPoint