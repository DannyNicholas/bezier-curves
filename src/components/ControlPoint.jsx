import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Circle } from 'react-konva'
import createPoint from '../maths/createPoint'

const ControlPoint = ( {type, point, handleChange} ) => {

    const onDrag = (e) => {
        const newPoint = createPoint(e.target.attrs.x, e.target.attrs.y)
        handleChange(type, newPoint)
    }

    return (
        <Circle
            x={point.get('x')}
            y={point.get('y')}
            radius={5}
            fill={'red'}
            shadowBlur={6}
            draggable='true'
            onDragStart={onDrag}
            onDragMove={onDrag}
            onDragEnd={onDrag}
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