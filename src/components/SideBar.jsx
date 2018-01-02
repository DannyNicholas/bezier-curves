import React from 'react'
import PropTypes from 'prop-types'
import EditorPanel from './EditorPanel'
import DimensionsEditor from './DimensionsEditor'
import Exporter from './Exporter'
import Animator from './Animator'

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
    changeDimensions,
    animate
} ) => {

    const Editors = paths.map((path, index) => 
        <EditorPanel
            key={index}
            index={index}
            path={path}
            showDelete={paths.size > 1}
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
            <Exporter
                paths={paths}
            />
            <Animator
                animate={animate}
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
