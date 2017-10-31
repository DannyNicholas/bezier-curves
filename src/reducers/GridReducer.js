import { fromJS } from 'immutable'
import GridAction from '../constants/GridAction'
import createBezierPath from '../maths/createBezierPath'
import createControlPoints from '../maths/createControlPoints'
import createPoint from '../maths/createPoint'
import { createDefaultPathDataWithFixedStart, createDefaultPathDataWithFixedFinish } from './createDefaultPath'

const start = createPoint( 20, 490 )
const startControl = createPoint( 20, 20 )
const finish = createPoint( 200, 480 )
const finishControl = createPoint( 200, 20 )
const controlPoints = createControlPoints(
    start,
    startControl,
    finish,
    finishControl
)

const start2 = createPoint( 200, 480 )
const startControl2 = createPoint( 240, 20 )
const finish2 = createPoint( 480, 480 )
const finishControl2 = createPoint( 480, 20 )
const controlPoints2 = createControlPoints(
    start2,
    startControl2,
    finish2,
    finishControl2
)

const path = createBezierPath( controlPoints, 100 )
const path2 = createBezierPath( controlPoints2, 100 )

const initialState = fromJS({
    paths: [
        {
            path: path,
            controlPoints: controlPoints,
            pathPoints: 100
        },
        {
            path: path2,
            controlPoints: controlPoints2,
            pathPoints: 100
        }
    ]
})

// move one of the control points and recalculate path
//
// action.index holds index of path data containing the control point
// action.pointType holds the name of control point is being updated (e.g. 'start')
// action.controlPoint holds the updated control point
const moveControlPoint = (state, action) => {
    const newPaths = moveControlPointHelper(state.get('paths'), action.index, action.pointType, action.controlPoint)
    return state.set('paths', newPaths)
}

// change number of points on the path and recalculate path
//
// action.index holds index of path data to change
// action.pathPoints holds the updated number of points in the path
const changePathPoints = (state, action) => {
    
     // get and update path data for index
     const pathData = state.get('paths').get(action.index)
     const path = createBezierPath( pathData.get('controlPoints'), action.pathPoints )
     const newPathData = pathData.set('path', path).set('pathPoints', action.pathPoints)

     // update path data in list and return
     const newPaths = state.get('paths').set(action.index, newPathData)
     return state.set('paths', newPaths)
}

// insert new path data into the list of paths before supplied index
//
// action.index holds the list insert index
const insertPathDataBefore = (state, action) => {

    // create new path data with finsh point equal to current path data start point
    const currentControlPointStart = state.get('paths').get(action.index).get('controlPoints').get('start').get('point')
    const pathDataToInsert = createDefaultPathDataWithFixedFinish(500, 500, 100, currentControlPointStart)

     // insert path data into list before index and return
    const newPaths = state.get('paths').insert(action.index, pathDataToInsert)
    return state.set('paths', newPaths)
}

// insert new path data into the list of paths after supplied index
//
// action.index holds the list insert index
const insertPathDataAfter = (state, action) => {

    // create new path data with start point equal to current path data finish point
    const currentControlPointFinish = state.get('paths').get(action.index).get('controlPoints').get('finish').get('point')
    const pathDataToInsert = createDefaultPathDataWithFixedStart(500, 500, 100, currentControlPointFinish)

    // insert path data into list after index and return
    const newPaths = state.get('paths').insert(action.index + 1, pathDataToInsert)
    return state.set('paths', newPaths)
}

// delete path item at the supplied index
// if item to be deleted is inbetween two path items then
// join their start and finish control points to make a continuous path
//
// action.index holds the list insert index
const deletePathData = (state, action) => {

    let pathsList = state.get('paths')

    // if item to be deleted is in the middle of the list
    // join the previous path's finish point to the following path's start point
    if (action.index !== 0 && action.index !== pathsList.size -  1)
    {
        const previousControlPointFinish = pathsList.get(action.index - 1).get('controlPoints').get('finish').get('point')
        pathsList = moveControlPointHelper(pathsList, action.index + 1, 'start', previousControlPointFinish)
    }

    const newPaths = pathsList.delete(action.index) 
    return state.set('paths', newPaths)
}


// move one of the control points and recalculate path
//
// type holds the name of control point is being updated (e.g. 'start')
const moveControlPointHelper = (paths, index, type, controlPoint) => {
    
    // get and update path data for index
    const pathData = paths.get(index)
    const newControlPoints = pathData.get('controlPoints').setIn([type, 'point'], controlPoint)
    const path = createBezierPath( newControlPoints, pathData.get('pathPoints') )
    const newPathData = pathData.set('path', path).set('controlPoints', newControlPoints)

    // update path data in list and return
    return paths.set(index, newPathData)
}


const GridReducer = (state = initialState, action) => {

    switch (action.type) {
        case GridAction.MOVE_CONTROL_POINT:
            return moveControlPoint(state, action)

        case GridAction.CHANGE_PATH_POINTS:
            return changePathPoints(state, action)  

        case GridAction.INSERT_PATH_DATA_BEFORE:
            return insertPathDataBefore(state, action)

        case GridAction.INSERT_PATH_DATA_AFTER:
            return insertPathDataAfter(state, action)

        case GridAction.DELETE_PATH_DATA:
            return deletePathData(state, action)

        default:
            return state
    }
}

export default GridReducer