import { fromJS } from 'immutable'

// calulate a Pause path (a pause point)
const createPausePath = ( controlPoints, parameters ) => {

    const position = controlPoints.get('position').get('point')
    const pauseTime = parameters.pauseTime
    
    // number of points to create a pause of wanted time
    // e.g. 1 second pause requires 60 points
    const numberOfPoints = 60 * pauseTime

    const path = []
    for (let i = 0; i <= numberOfPoints; i++)
        {
            path.push(position)
        }

    return fromJS(path)
}

export default createPausePath