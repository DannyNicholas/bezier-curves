import createLinearControlPoints from './createLinearControlPoints'
import createPoint from '../createPoint'

describe('control points creation', () => {

    it('integer control points creation', () => {
        const start = createPoint( 10, 20 )
        const finish = createPoint( 50, 60 )
        const controlPoints = createLinearControlPoints(
            start,
            finish
        )

        expect(controlPoints.get('start').get('point')).toEqual(start)
        expect(controlPoints.get('finish').get('point')).toEqual(finish)
        expect(controlPoints.get('start').get('name')).toEqual('start')
        expect(controlPoints.get('finish').get('name')).toEqual('finish')
    })

    it('decimal control points creation', () => {
        const start = createPoint( 0.1, 0.2 )
        const finish = createPoint( 0.6, 0.7 )
        const controlPoints = createLinearControlPoints(
            start,
            finish
        )

        expect(controlPoints.get('start').get('point')).toEqual(start)
        expect(controlPoints.get('finish').get('point')).toEqual(finish)
        expect(controlPoints.get('start').get('name')).toEqual('start')
        expect(controlPoints.get('finish').get('name')).toEqual('finish')
    })
})