import React from 'react'
import PropTypes from 'prop-types'
import Grid from './grid/Grid'
import SideBar from './sidebar/SideBar'
import './Paths.css';

const Paths = ( {
    paths,
    width,
    height,
    animation,
    editors
} ) => {

    return (
        <div className="paths">
            <div className="main">
                <p>Main</p>
                <Grid 
                    paths={paths}
                    width={width}
                    height={height}
                    animation={animation}
                    moveControlPoint={editors.moveControlPoint}
                />
            </div>
            <div className="sideBar">
                <p>SideBar</p>
                <SideBar
                    width={width}
                    height={height}
                    paths={paths}
                    animation={animation}
                    editors={editors}
                />
            </div>
        </div>
    )
}

Paths.propTypes = {
    paths: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    animation: PropTypes.object.isRequired,
    editors: PropTypes.object.isRequired
}

export default Paths
