import { List } from 'immutable'
import GridAction from '../constants/GridAction'
import createBezierPath from '../maths/createBezierPath'
import createPoint from '../maths/createPoint'
import { createDefaultInitialState, createDefaultPathDataWithFixedStart, createDefaultPathDataWithFixedFinish } from './PathsCreator'

const initialState = createDefaultInitialState()

const animationOn = (state, action) => {
    let animationState = state.get('animation')
    animationState = animationState
        .set('animating', true)
    return state.set('animation', animationState)
}

const animationOff = (state, action) => {
    let animationState = state.get('animation')
    animationState = animationState
        .set('animating', false)
    return state.set('animation', animationState)
}

const animate = (state, action) => {
    // create a single list of path postions from all paths
    let combinedList = List()
    state.get('paths').forEach( (pathData) =>
        combinedList = combinedList.concat(
            pathData.get('path').map( (point) =>
                createPoint(point.get('x'), point.get('y'))
            )
        )
    )
 
    let animationState = state.get('animation')
    let animationIndex = animationState.get('nextIndex')
    if (animationIndex > (combinedList.size - 1)) {
        // reset index if combined path size has reduced beyond next index
        animationIndex = 0
    }
    animationState = animationState
        .set('position', combinedList.get(animationIndex))
        .set('nextIndex', (animationIndex + 1) % combinedList.size)
 
    return state.set('animation', animationState)
}

// change the dimensions of the grid that displays paths
const changeDimensions = (state, action) => {
    return state
        .set('width', action.width)
        .set('height', action.height)
}

// move one of the control points and recalculate path
// move any adjacent start/finish points
//
// action.index holds index of path data containing the control point
// action.pointType holds the name of control point is being updated (e.g. 'start')
// action.controlPoint holds the updated control point
const moveControlPoint = (state, action) => {

    let paths = state.get('paths')
    paths = moveControlPointHelper(paths, action.index, action.pointType, action.controlPoint)

    // move any adjacent start/end points
    switch (action.pointType) {
        case 'start':
            if (action.index > 0) {
                paths = moveControlPointHelper(paths, action.index - 1, 'finish', action.controlPoint)
            }
            break;
        case 'finish':
            if (action.index < (paths.size - 1)) {
                paths = moveControlPointHelper(paths, action.index + 1, 'start', action.controlPoint)
            }
            break;
        default:
            // action for control points
            break;
    }

    return state.set('paths', paths)
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

    let paths = state.get('paths')
    const currentPath = paths.get(action.index)

    // create new path data with finsh point equal to current path data start point
    const currentControlPointStart = currentPath.get('controlPoints').get('start').get('point')
    const pathDataToInsert = createDefaultPathDataWithFixedFinish(state.get('width'), state.get('height'), currentPath.get('pathPoints'), currentControlPointStart)

     // insert path data into list before index and return
    paths = paths.insert(action.index, pathDataToInsert)
    paths = setActivatePath(paths, action.index)
    return state.set('paths', paths)
}

// insert new path data into the list of paths after supplied index
//
// action.index holds the list insert index
const insertPathDataAfter = (state, action) => {

    let paths = state.get('paths')
    const currentPath = paths.get(action.index)

    // create new path data with start point equal to current path data finish point
    const currentControlPointFinish = currentPath.get('controlPoints').get('finish').get('point')
    const pathDataToInsert = createDefaultPathDataWithFixedStart(state.get('width'), state.get('height'), currentPath.get('pathPoints'), currentControlPointFinish)

    // insert path data into list after index and return
    paths = paths.insert(action.index + 1, pathDataToInsert)
    paths = setActivatePath(paths, action.index + 1)
    return state.set('paths', paths)
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

    let newPaths = pathsList.delete(action.index)
    
    // activate the path before the one deleted unless the first path was deleted
    const activeIndex = action.index > 0 ? (action.index - 1) : 0
    newPaths = setActivatePath(newPaths, activeIndex)
    return state.set('paths', newPaths)
}

// set active flag to true for path that matches action.index
// set all other active flags to false
const activatePath = (state, action) => {
    const paths = setActivatePath(state.get('paths'), action.index)
    return state.set('paths', paths)
}

// set active flag for path that matches index
// set all other active flags to false
const setActivatePath = (paths, activeIndex) => {
    return paths.map((path, index) => {
        if (index === activeIndex) {
            return path.set('active', true);
        }
        return path.set('active', false);
    })
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

        case GridAction.ACTIVATE_PATH:
            return activatePath(state, action)

        case GridAction.CHANGE_DIMENSIONS:
            return changeDimensions(state, action)

        case GridAction.ANIMATE:
            return animate(state, action)
        
        case GridAction.ANIMATION_ON:
            return animationOn(state, action) 
            
        case GridAction.ANIMATION_OFF:
            return animationOff(state, action) 

        default:
            return state
    }
}

export default GridReducer