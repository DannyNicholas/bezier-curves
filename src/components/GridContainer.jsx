import { connect } from 'react-redux'
import GridActionCreators from '../action-creators/GridActionCreators'
import Grid from './Grid'

const mapStateToProps = (state) => {
    return {
        path: state.get('path'),
        controlPoints: state.get('controlPoints'),
        pathPoints: state.get('pathPoints')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveControlPoint: (pointType, controlPoint) => dispatch(GridActionCreators.moveControlPoint(pointType, controlPoint)),
        changePathPoints: (pathPoints) => dispatch(GridActionCreators.changePathPoints(pathPoints))
    }
}

const GridContainer = connect(mapStateToProps, mapDispatchToProps)(Grid)

export default GridContainer