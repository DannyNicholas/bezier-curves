import React from 'react'
import PropTypes from 'prop-types'
import EditorPanel from './EditorPanel'

const SideBar = ( {
    paths,
    moveControlPoint,
    changePathPoints,
    insertPathDataBefore,
    insertPathDataAfter,
    deletePathData,
    activatePath
} ) => {

    const Editors = paths.map((path, index) => 
        <EditorPanel
            key={index}
            index={index}
            path={path}
            moveControlPoint={moveControlPoint}
            changePathPoints={changePathPoints}
            insertPathDataBefore={insertPathDataBefore}
            insertPathDataAfter={insertPathDataAfter}
            deletePathData={deletePathData}
            activatePath={activatePath}
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
