import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Circle } from 'react-konva'
import createPoint from '../maths/createPoint'

const ControlPoint = ( {pathIndex, type, point, handleChange} ) => {

    const onDrag = (e) => {
        const newPoint = createPoint(e.target.attrs.x, e.target.attrs.y)
        handleChange(pathIndex, type, newPoint)
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
    pathIndex: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    point: ImmutablePropTypes.contains({
        x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    }),
    handleChange: PropTypes.func.isRequired
}

export default ControlPoint