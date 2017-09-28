import createPoint from './createPoint'
import pointAddition from './pointAddition'

describe('point addition', () => {

    it('integer point addition', () => {
        const point1 = createPoint( 10, 20 )
        const point2 = createPoint( 30, 40 )
        const addedPoint = pointAddition( point1, point2 )
        expect(addedPoint.get('x')).toEqual(40)
        expect(addedPoint.get('y')).toEqual(60)
    })

    it('decimal point addition', () => {
        const point1 = createPoint( 0.5, 0.75 )
        const point2 = createPoint( 0.1, 0.2 )
        const addedPoint = pointAddition( point1, point2 )
        expect(addedPoint.get('x')).toEqual(0.6)
        expect(addedPoint.get('y')).toEqual(0.95)
    })
})