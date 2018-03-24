import React from 'react'
import PropTypes from 'prop-types'
import ControlPointEditor from './ControlPointEditor'
import PathPointsEditor from './PathPointsEditor'
import ParameterEditor from './ParameterEditor'
import PathType from '../constants/PathType'
import './BezierPointsEditor.css'

const BezierPointsEditor = ( {
    pathIndex,
    type,
    controlPoints,
    pathParameters,
    pathPoints,
    showDelete,
    moveControlPoint,
    changePathPoints,
    changePathParameter,
    insertPathDataBefore,
    insertPathDataAfter,
    deletePathData,
    transformPath
} ) => {

    const handlePathTypeChange = (event) => {
        const newPathType = event.target.value
        transformPath(pathIndex, newPathType)
    }
    
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

    const ParameterEditors = pathParameters.entrySeq()
        .map((parameter, key) =>
            <ParameterEditor
                key={key}
                pathIndex={pathIndex}
                parameterKey={parameter[0]}
                parameterValue={parameter[1]}
                changePathParameter={changePathParameter}
            />
    )

    let PointEditor
    if(type === PathType.BEZIER || type === PathType.LINEAR) {
        PointEditor = (
            <PathPointsEditor
                pathIndex={pathIndex}
                pathPoints={pathPoints}
                handleChange={changePathPoints}
            />
        )
    }

    // optional delete button
    let DeleteButton
    if(showDelete) {
        DeleteButton = (
            <li>
                <button className="button" onClick={() => deletePathData(pathIndex)}>Delete</button>
            </li>
        )
    }

    // drop-down to change the path type
    const PathTypeSelector = (
        <select name="path-type" value={type} onChange={handlePathTypeChange}>
            <option value={PathType.BEZIER}>Bezier</option>
            <option value={PathType.LINEAR}>Line</option>
            <option value={PathType.PAUSE}>Pause</option>
        </select>
    )
      
    return(
        <div className="bezierEditor">
            <span>Type</span>
            {PathTypeSelector}
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
                    {PointEditor}
                    {ParameterEditors}
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
    moveControlPoint: PropTypes.func.isRequired,
    changePathPoints: PropTypes.func.isRequired
}

export default BezierPointsEditor