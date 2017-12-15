import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import SideBar from './SideBar'
import './Paths.css';

const Paths = ( {
    paths,
    moveControlPoint,
    changePathPoints,
    insertPathDataBefore,
    insertPathDataAfter,
    deletePathData,
    activatePath
} ) => {

    return (
        <div className="paths">
            <div className="main">
                <p>Main</p>
                <Grid 
                    paths={paths}
                    moveControlPoint={moveControlPoint}
                />
            </div>
            <div className="sideBar">
                <p>SideBar</p>
                <SideBar
                    paths={paths}
                    moveControlPoint={moveControlPoint}
                    changePathPoints={changePathPoints}
                    insertPathDataBefore={insertPathDataBefore}
                    insertPathDataAfter={insertPathDataAfter}
                    deletePathData={deletePathData}
                    activatePath={activatePath}
                />
            </div>
        </div>
    )
}

Paths.propTypes = {
    paths: PropTypes.object.isRequired,
    moveControlPoint: PropTypes.func.isRequired,
    changePathPoints: PropTypes.func.isRequired,
}

export default Paths
