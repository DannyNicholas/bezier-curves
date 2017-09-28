import createPoint from './createPoint'

describe('point creation', () => {

    it('integer point creation', () => {
        const point = createPoint( 10, 20 )
        expect(point.get('x')).toEqual(10)
        expect(point.get('y')).toEqual(20)
    })

    it('decimal point creation', () => {
        const point = createPoint( 0.5, 0.75 )
        expect(point.get('x')).toEqual(0.5)
        expect(point.get('y')).toEqual(0.75)
    })
})