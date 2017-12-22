import { List, fromJS } from 'immutable'
import GridReducer from './GridReducer'
import GridActionCreators from '../action-creators/GridActionCreators'
import createBezierPath from '../maths/createBezierPath'
import createControlPoints from '../maths/createControlPoints'
import createPoint from '../maths/createPoint'
import { createInitialState } from './createDefaultPath'

// confirm reducer logic by creating test state,
// passing in actions to reducer
// and checking the new state afterwards
describe('reducer logic', () => {

    const xMax = 1000
    const yMax = 1000
    const pathPointsMax = 100
    const multiplier = 1111
     
    it('changes width and height dimensions', () => {
        const defaultState = createInitialState(xMax, yMax, pathPointsMax)

        // trigger action to change width and height dimensions
        const action = GridActionCreators.changeDimensions(123,987)
        const newState = GridReducer(defaultState, action)

        expect(newState.get('width')).toEqual(123)
        expect(newState.get('height')).toEqual(987)
    })

    it('moves a control point to the expected position', () => {
        const defaultState = createInitialState(xMax, yMax, pathPointsMax)

        // trigger action to move the start control point to new position
        const movedControlPoint = createPoint( 200, 300 )
        const action = GridActionCreators.moveControlPoint(0, 'start', movedControlPoint) 
        const newState = GridReducer(defaultState, action)

        const controlPoints = newState.get('paths').get(0).get('controlPoints')
        expect(controlPoints.get('start').get('point').get('x')).toEqual(200)
        expect(controlPoints.get('start').get('point').get('y')).toEqual(300)
    })

    it('moves finish point and adjacent point at start of list', () => {
        testMoveFinishPoint(0)
    })

    it('moves finish point and adjacent point at middle of list', () => {
        testMoveFinishPoint(1)
    })

    it('moves finish point and adjacent point at end of list', () => {
        testMoveFinishPoint(2)
    })

    it('moves start point and adjacent point at start of list', () => {
        testMoveStartPoint(0)
    })

    it('moves start point and adjacent point at middle of list', () => {
        testMoveStartPoint(1)
    })

    it('moves start point and adjacent point at end of list', () => {
        testMoveStartPoint(2)
    })

    it('changes to the expected number of path points', () => {
        const defaultState = createInitialState(xMax, yMax, pathPointsMax)

        // triggers action to increase the number of path points to 200
        const newPathPoints = 200
        const action = GridActionCreators.changePathPoints(0, newPathPoints)
        const newState = GridReducer(defaultState, action)

        const pathPoints = newState.get('paths').get(0).get('pathPoints')
        expect(pathPoints).toEqual(newPathPoints)
    })

    it('inserts path data before at beginning of list', () => {     
        testInsertBeforeIndex(0)
    })

    it('inserts path data before at middle of list', () => {     
        testInsertBeforeIndex(1)
    })

    it('inserts path data before at end of list', () => {     
        testInsertBeforeIndex(2)
    })

    it('inserts path data after at beginning of list', () => {     
        testInsertAfterIndex(0)
    })

    it('inserts path data after at middle of list', () => {     
        testInsertAfterIndex(1)
    })

    it('inserts path data after at end of list', () => {     
        testInsertAfterIndex(2)
    })

    it('deletes path data at beginning of list', () => {
        testDeleteAtIndex(0)
    })

    it('deletes path data in middle of list', () => {
        testDeleteAtIndex(1)
    })

    it('deletes path data at end of list', () => {
       testDeleteAtIndex(2)
    })

    it('activate the wanted path', () => {
        const initialActiveState = fromJS({
            paths: [
            {
                active: true
            },
            {
                active: false
            },
            {
                active: false
            }
            ],
        })

        const action = GridActionCreators.activatePath(1) 
        const newState = GridReducer(initialActiveState, action)
        const paths = newState.get('paths')
        expect(paths.get(0).get('active')).toEqual(false)
        expect(paths.get(1).get('active')).toEqual(true)
        expect(paths.get(2).get('active')).toEqual(false)
    })

    // test helper functions

    const testMoveFinishPoint = (index) => {
        // create initial test list
        const state = createTestPathDataList()
            
        // trigger action to move the finish control point to new position
        const movedControlPoint = createPoint( 200, 300 )
        const action = GridActionCreators.moveControlPoint(index, 'finish', movedControlPoint)
        const newState = GridReducer(state, action)

        // verify the new finish point is at expected position
        const controlPoints = newState.get('paths').get(index).get('controlPoints')
        expect(controlPoints.get('finish').get('point').get('x')).toEqual(200)
        expect(controlPoints.get('finish').get('point').get('y')).toEqual(300)

        // verify next start point has also moved
        if (index < newState.get('paths').size - 1) {
            const nextControlPoints = newState.get('paths').get(index + 1).get('controlPoints')
            expect(nextControlPoints.get('start').get('point').get('x')).toEqual(200)
            expect(nextControlPoints.get('start').get('point').get('y')).toEqual(300)
        }
    }

    const testMoveStartPoint = (index) => {
        // create initial test list
        const state = createTestPathDataList()
            
        // trigger action to move the start control point to new position
        const movedControlPoint = createPoint( 200, 300 )
        const action = GridActionCreators.moveControlPoint(index, 'start', movedControlPoint)
        const newState = GridReducer(state, action)

        // verify the new start point is at expected position
        const controlPoints = newState.get('paths').get(index).get('controlPoints')
        expect(controlPoints.get('start').get('point').get('x')).toEqual(200)
        expect(controlPoints.get('start').get('point').get('y')).toEqual(300)

        // verify previous finish point has also moved
        if (index > 0) {
            const previousControlPoints = newState.get('paths').get(index - 1).get('controlPoints')
            expect(previousControlPoints.get('finish').get('point').get('x')).toEqual(200)
            expect(previousControlPoints.get('finish').get('point').get('y')).toEqual(300)
        }
    }

    // test inserting data before supplied index
    const testInsertBeforeIndex = (index) => {
        // create initial test list
        const state = createTestPathDataList()
    
        // trigger action to insert before index position
        const action = GridActionCreators.insertPathDataBefore(index)
        const newState = GridReducer(state, action)

        // verify the new data is at expected index
        expect(newState.get('paths').size).toEqual(4)
        const expectedPathPoints = state.get('paths').get(index).get('pathPoints')
        const pathPoints = newState.get('paths').get(index).get('pathPoints')
        expect(pathPoints).toEqual(expectedPathPoints)

        // check new item is now active
        newState.get('paths').map((path, pathIndex) => {
            expect(path.get('active')).toEqual((pathIndex === index) ? true : false)
        })

        // verify that new data's finish point matches previous data's start point
        const controlPoints = newState.get('paths').get(index).get('controlPoints')
        expect(controlPoints.get('finish').get('point').get('x')).toEqual(index * multiplier)
        expect(controlPoints.get('finish').get('point').get('y')).toEqual(index * multiplier)
    }

    // test inserting data after supplied index
    const testInsertAfterIndex = (index) => {
        // create initial test list
        const state = createTestPathDataList()
        
        // trigger action to insert after index position
        const action = GridActionCreators.insertPathDataAfter(index)
        const newState = GridReducer(state, action)

        // verify the new data is at expected index
        expect(newState.get('paths').size).toEqual(4)
        const expectedPathPoints = state.get('paths').get(index).get('pathPoints')
        const pathPoints = newState.get('paths').get(index + 1).get('pathPoints')
        expect(pathPoints).toEqual(expectedPathPoints)

        // check new item is now active
        newState.get('paths').map((path, pathIndex) => {
            expect(path.get('active')).toEqual((pathIndex === (index + 1)) ? true : false)
        })

        // verify that new data's start point matches previous data's finish point
        const controlPoints = newState.get('paths').get(index).get('controlPoints')
        expect(controlPoints.get('start').get('point').get('x')).toEqual(index * multiplier)
        expect(controlPoints.get('start').get('point').get('y')).toEqual(index * multiplier)
    }

    // test deleting data at supplied index
    const testDeleteAtIndex = (index) => {
        // create initial test list
        const state = createTestPathDataList()
        
        // trigger action to insert before index position
        const action = GridActionCreators.deletePathData(index)
        const newState = GridReducer(state, action)

        // verify the new data is at expected index
        expect(newState.get('paths').size).toEqual(2)

        // check deleted item is no longer in list
        newState.get('paths').map((path) => {
            expect(path.get('pathPoints')).not.toEqual(index * multiplier)
        })

        // check item before deletion index is now active
        // item before deleted item should be active
        // if first item was deleted then new first item (pathIndex = 0) should be active
        newState.get('paths').map((path, pathIndex) => {
            expect(path.get('active')).toEqual((pathIndex === index - 1 || (index === 0 && pathIndex === 0) ) ? true : false)
        })

         // if deleted item was in the middle, check previous item's finish control
         // point is equal to next item's start point
         if(index === 1) {
            const beforeControlPoints = newState.get('paths').get(0).get('controlPoints').get('finish')
            const afterControlPoints = newState.get('paths').get(1).get('controlPoints').get('start')
            expect(beforeControlPoints.get('point').get('x')).toEqual(afterControlPoints.get('point').get('x'))
            expect(beforeControlPoints.get('point').get('y')).toEqual(afterControlPoints.get('point').get('y'))
       }
    }

    // create a list containing 3 known path data items based on index
    const createTestPathDataList = () => {
        const state = createPathsArray([ 
            createTestPathData(0 * multiplier),
            createTestPathData(1 * multiplier),
            createTestPathData(2 * multiplier)
        ])

        // confirm list created correctly before using it
        const paths = state.get('paths')
        expect(paths.size).toEqual(3)
        expect(paths.get(0).get('pathPoints')).toEqual(0 * multiplier)
        expect(paths.get(1).get('pathPoints')).toEqual(1 * multiplier)
        expect(paths.get(2).get('pathPoints')).toEqual(2 * multiplier)
    
        return state
    }

    // create a single test path item
    const createTestPathData = (testValue) => {
        
        const start = createPoint( testValue, testValue )
        const startControl = createPoint( testValue, testValue )
        const finish = createPoint( testValue, testValue )
        const finishControl = createPoint( testValue, testValue )
        const controlPoints = createControlPoints(
            start,
            startControl,
            finish,
            finishControl
        )
        const pathPoints = testValue
        
        const path = createBezierPath( controlPoints, pathPoints )
        
        return fromJS(
            {
                path: path,
                controlPoints: controlPoints,
                pathPoints: pathPoints,
                active: false
            }
        )
    }

    // create list of paths from array
    const createPathsArray = (array) => {  
        return fromJS({
            paths: array,
            width: 1000,
            height: 1000
        })
    }
})