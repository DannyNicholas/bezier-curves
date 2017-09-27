import React from 'react'
import { Circle } from 'react-konva'

const PathPoint = ( {point} ) => {
    return (
        <Circle
            x={point.get('x')}
            y={point.get('y')}
            radius={10}
            fill={window.Konva.Util.getRandomColor()}
            shadowBlur={5}
        />
    )
}

export default PathPoint