import React from 'react'
import PropTypes from 'prop-types'
import ControlPointEditor from './ControlPointEditor'
import PathPointsEditor from './PathPointsEditor'
import './BezierPointsEditor.css'

const BezierPointsEditor = ( {
    pathIndex,
    controlPoints,
    pathPoints,
    showDelete,
    moveControlPoint,
    changePathPoints,
    insertPathDataBefore,
    insertPathDataAfter,
    deletePathData
} ) => {
    
    const Editors = controlPoints.valueSeq()
        .map((controlPoint, index) =>
            <ControlPointEditor
                key={index}
                pathIndex={pathIndex}
                type={controlPoint.get('name')}
                controlPoint={controlPoint.get('point')}
                handleChange={moveControlPoint}
            />
        )

    // optional delete button
    let DeleteButton
    if(showDelete) {
        DeleteButton = (
            <li>
                <button className="button" onClick={() => deletePathData(pathIndex)}>Delete</button>
            </li>
        )
    }
      
    return(
        <div className="bezierEditor">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col">X</th>
                        <th scope="col">Y</th>
                    </tr>
                </thead>
                <tbody>
                    {Editors}
                    <PathPointsEditor
                        pathIndex={pathIndex}
                        pathPoints={pathPoints}
                        handleChange={changePathPoints}
                    />
                </tbody>
            </table>
            <ul className="button-group">
                <li>
                    <button className="button" onClick={() => insertPathDataBefore(pathIndex)}>Add Before</button>
                </li>
                <li>
                    <button className="button" onClick={() => insertPathDataAfter(pathIndex)}>Add After</button>
                </li>
                {DeleteButton}
            </ul>
        </div>
    )
}

BezierPointsEditor.propTypes = {
    pathIndex: PropTypes.number.isRequired,
    controlPoints: PropTypes.object.isRequired,
    pathPoints: PropTypes.number.isRequired,
    moveControlPoint: PropTypes.func.isRequired,
    changePathPoints: PropTypes.func.isRequired
}

export default BezierPointsEditor