import { connect } from 'react-redux'
import GridActionCreators from '../action-creators/GridActionCreators'
import Paths from './Paths'

const mapStateToProps = (state) => {
    return {
        paths: state.get('paths'),
        width: state.get('width'),
        height: state.get('height'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveControlPoint: (index, pointType, controlPoint) => dispatch(GridActionCreators.moveControlPoint(index, pointType, controlPoint)),
        changePathPoints: (index, pathPoints) => dispatch(GridActionCreators.changePathPoints(index, pathPoints)),
        insertPathDataBefore: (index) => dispatch(GridActionCreators.insertPathDataBefore(index)),
        insertPathDataAfter: (index) => dispatch(GridActionCreators.insertPathDataAfter(index)),
        deletePathData: (index) => dispatch(GridActionCreators.deletePathData(index)),
        activatePath: (index) => dispatch(GridActionCreators.activatePath(index)),
        changeDimensions: (width, height) => dispatch(GridActionCreators.changeDimensions(width, height))
    }
}

const GridContainer = connect(mapStateToProps, mapDispatchToProps)(Paths)

export default GridContainer