import React from 'react'
import PropTypes from 'prop-types'
import {Layer, Stage} from 'react-konva'
import PathPoint from './PathPoint'
import ControlPoint from './ControlPoint'
import './Grid.css';

const Grid = ( { paths, width, height, moveControlPoint } ) => {

    // valueSeq() allows immutable map to be used as children
    const ControlPoints = paths.map((path, pathIndex) => {
            if (path.get('active')) {
                return path.get('controlPoints').valueSeq().map((controlPoint, index) =>
                    <ControlPoint
                        key={index}
                        pathIndex={pathIndex}
                        type={controlPoint.get('name')}
                        point={controlPoint.get('point')}
                        handleChange={moveControlPoint}
                    />
                )
            }
            return null
        }
    )

    const PathPoints = paths.valueSeq().map((path) => 
        path.get('path').map((point, index) =>
            <PathPoint
                key={index}
                point={point}
            />
        )
    )

    const sizeStyle = {
        width: `${width}px`,
        height: `${height}px`
    };

    return (
        <div className="grid" style={sizeStyle}>
            <Stage width={width} height={height}>
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
