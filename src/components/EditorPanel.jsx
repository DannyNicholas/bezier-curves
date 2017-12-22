import React from 'react'
import BezierPointsEditor from './BezierPointsEditor'
import './EditorPanel.css'

const EditorPanel = ( {
    path,
    index,
    active,
    showDelete,
    moveControlPoint,
    changePathPoints,
    insertPathDataBefore,
    insertPathDataAfter,
    deletePathData,
    activatePath
} ) => {
    
    let PointsEditor;
    if (path.get('active')) {
        PointsEditor = <BezierPointsEditor
            key={index}
            pathIndex={index}
            controlPoints={path.get('controlPoints')}
            pathPoints={path.get('pathPoints')}
            showDelete={showDelete}
            moveControlPoint={moveControlPoint}
            changePathPoints={changePathPoints}
            insertPathDataBefore={insertPathDataBefore}
            insertPathDataAfter={insertPathDataAfter}
            deletePathData={deletePathData}
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

export default EditorPanel