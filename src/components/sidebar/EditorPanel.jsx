import React from 'react'
import BezierPointsEditor from './BezierPointsEditor'
import './EditorPanel.css'

const EditorPanel = ( {
    path,
    index,
    active,
    showDelete,
    moveControlPoint,
    changePathParameter,
    insertPathDataBefore,
    insertPathDataAfter,
    deletePathData,
    activatePath,
    transformPath
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
            moveControlPoint={moveControlPoint}
            changePathParameter={changePathParameter}
            insertPathDataBefore={insertPathDataBefore}
            insertPathDataAfter={insertPathDataAfter}
            deletePathData={deletePathData}
            transformPath={transformPath}
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