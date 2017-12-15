import React from 'react'
import PropTypes from 'prop-types'
import {Layer, Stage} from 'react-konva'
import PathPoint from './PathPoint'
import ControlPoint from './ControlPoint'
import './Grid.css';

const Grid = ( { paths, moveControlPoint } ) => {

    // valueSeq() allows immutable map to be used as children
    const ControlPoints = paths
        .filter((path) => path.get('active'))
        .map((path, pathIndex) =>
            path.get('controlPoints').valueSeq()
            .map((controlPoint, index) =>
                <ControlPoint
                    key={index}
                    pathIndex={pathIndex}
                    type={controlPoint.get('name')}
                    point={controlPoint.get('point')}
                    handleChange={moveControlPoint}
                />
            )
        )

    const PathPoints = paths.valueSeq().map((path) => 
        path.get('path').map((point, index) =>
            <PathPoint
                key={index}
                point={point}
            />
        )
    )

    return (
        <div className="grid">
            <Stage width={500} height={500}>
                <Layer>
                    {PathPoints}
                </Layer>
                <Layer>
                    {ControlPoints}
                </Layer>
            </Stage>
        </div>
    )
}

Grid.propTypes = {
    paths: PropTypes.object.isRequired,
    moveControlPoint: PropTypes.func.isRequired
}

export default Grid
