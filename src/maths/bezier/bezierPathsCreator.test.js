import { createInitialBezierState, createDefaultBezierPathDataWithFixedStart, createDefaultBezierPathDataWithFixedFinish } from './bezierPathsCreator'
import createPoint from '../createPoint'

// tests that the default path data creator
// 1) creates the expected default data
// 2) creates the expected default data with fixed start point
// 3) creates the expected default data with fixed finish point
describe('default bezier data creator', () => {

    const xMax = 1000
    const yMax = 1000
    const pathPointsMax = 100
    const expectedOffset = 20
    
    it('creates expected default control points', () => {
        const defaultPath = createInitialBezierState(xMax, yMax, pathPointsMax)

        const controlPoints = defaultPath.get('paths').get(0).get('controlPoints')
        verifyControlPoints(controlPoints, xMax, yMax)
            
        const pathPoints = defaultPath.get('paths').get(0).get('pathPoints')
        verifyPathPoints(pathPoints, pathPointsMax)
    })

    it('creates expected default control points with wanted start point', () => {
        const initialPath = createInitialBezierState(xMax, yMax, pathPointsMax)
        const startPoint = createPoint( 350, 250 )

        const defaultPath = createDefaultBezierPathDataWithFixedStart(xMax, yMax, pathPointsMax, startPoint)
        const controlPoints = defaultPath.get('controlPoints')

        // confirm new item's 'start' matches the expected point
        expect(controlPoints.get('start').get('point').get('x')).toEqual(startPoint.get('x'))
        expect(controlPoints.get('start').get('point').get('y')).toEqual(startPoint.get('y'))

        // verify other control points
        verifyControlPointsStartControl(controlPoints, xMax, yMax)
        verifyControlPointsFinish(controlPoints, xMax, yMax)
        verifyControlPointsFinishControl(controlPoints, xMax, yMax)

        // verify path points
        const pathPoints = defaultPath.get('pathPoints')
        verifyPathPoints(pathPoints, pathPointsMax)
    })

    it('creates expected default control points with wanted finish point', () => {
        const initialPath = createInitialBezierState(xMax, yMax, pathPointsMax)
        const finishPoint = createPoint( 350, 250 )

        const defaultPath = createDefaultBezierPathDataWithFixedFinish(xMax, yMax, pathPointsMax, finishPoint)
        const controlPoints = defaultPath.get('controlPoints')

        // confirm new item's 'finish' matches the expected point
        expect(controlPoints.get('finish').get('point').get('x')).toEqual(finishPoint.get('x'))
        expect(controlPoints.get('finish').get('point').get('y')).toEqual(finishPoint.get('y'))

        // verify other control points
        verifyControlPointsStart(controlPoints, xMax, yMax)
        verifyControlPointsStartControl(controlPoints, xMax, yMax)
        verifyControlPointsFinishControl(controlPoints, xMax, yMax)

        // verify path points
        const pathPoints = defaultPath.get('pathPoints')
        verifyPathPoints(pathPoints, pathPointsMax)
    })

    // verify control points are expected offset from minimum and maximum values
    const verifyControlPoints = (controlPoints, xMax, yMax) => {
        verifyControlPointsStart(controlPoints, xMax, yMax)
        verifyControlPointsFinish(controlPoints, xMax, yMax)
        verifyControlPointsStartControl(controlPoints, xMax, yMax)
        verifyControlPointsFinishControl(controlPoints, xMax, yMax)
    }

    const verifyControlPointsStart = (controlPoints, xMax, yMax) => {
        expect(controlPoints.get('start').get('point').get('x')).toEqual(expectedOffset)
        expect(controlPoints.get('start').get('point').get('y')).toEqual(yMax - expectedOffset)
    }

    const verifyControlPointsFinish = (controlPoints, xMax, yMax) => {
        expect(controlPoints.get('finish').get('point').get('x')).toEqual(xMax - expectedOffset)
        expect(controlPoints.get('finish').get('point').get('y')).toEqual(yMax - expectedOffset)
    }

    const verifyControlPointsStartControl = (controlPoints, xMax, yMax) => {
        expect(controlPoints.get('startControl').get('point').get('x')).toEqual(expectedOffset)
        expect(controlPoints.get('startControl').get('point').get('y')).toEqual(expectedOffset)
    }

    const verifyControlPointsFinishControl = (controlPoints, xMax, yMax) => {
        expect(controlPoints.get('finishControl').get('point').get('x')).toEqual(xMax - expectedOffset)
        expect(controlPoints.get('finishControl').get('point').get('y')).toEqual(expectedOffset)
    }

    // verify number of points in path
    const verifyPathPoints = (pathPoints, expectedPathPoints) => {
        expect(pathPoints).toEqual(expectedPathPoints)
    }
})