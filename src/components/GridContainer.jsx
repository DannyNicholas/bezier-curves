import { connect } from 'react-redux'
import GridActionCreators from '../action-creators/GridActionCreators'
import Paths from './Paths'

const mapStateToProps = (state) => {
    return {
        paths: state.get('paths')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveControlPoint: (index, pointType, controlPoint) => dispatch(GridActionCreators.moveControlPoint(index, pointType, controlPoint)),
        changePathPoints: (index, pathPoints) => dispatch(GridActionCreators.changePathPoints(index, pathPoints))
    }
}

const GridContainer = connect(mapStateToProps, mapDispatchToProps)(Paths)

export default GridContainer