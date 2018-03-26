import createPauseControlPoints from './createPauseControlPoints'
import createPoint from '../createPoint'

describe('control points creation', () => {

    it('integer control points creation', () => {
        const position = createPoint( 10, 20 )
        const controlPoints = createPauseControlPoints(
            position
        )

        expect(controlPoints.get('position').get('point')).toEqual(position)
        expect(controlPoints.get('position').get('name')).toEqual('position')
    })

    it('decimal control points creation', () => {
        const position = createPoint( 0.1, 0.2 )
        const controlPoints = createPauseControlPoints(
            position
        )

        expect(controlPoints.get('position').get('point')).toEqual(position)
        expect(controlPoints.get('position').get('name')).toEqual('position')
    })
})