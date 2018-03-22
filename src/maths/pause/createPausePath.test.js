import createPausePath from './createPausePath'
import createPauseControlPoints from './createPauseControlPoints'
import createPoint from '../createPoint'

describe('pause path creation', () => {
    
    it('checks integer pause path length, start and end', () => {
        const position = createPoint( 0, 100 )
        const controlPoints = createPauseControlPoints(
            position
        )
        const parameters = {pauseTime: 2}

        const path = createPausePath( controlPoints, parameters )

        // confirm length of path
        expect(path.size).toEqual(121)
        
        // check start and finish points of path
        expect(path.get(0)).toEqual(position)
        expect(path.get(120)).toEqual(position)
    })

    it('checks decimal pause path length, start and end', () => {
        const position = createPoint( 0.1, 0.2 )
        const controlPoints = createPauseControlPoints(
            position
        )
        const parameters = {pauseTime: 2}

        const path = createPausePath( controlPoints, parameters )
        
        // confirm length of path
        expect(path.size).toEqual(121)
        
        // check start and finish points of path
        expect(path.get(0)).toEqual(position)
        expect(path.get(120)).toEqual(position)
    })
})