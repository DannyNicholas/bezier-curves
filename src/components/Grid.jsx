import React from 'react'
import PropTypes from 'prop-types'
import {Layer, Stage} from 'react-konva'
import PathPoint from './PathPoint'
import ControlPoint from './ControlPoint'
import './Grid.css';

const Grid = ( { path, controlPoints } ) => {
    return (
        <div>
            <div>Hello</div>
            <Stage width={500} height={500} className="grid">
                <Layer>
                    {path.map((point, index) =>
                        <PathPoint
                            key={index}
                            point={point}
                        />
                    )}
                </Layer>
                <Layer>
                    {controlPoints.map((point, index) =>
                        <ControlPoint
                            key={index}
                            point={point}
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    )
}

Grid.propTypes = {
    path: PropTypes.object.isRequired,
    controlPoints: PropTypes.object.isRequired
}

export default Grid
