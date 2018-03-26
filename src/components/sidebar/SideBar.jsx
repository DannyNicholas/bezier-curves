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
    changePathParameter,
    insertPathDataBefore,
    insertPathDataAfter,
    deletePathData,
    activatePath,
    transformPath,
    changeDimensions,
    animationOn,
    animationOff,
    animation,
    importPaths
} ) => {

    const Editors = paths.map((path, index) => 
        <EditorPanel
            key={index}
            index={index}
            path={path}
            showDelete={paths.size > 1}
            moveControlPoint={moveControlPoint}
            changePathParameter={changePathParameter}
            insertPathDataBefore={insertPathDataBefore}
            insertPathDataAfter={insertPathDataAfter}
            deletePathData={deletePathData}
            activatePath={activatePath}
            transformPath={transformPath}
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
                width={width}
                height={height}
                importPaths={importPaths}
            />
            <Animator
                animationOn={animationOn}
                animationOff={animationOff}
                animating={animation.get('animating')}
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
    changeDimensions: PropTypes.func.isRequired
}

export default SideBar
