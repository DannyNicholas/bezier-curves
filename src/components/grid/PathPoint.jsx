import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Circle } from 'react-konva'

const PathPoint = ( {point, active} ) => {
    return (
        <Circle
            x={point.get('x')}
            y={point.get('y')}
            radius={2}
            fill={active ? 'red' : 'black'}
            shadowBlur={3}
        />
    )
}

PathPoint.propTypes = {
    point: ImmutablePropTypes.contains({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }),
    active: PropTypes.bool.isRequired
}

export default PathPoint