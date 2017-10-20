import React from 'react'
import PropTypes from 'prop-types'
import ControlPointEditor from './ControlPointEditor'
import PathPointsEditor from './PathPointsEditor'
import './BezierPointsEditor.css'

const BezierPointsEditor = ( {controlPoints, pathPoints, moveControlPoint, changePathPoints} ) => {
    
    const Editors = controlPoints.valueSeq()
        .map((controlPoint, index) =>
            <ControlPointEditor
                key={index}
                type={controlPoint.get('name')}
                controlPoint={controlPoint.get('point')}
                handleChange={moveControlPoint}
            />
        )

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
                        pathPoints={pathPoints}
                        handleChange={changePathPoints}
                    />
                </tbody>
            </table>
        </div>
    )
}

BezierPointsEditor.propTypes = {
    controlPoints: PropTypes.object.isRequired,
    moveControlPoint: PropTypes.func.isRequired,
}

export default BezierPointsEditor