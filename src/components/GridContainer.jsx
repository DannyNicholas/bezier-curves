import { connect } from 'react-redux'
import GridActionCreators from '../action-creators/GridActionCreators'
import Grid from './Grid'

const mapStateToProps = (state) => {
    return {
        path: state.get('path'),
        controlPoints: state.get('controlPoints')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveControlPoint: (pointType, controlPoint) => dispatch(GridActionCreators.moveControlPoint(pointType, controlPoint))
    }
}

const GridContainer = connect(mapStateToProps, mapDispatchToProps)(Grid)

export default GridContainer