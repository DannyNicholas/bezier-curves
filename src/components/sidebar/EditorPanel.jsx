import React from 'react'
import PropTypes from 'prop-types'
import BezierPointsEditor from './BezierPointsEditor'
import './EditorPanel.css'

const EditorPanel = ( {
    path,
    index,
    showDelete,
    editors,
    activatePath
} ) => {
    
    let PointsEditor;
    if (path.get('active')) {
        PointsEditor = <BezierPointsEditor
            key={index}
            pathIndex={index}
            type={path.get('type')}
            controlPoints={path.get('controlPoints')}
            pathParameters={path.get('parameters')}
            showDelete={showDelete}
            moveControlPoint={editors.moveControlPoint}
            changePathParameter={editors.changePathParameter}
            insertPathDataBefore={editors.insertPathDataBefore}
            insertPathDataAfter={editors.insertPathDataAfter}
            deletePathData={editors.deletePathData}
            transformPath={editors.transformPath}
        />
    }

    let ActivateButton;
    if (!path.get('active')) {
        ActivateButton =
            <button className="button" onClick={() => activatePath(index)}>Activate</button>
    }
    
    return (
        <div className="editorPanel">
            <span>
                Title {index}
                {ActivateButton}
            </span>
            {PointsEditor}
        </div>
    )
}

EditorPanel.propTypes = {
    path: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    showDelete: PropTypes.bool.isRequired,
    editors: PropTypes.object.isRequired,
    activatePath: PropTypes.func.isRequired
}

export default EditorPanel