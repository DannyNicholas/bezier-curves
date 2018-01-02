import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import SideBar from './SideBar'
import './Paths.css';

const Paths = ( {
    paths,
    width,
    height,
    animation,
    moveControlPoint,
    changePathPoints,
    insertPathDataBefore,
    insertPathDataAfter,
    deletePathData,
    activatePath,
    changeDimensions,
    animate
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
                    moveControlPoint={moveControlPoint}
                />
            </div>
            <div className="sideBar">
                <p>SideBar</p>
                <SideBar
                    width={width}
                    height={height}
                    paths={paths}
                    moveControlPoint={moveControlPoint}
                    changePathPoints={changePathPoints}
                    insertPathDataBefore={insertPathDataBefore}
                    insertPathDataAfter={insertPathDataAfter}
                    deletePathData={deletePathData}
                    activatePath={activatePath}
                    changeDimensions={changeDimensions}
                    animate={animate}
                />
            </div>
        </div>
    )
}

Paths.propTypes = {
    paths: PropTypes.object.isRequired,
    moveControlPoint: PropTypes.func.isRequired,
    changePathPoints: PropTypes.func.isRequired,
    changeDimensions: PropTypes.func.isRequired
}

export default Paths
