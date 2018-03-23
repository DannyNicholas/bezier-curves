import { fromJS } from 'immutable'
import pointSubtraction from '../pointSubtraction'
import pointAddition from '../pointAddition'
import pointMultiplication from '../pointMultiplication'

// calulate all points on Linear path from start to finish
const createLinearPath = ( controlPoints, parameters ) => {

    const numberOfPoints = parameters.get('pathPoints')
    const start = controlPoints.get('start').get('point')
    const finish = controlPoints.get('finish').get('point')
    const delta = pointSubtraction(finish, start)

    const path = []
    for (let i = 0; i <= numberOfPoints; i++)
        {
            // pathPoint = start + ((finish - start) * t)
            // t -> 0 to 1
            const t = i / numberOfPoints
            const pathPoint = pointAddition(start, pointMultiplication(delta, t))
            path.push(pathPoint)
        }

    return fromJS(path)
}

export default createLinearPath