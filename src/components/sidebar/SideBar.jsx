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
    animation,
    editors
} ) => {

    const Editors = paths.map((path, index) => 
        <EditorPanel
            key={index}
            index={index}
            path={path}
            showDelete={paths.size > 1}
            editors={editors}
            activatePath={editors.activatePath}
        />
    )
      
    return (
        <div>
            <DimensionsEditor
                width={width}
                height={height}
                changeDimensions={editors.changeDimensions}
            />
            <Exporter
                paths={paths}
                width={width}
                height={height}
                importPaths={editors.importPaths}
            />
            <Animator
                animationOn={editors.animationOn}
                animationOff={editors.animationOff}
                animating={animation.get('animating')}
            />
            <div className="editor">
                {Editors}
            </div>
        </div>
    )
}

SideBar.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    paths: PropTypes.object.isRequired,
    animation: PropTypes.object.isRequired,
    editors: PropTypes.object.isRequired
}

export default SideBar
