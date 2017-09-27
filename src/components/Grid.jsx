import React from 'react'
import {Layer, Stage} from 'react-konva'
import PathPoint from './PathPoint'
import './Grid.css';

const Grid = ( {path} ) => {
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
            </Stage>
        </div>
    )
}

export default Grid
