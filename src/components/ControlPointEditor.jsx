import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import createPoint from '../maths/createPoint'

const ControlPointEditor = ( {type, controlPoint, handleChange} ) => {

    const handleChangeX = (event) => {
        const newPoint = createPoint(event.target.value, controlPoint.get('y'))
        handleChange(type, newPoint)
    }

    const handleChangeY = (event) => {
        const newPoint = createPoint(controlPoint.get('x'), event.target.value)
        handleChange(type, newPoint)
    }

    return(
        <div>
            {type}
            <label>
                X:
                <input type="number" value={controlPoint.get('x')} onChange={handleChangeX} />
            </label>
            <label>
                Y:
                <input type="number" value={controlPoint.get('y')} onChange={handleChangeY} />
            </label>
        </div>
    )
}

ControlPointEditor.propTypes = {
    type: PropTypes.string.isRequired,
    controlPoint: ImmutablePropTypes.contains({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }),
    handleChange: PropTypes.func.isRequired,
}

export default ControlPointEditor