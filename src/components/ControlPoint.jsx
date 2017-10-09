import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Circle } from 'react-konva'

const ControlPoint = ( {point} ) => {

    return (
        <Circle
            x={point.get('x')}
            y={point.get('y')}
            radius={5}
            fill={'red'}
            shadowBlur={6}
        />
    )
}

ControlPoint.propTypes = {
    point: ImmutablePropTypes.contains({
        x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })
}

export default ControlPoint