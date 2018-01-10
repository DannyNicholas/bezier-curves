import createPoint from './createPoint'
import pointSubtraction from './pointSubtraction'

describe('point subtraction', () => {

    it('integer point subtraction', () => {
        const point1 = createPoint( 50, 45 )
        const point2 = createPoint( 20, 10 )
        const subtractedPoint = pointSubtraction( point1, point2 )
        expect(subtractedPoint.get('x')).toEqual(30)
        expect(subtractedPoint.get('y')).toEqual(35)
    })

    it('decimal point subtraction', () => {
        const point1 = createPoint( 0.5, 0.75 )
        const point2 = createPoint( 0.1, 0.2 )
        const subtractedPoint = pointSubtraction( point1, point2 )
        expect(subtractedPoint.get('x')).toEqual(0.4)
        expect(subtractedPoint.get('y')).toEqual(0.55)
    })
})