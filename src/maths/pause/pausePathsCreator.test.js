import {
    createInitialPauseState,
    createDefaultPausePathDataWithFixedStart,
    createDefaultPausePathDataWithFixedFinish
} from './pausePathsCreator'
import createPoint from '../createPoint'

// tests that the default path data creator
// 1) creates the expected default data
// 2) creates the expected default data with fixed start point
// 3) creates the expected default data with fixed finish point
describe('default pause data creator', () => {

    const xMax = 1000
    const yMax = 1000
    const pauseTimeMax = 2
    const expectedOffset = 20

    it('creates expected default control points', () => {
        const defaultPath = createInitialPauseState(xMax, yMax, pauseTimeMax)

        const controlPoints = defaultPath.get('paths').get(0).get('controlPoints')
        const expectedPoint = createPoint( xMax - expectedOffset, yMax - expectedOffset )
        verifyControlPoints(controlPoints, expectedPoint)
     
        const pathTime = defaultPath.get('paths').get(0).get('pauseTime')
        verifyPausePoints(pathTime, pauseTimeMax)
    })

    it('creates expected default control points with wanted start point', () => {
        const startPoint = createPoint( 350, 250 )

        const defaultPath = createDefaultPausePathDataWithFixedStart(pauseTimeMax, startPoint)
        const controlPoints = defaultPath.get('controlPoints')

        // confirm new item's 'start' matches the expected point
        expect(controlPoints.get('position').get('point').get('x')).toEqual(startPoint.get('x'))
        expect(controlPoints.get('position').get('point').get('y')).toEqual(startPoint.get('y'))

        // verify other control points
        verifyControlPoints(controlPoints, startPoint)

        // verify pause points
        const pathTime = defaultPath.get('pauseTime')
        verifyPausePoints(pathTime, pauseTimeMax)
    })

    it('creates expected default control points with wanted finish point', () => {
        const finishPoint = createPoint( 350, 250 )

        const defaultPath = createDefaultPausePathDataWithFixedFinish(pauseTimeMax, finishPoint)
        const controlPoints = defaultPath.get('controlPoints')

        // confirm new item's 'finish' matches the expected point
        expect(controlPoints.get('position').get('point').get('x')).toEqual(finishPoint.get('x'))
        expect(controlPoints.get('position').get('point').get('y')).toEqual(finishPoint.get('y'))

        // verify other control points
        verifyControlPoints(controlPoints, finishPoint)

        // verify pause points
        const pathTime = defaultPath.get('pauseTime')
        verifyPausePoints(pathTime, pauseTimeMax)
    })

    // verify control points are expected
    const verifyControlPoints = (controlPoints, expectedPoint) => {
        expect(controlPoints.get('position').get('point').get('x')).toEqual(expectedPoint.get('x'))
        expect(controlPoints.get('position').get('point').get('y')).toEqual(expectedPoint.get('y'))
    }

    // verify number of points in path
    const verifyPausePoints = (pausePoints, expectedPausePoints) => {
        expect(pausePoints).toEqual(expectedPausePoints)
    }
})