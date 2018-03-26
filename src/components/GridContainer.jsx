import { connect } from 'react-redux'
import GridActionCreators from '../action-creators/GridActionCreators'
import Paths from './Paths'

const mapStateToProps = (state) => {
    return {
        paths: state.get('paths'),
        width: state.get('width'),
        height: state.get('height'),
        animation: state.get('animation'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editors: {
            moveControlPoint: (index, pointType, controlPoint) => dispatch(GridActionCreators.moveControlPoint(index, pointType, controlPoint)),
            changePathParameter: (index, parameterKey, parameterValue) => dispatch(GridActionCreators.changePathParameter(index, parameterKey, parameterValue)),
            insertPathDataBefore: (index) => dispatch(GridActionCreators.insertPathDataBefore(index)),
            insertPathDataAfter: (index) => dispatch(GridActionCreators.insertPathDataAfter(index)),
            deletePathData: (index) => dispatch(GridActionCreators.deletePathData(index)),
            activatePath: (index) => dispatch(GridActionCreators.activatePath(index)),
            transformPath: (index, pathType) => dispatch(GridActionCreators.transformPath(index, pathType)),
            changeDimensions: (width, height) => dispatch(GridActionCreators.changeDimensions(width, height)),
            animationOn: () => dispatch(GridActionCreators.animationOn()),
            animationOff: () => dispatch(GridActionCreators.animationOff()),
            importPaths: (jsonData) => dispatch(GridActionCreators.importPaths(jsonData))
        }
    }
}

const GridContainer = connect(mapStateToProps, mapDispatchToProps)(Paths)

export default GridContainer