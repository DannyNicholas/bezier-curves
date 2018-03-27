import { List } from 'immutable'
import GridAction from '../constants/GridAction'
import createPoint from '../maths/createPoint'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../constants/DimensionDefault'
import {
    createDefaultInitialState,
    createDefaultPathDataWithFixedStart,
    createDefaultPathDataWithFixedFinish,
    createPath,
    transformPathData,
    getStartKey,
    getFinishKey,
    getStartPoint,
    getFinishPoint,
    importPathData
} from '../maths/facade/pathsCreator'

const initialState = createDefaultInitialState()

// replace current state with imported data
const importPaths = (state, action) => {
    const jsonData = action.jsonData
    let pathData = importPathData(jsonData.pathData)
    let animation = state.get('animation')
        .set('animating', false)
        
    if ( pathData.size >= 1 ) {
        pathData = setActivatePath(pathData, 0)
        animation = animation
            .set('nextIndex', 1)
            .set('position', pathData.get(0).get('controlPoints').get('start').get('point'))
    }

    return state
        .set('paths', pathData)
        .set('animation', animation)
        .set('width', jsonData.width || DEFAULT_WIDTH)
        .set('height', jsonData.height || DEFAULT_HEIGHT)
}

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
            paths = movePreviousFinishPoint(paths, action.index, action.controlPoint)
            break;
        case 'finish':
            paths = moveNextStartPoint(paths, action.index, action.controlPoint)
            break;
        case 'position':
            paths = moveNextStartPoint(paths, action.index, action.controlPoint)
            paths = movePreviousFinishPoint(paths, action.index, action.controlPoint)
            break;
        default:
            // action for control points
            break;
    }

    return state.set('paths', paths)
}

// move previous path to finish from provided point
const movePreviousFinishPoint = (paths, index, controlPoint) => {
    if (index > 0) {
        const finishKey = getFinishKey(paths.get(index - 1).get('type'))
        paths = moveControlPointHelper(paths, index - 1, finishKey, controlPoint)
    }
    return paths
}

// move next path to start from provided point
const moveNextStartPoint = (paths, index, controlPoint) => {
    if (index < (paths.size - 1)) {
        const startKey = getStartKey(paths.get(index + 1).get('type'))
        paths = moveControlPointHelper(paths, index + 1, startKey, controlPoint)
    }
    return paths
}

// move one of the control points and recalculate path
//
// type holds the name of control point is being updated (e.g. 'start')
const moveControlPointHelper = (paths, index, type, controlPoint) => {

    // get and update path data for index
    const pathData = paths.get(index)
    const newControlPoints = pathData.get('controlPoints').setIn([type, 'point'], controlPoint)
    const path = createPath(pathData.get('type'), newControlPoints, pathData.get('parameters'))
    const newPathData = pathData.set('path', path).set('controlPoints', newControlPoints)

    // update path data in list and return
    return paths.set(index, newPathData)
}

// change a path's parameters and recalculate path
//
// action.index - holds index of path data to change
// action.parameterKey - holds the parameter key
// action.parameterValue - holds the updated value for the parameter key
const changeParameters = (state, action) => {

    // get and update path parameters for index
    const pathData = state.get('paths').get(action.index)
    const newParameters = pathData.get('parameters').set(action.parameterKey, action.parameterValue)
    const newPath = createPath(pathData.get('type'), pathData.get('controlPoints'), newParameters)
    const newPathData = pathData.set('path', newPath).set('parameters', newParameters)

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
    const currentControlPointStart = getStartPoint(currentPath.get('type'), currentPath.get('controlPoints'))
    const pathDataToInsert = createDefaultPathDataWithFixedFinish(
        currentPath.get('type'),
        state.get('width'),
        state.get('height'),
        currentPath.get('parameters'),
        currentControlPointStart)

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
    const currentControlPointFinish = getFinishPoint(currentPath.get('type'), currentPath.get('controlPoints'))
    const pathDataToInsert = createDefaultPathDataWithFixedStart(
        currentPath.get('type'),
        state.get('width'),
        state.get('height'),
        currentPath.get('parameters'),
        currentControlPointFinish
    )

    // insert path data into list after index and return
    paths = paths.insert(action.index + 1, pathDataToInsert)
    paths = setActivatePath(paths, action.index + 1)
    return state.set('paths', paths)
}

// transform path data to another type (e.g. transform linear to bezier)
//
// action.pathType = new path type to transform to
const transformPath = (state, action) => {

    let paths = state.get('paths')
    const currentPath = paths.get(action.index)
    const transformedPathData = transformPathData(
        action.pathType,
        state.get('width'),
        state.get('height'),
        currentPath.get('type'),
        currentPath.get('controlPoints'),
        currentPath.get('parameters')
    )

    paths = paths.set(action.index, transformedPathData)
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
        const previousPath = pathsList.get(action.index - 1)
        const previousControlPointFinish = getFinishPoint(previousPath.get('type'), previousPath.get('controlPoints'))
        const startKey = getStartKey(pathsList.get(action.index + 1).get('type'))
        pathsList = moveControlPointHelper(pathsList, action.index + 1, startKey, previousControlPointFinish)
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

const GridReducer = (state = initialState, action) => {

    switch (action.type) {

        case GridAction.MOVE_CONTROL_POINT:
            return moveControlPoint(state, action)

        case GridAction.CHANGE_PARAMETER:
            return changeParameters(state, action)  

        case GridAction.INSERT_PATH_DATA_BEFORE:
            return insertPathDataBefore(state, action)

        case GridAction.INSERT_PATH_DATA_AFTER:
            return insertPathDataAfter(state, action)

        case GridAction.DELETE_PATH_DATA:
            return deletePathData(state, action)

        case GridAction.ACTIVATE_PATH:
            return activatePath(state, action)

        case GridAction.TRANSFORM_PATH:
            return transformPath(state, action)

        case GridAction.CHANGE_DIMENSIONS:
            return changeDimensions(state, action)

        case GridAction.ANIMATE:
            return animate(state, action)
        
        case GridAction.ANIMATION_ON:
            return animationOn(state, action) 
            
        case GridAction.ANIMATION_OFF:
            return animationOff(state, action)

        case GridAction.IMPORT_PATHS:
            return importPaths(state, action)

        default:
            return state
    }
}

export default GridReducer