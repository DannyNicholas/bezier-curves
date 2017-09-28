import createPoint from './createPoint'
import pointMultiplication from './pointMultiplication'

describe('point multiplication', () => {

    it('integer by integer point multiplication', () => {
        const point = createPoint( 10, 20 )
        const multiplier = 3
        const multipliedPoint = pointMultiplication( point, multiplier )
        expect(multipliedPoint.get('x')).toEqual(30)
        expect(multipliedPoint.get('y')).toEqual(60)
    })

    it('decimal by integer point multiplication', () => {
        const point = createPoint( 0.5, 1.5 )
        const multiplier = 3
        const multipliedPoint = pointMultiplication( point, multiplier )
        expect(multipliedPoint.get('x')).toEqual(1.5)
        expect(multipliedPoint.get('y')).toEqual(4.5)
    })

    it('integer by decimal point multiplication', () => {
        const point = createPoint( 10, 20 )
        const multiplier = 1.5
        const multipliedPoint = pointMultiplication( point, multiplier )
        expect(multipliedPoint.get('x')).toEqual(15)
        expect(multipliedPoint.get('y')).toEqual(30)
    })

    it('decimal by decimal point multiplication', () => {
        const point = createPoint( 0.5, 1.5 )
        const multiplier = 1.5
        const multipliedPoint = pointMultiplication( point, multiplier )
        expect(multipliedPoint.get('x')).toEqual(0.75)
        expect(multipliedPoint.get('y')).toEqual(2.25)
    })
})