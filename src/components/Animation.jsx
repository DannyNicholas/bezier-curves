import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Circle } from 'react-konva'

const Animation = ( {position} ) => {

    return (
        <Circle
            x={position.get('x')}
            y={position.get('y')}
            radius={10}
            fill={'blue'}
            shadowBlur={15}
        />
    )
}

Animation.propTypes = {
    position: ImmutablePropTypes.contains({
        x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    }),
}

export default Animation