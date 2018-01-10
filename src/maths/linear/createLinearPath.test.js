import createLinearPath from './createLinearPath'
import createLinearControlPoints from './createLinearControlPoints'
import createPoint from '../createPoint'

describe('bezier path creation', () => {
    
    it('checks integer linear path length, start and end', () => {
        const start = createPoint( 0, 100 )
        const finish = createPoint( 200, 400 )
        const controlPoints = createLinearControlPoints(
            start,
            finish
        )

        const path = createLinearPath( controlPoints, 2000 )

        // confirm length of path
        expect(path.size).toEqual(2001)
        
        // check start and finish points of path
        expect(path.get(0)).toEqual(start)
        expect(path.get(2000)).toEqual(finish)
    })

    it('checks decimal linear path length, start and end', () => {
        const start = createPoint( 0.1, 0.2 )
        const finish = createPoint( 0.5, 0.6 )
        const controlPoints = createLinearControlPoints(
            start,
            finish
        )

        const path = createLinearPath( controlPoints, 2000 )
        
        // confirm length of path
        expect(path.size).toEqual(2001)
        
        // check start and finish points of path
        expect(path.get(0)).toEqual(start)
        expect(path.get(2000)).toEqual(finish)
    })
})