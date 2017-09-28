import calculateBezierPoint from './calculateBezierPoint'
import createControlPoints from './createControlPoints'
import createPoint from './createPoint'

describe('control points creation', () => {

    it('checks integer bezier control points', () => {
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

         // when parameter is 0, should match start point
         const bezierPointStart = calculateBezierPoint( controlPoints, 0)
         expect(bezierPointStart).toEqual(start)

        // when parameter is 1, should match finish point
        const bezierPointEnd = calculateBezierPoint( controlPoints, 1)
        expect(bezierPointEnd).toEqual(finish)
    })

    it('checks decimal bezier control points', () => {
        const start = createPoint( 0.1, 0.2 )
        const startControl = createPoint( 0.3, 0.4 )
        const finish = createPoint( 0.5, 0.6 )
        const finishControl = createPoint( 0.7, 0.8 )
        const controlPoints = createControlPoints(
            start,
            startControl,
            finish,
            finishControl
        )

         // when parameter is 0, should match start point
         const bezierPointStart = calculateBezierPoint( controlPoints, 0)
         expect(bezierPointStart).toEqual(start)

        // when parameter is 1, should match finish point
        const bezierPointEnd = calculateBezierPoint( controlPoints, 1)
        expect(bezierPointEnd).toEqual(finish)
    })

})