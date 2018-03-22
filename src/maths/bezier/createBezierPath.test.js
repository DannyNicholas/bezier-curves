import createBezierPath from './createBezierPath'
import createBezierControlPoints from './createBezierControlPoints'
import createPoint from '../createPoint'

describe('bezier path creation', () => {
    
        it('checks integer bezier path length, start and end', () => {
            const start = createPoint( 10, 20 )
            const startControl = createPoint( 30, 40 )
            const finish = createPoint( 50, 60 )
            const finishControl = createPoint( 70, 80 )
            const controlPoints = createBezierControlPoints(
                start,
                startControl,
                finish,
                finishControl
            )
            const parameters = {pathPoints: 100}

            const path = createBezierPath( controlPoints, parameters )

            // confirm length of path
            expect(path.size).toEqual(101)
            
            // check start and finish points of path
            expect(path.get(0)).toEqual(start)
            expect(path.get(100)).toEqual(finish)
        })
    
        it('checks decimal bezier path length, start and end', () => {
            const start = createPoint( 0.1, 0.2 )
            const startControl = createPoint( 0.3, 0.4 )
            const finish = createPoint( 0.5, 0.6 )
            const finishControl = createPoint( 0.7, 0.8 )
            const controlPoints = createBezierControlPoints(
                start,
                startControl,
                finish,
                finishControl
            )
            const parameters = {pathPoints: 100}
    
            const path = createBezierPath( controlPoints, parameters )
            
            // confirm length of path
            expect(path.size).toEqual(101)
            
            // check start and finish points of path
            expect(path.get(0)).toEqual(start)
            expect(path.get(100)).toEqual(finish)
        })
    
    })