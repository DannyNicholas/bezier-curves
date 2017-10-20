import React from 'react'
import PropTypes from 'prop-types'
import {Layer, Stage} from 'react-konva'
import PathPoint from './PathPoint'
import ControlPoint from './ControlPoint'
import BezierPointsEditor from './BezierPointsEditor'
import './Grid.css';

const Grid = ( { path, controlPoints, moveControlPoint } ) => {

    // valueSeq() allows immutable map to be used as children
    const ControlPoints = controlPoints.valueSeq()
        .map((controlPoint, index) =>
            <ControlPoint
                key={index}
                type={controlPoint.get('name')}
                point={controlPoint.get('point')}
                handleChange={moveControlPoint}
            />
        )

    const PathPoints = path.valueSeq()
        .map((point, index) =>
            <PathPoint
                key={index}
                point={point}
            />
        )

    return (
        <div className="page">
            <div className="content">
                <Stage width={500} height={500} className="grid">
                    <Layer>
                        {PathPoints}
                    </Layer>
                    <Layer>
                        {ControlPoints}
                    </Layer>
                </Stage>
            </div>
            <div className="sideBar">
                <BezierPointsEditor
                    controlPoints={controlPoints}
                    moveControlPoint={moveControlPoint} />
            </div>
        </div>
    )
}

Grid.propTypes = {
    path: PropTypes.object.isRequired,
    controlPoints: PropTypes.object.isRequired
}

export default Grid
