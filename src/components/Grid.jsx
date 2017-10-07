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
        .map((point, index) =>
            <ControlPoint
                key={index}
                point={point}
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
        <div>
            <div>Hello</div>
            <Stage width={500} height={500} className="grid">
                <Layer>
                    {PathPoints}
                </Layer>
                <Layer>
                    {ControlPoints}
                </Layer>
            </Stage>
            <BezierPointsEditor
                controlPoints={controlPoints}
                moveControlPoint={moveControlPoint} />
        </div>
    )
}

Grid.propTypes = {
    path: PropTypes.object.isRequired,
    controlPoints: PropTypes.object.isRequired
}

export default Grid
