import { fromJS } from 'immutable'

const createPauseControlPoints = ( position ) => {
    return fromJS({
        position: {
            name: 'position',
            point: position
        }
    })
}

export default createPauseControlPoints