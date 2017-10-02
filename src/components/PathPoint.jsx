import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Circle } from 'react-konva'

const PathPoint = ( {point} ) => {
    return (
        <Circle
            x={point.get('x')}
            y={point.get('y')}
            radius={2}
            fill={'black'}
            shadowBlur={3}
        />
    )
}

PathPoint.propTypes = {
    point: ImmutablePropTypes.contains({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    })
}

export default PathPoint