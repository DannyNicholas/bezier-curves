import { connect } from 'react-redux'
import Grid from './Grid'

const mapStateToProps = (state) => {
    return {
        path: state.get('path')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // TODO
    }
}

const GridContainer = connect(mapStateToProps, mapDispatchToProps)(Grid)

export default GridContainer