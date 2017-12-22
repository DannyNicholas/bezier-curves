import React from 'react'
import PropTypes from 'prop-types'
import EditorPanel from './EditorPanel'
import DimensionsEditor from './DimensionsEditor'

const SideBar = ( {
    width,
    height,
    paths,
    moveControlPoint,
    changePathPoints,
    insertPathDataBefore,
    insertPathDataAfter,
    deletePathData,
    activatePath,
    changeDimensions
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
        <div>
            <DimensionsEditor
                width={width}
                height={height}
                changeDimensions={changeDimensions}
            />
            <div className="editor">
                {Editors}
            </div>
        </div>
    )
}

SideBar.propTypes = {
    paths: PropTypes.object.isRequired,
    moveControlPoint: PropTypes.func.isRequired,
    changePathPoints: PropTypes.func.isRequired,
    changeDimensions: PropTypes.func.isRequired
}

export default SideBar
