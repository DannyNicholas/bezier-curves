import React from 'react'
import PropTypes from 'prop-types'
import BezierPointsEditor from './BezierPointsEditor'

const SideBar = ( { paths, moveControlPoint, changePathPoints  } ) => {

    const Editors = paths.map((path, index) => 
        <BezierPointsEditor
            key={index}
            pathIndex={index}
            controlPoints={path.get('controlPoints')}
            pathPoints={path.get('pathPoints')}
            moveControlPoint={moveControlPoint}
            changePathPoints={changePathPoints}
        />
    )
      
    return (
        <div className="editor">
            {Editors}
        </div>
    )
}

SideBar.propTypes = {
    paths: PropTypes.object.isRequired,
    moveControlPoint: PropTypes.func.isRequired,
    changePathPoints: PropTypes.func.isRequired
}

export default SideBar
