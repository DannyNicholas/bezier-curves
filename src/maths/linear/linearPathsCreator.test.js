import { fromJS } from 'immutable'
import {
    getLinearStartPoint,
    getLinearFinishPoint,
    getLinearStartKey,
    getLinearFinishKey,
    createInitialLinearState,
    createDefaultLinearPathDataWithFixedStart,
    createDefaultLinearPathDataWithFixedFinish
} from './linearPathsCreator'
import createPoint from '../createPoint'
import createLinearControlPoints from './createLinearControlPoints'


// tests that the default path data creator
// 1) creates the expected default data
// 2) creates the expected default data with fixed start point
// 3) creates the expected default data with fixed finish point
describe('default linear data creator', () => {

    const xMax = 1000
    const yMax = 1000
    const pathPointsMax = 100
    const defaultParameters = fromJS({pathPoints: pathPointsMax})
    const expectedOffset = 20

    it('get expected start point', () => {
        const controlPoints = createTestControlPoints()
        const startPoint = getLinearStartPoint(controlPoints)

        expect(startPoint.get('x')).toEqual(0)
        expect(startPoint.get('y')).toEqual(10)

        expect(getLinearStartKey()).toEqual('start')
    })

    it('get expected finish point', () => {
        const controlPoints = createTestControlPoints()
        const finishPoint = getLinearFinishPoint(controlPoints)

        expect(finishPoint.get('x')).toEqual(40)
        expect(finishPoint.get('y')).toEqual(50)

        expect(getLinearFinishKey()).toEqual('finish')
    })

    it('creates expected default control points', () => {
        const defaultPath = createInitialLinearState(xMax, yMax, defaultParameters)

        const controlPoints = defaultPath.get('paths').get(0).get('controlPoints')
        verifyControlPoints(controlPoints, xMax, yMax)
            
        const pathPoints = defaultPath.get('paths').get(0).get('parameters').get('pathPoints')
        verifyPathPoints(pathPoints, pathPointsMax)
    })

    it('creates expected default control points with wanted start point', () => {
        const initialPath = createInitialLinearState(xMax, yMax, defaultParameters)
        const startPoint = createPoint( 350, 250 )

        const defaultPath = createDefaultLinearPathDataWithFixedStart(xMax, yMax, defaultParameters, startPoint)
        const controlPoints = defaultPath.get('controlPoints')

        // confirm new item's 'start' matches the expected point
        expect(controlPoints.get('start').get('point').get('x')).toEqual(startPoint.get('x'))
        expect(controlPoints.get('start').get('point').get('y')).toEqual(startPoint.get('y'))

        // verify other control points
        verifyControlPointsFinish(controlPoints, xMax, yMax)

        // verify path points
        const pathPoints = defaultPath.get('parameters').get('pathPoints')
        verifyPathPoints(pathPoints, pathPointsMax)
    })

    it('creates expected default control points with wanted finish point', () => {
        const initialPath = createInitialLinearState(xMax, yMax, defaultParameters)
        const finishPoint = createPoint( 350, 250 )

        const defaultPath = createDefaultLinearPathDataWithFixedFinish(xMax, yMax, defaultParameters, finishPoint)
        const controlPoints = defaultPath.get('controlPoints')

        // confirm new item's 'finish' matches the expected point
        expect(controlPoints.get('finish').get('point').get('x')).toEqual(finishPoint.get('x'))
        expect(controlPoints.get('finish').get('point').get('y')).toEqual(finishPoint.get('y'))

        // verify other control points
        verifyControlPointsStart(controlPoints, xMax, yMax)

        // verify path points
        const pathPoints = defaultPath.get('parameters').get('pathPoints')
        verifyPathPoints(pathPoints, pathPointsMax)
    })

    // verify control points are expected offset from minimum and maximum values
    const verifyControlPoints = (controlPoints, xMax, yMax) => {
        verifyControlPointsStart(controlPoints, xMax, yMax)
        verifyControlPointsFinish(controlPoints, xMax, yMax)
    }

    const verifyControlPointsStart = (controlPoints, xMax, yMax) => {
        expect(controlPoints.get('start').get('point').get('x')).toEqual(expectedOffset)
        expect(controlPoints.get('start').get('point').get('y')).toEqual(yMax - expectedOffset)
    }

    const verifyControlPointsFinish = (controlPoints, xMax, yMax) => {
        expect(controlPoints.get('finish').get('point').get('x')).toEqual(xMax - expectedOffset)
        expect(controlPoints.get('finish').get('point').get('y')).toEqual(yMax - expectedOffset)
    }

    // verify number of points in path
    const verifyPathPoints = (pathPoints, expectedPathPoints) => {
        expect(pathPoints).toEqual(expectedPathPoints)
    }

    const createTestControlPoints = () => {
        const start = createPoint( 0, 10 )
        const finish = createPoint( 40, 50 )
        const controlPoints = createLinearControlPoints(
            start,
            finish
        )

        return controlPoints
    }
})