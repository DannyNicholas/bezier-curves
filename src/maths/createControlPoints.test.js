import createControlPoints from './createControlPoints'
import createPoint from './createPoint'

describe('control points creation', () => {

    it('integer control points creation', () => {
        const start = createPoint( 10, 20 )
        const startControl = createPoint( 30, 40 )
        const finish = createPoint( 50, 60 )
        const finishControl = createPoint( 70, 80 )
        const controlPoints = createControlPoints(
            start,
            startControl,
            finish,
            finishControl
        )

        expect(controlPoints.get('start').get('point')).toEqual(start)
        expect(controlPoints.get('startControl').get('point')).toEqual(startControl)
        expect(controlPoints.get('finish').get('point')).toEqual(finish)
        expect(controlPoints.get('finishControl').get('point')).toEqual(finishControl)
        expect(controlPoints.get('start').get('name')).toEqual('start')
        expect(controlPoints.get('startControl').get('name')).toEqual('startControl')
        expect(controlPoints.get('finish').get('name')).toEqual('finish')
        expect(controlPoints.get('finishControl').get('name')).toEqual('finishControl')
    })

    it('decimal control points creation', () => {
        const start = createPoint( 0.1, 0.2 )
        const startControl = createPoint( 0.3, 0.5 )
        const finish = createPoint( 0.6, 0.7 )
        const finishControl = createPoint( 0.8, 0.9 )
        const controlPoints = createControlPoints(
            start,
            startControl,
            finish,
            finishControl
        )

        expect(controlPoints.get('start').get('point')).toEqual(start)
        expect(controlPoints.get('startControl').get('point')).toEqual(startControl)
        expect(controlPoints.get('finish').get('point')).toEqual(finish)
        expect(controlPoints.get('finishControl').get('point')).toEqual(finishControl)
        expect(controlPoints.get('start').get('name')).toEqual('start')
        expect(controlPoints.get('startControl').get('name')).toEqual('startControl')
        expect(controlPoints.get('finish').get('name')).toEqual('finish')
        expect(controlPoints.get('finishControl').get('name')).toEqual('finishControl')
    })
})