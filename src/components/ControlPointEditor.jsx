import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import createPoint from '../maths/createPoint'
import './ControlPointEditor.css'

const ControlPointEditor = ( {pathIndex, type, controlPoint, handleChange} ) => {

    const handleChangeX = (event) => {
        const value = event.target.value === '' ? '' : parseInt(event.target.value, 10) 
        const newPoint = createPoint(value, controlPoint.get('y'))
        handleChange(pathIndex, type, newPoint)
    }

    const handleChangeY = (event) => {
        const value = event.target.value === '' ? '' : parseInt(event.target.value, 10) 
        const newPoint = createPoint(controlPoint.get('x'), value)
        handleChange(pathIndex, type, newPoint)
    }

    return(
        <tr>
            <th scope="row">{type}</th>
            <td>
                <input type="number" value={controlPoint.get('x')} onChange={handleChangeX} />
            </td>
            <td>
                <input type="number" value={controlPoint.get('y')} onChange={handleChangeY} />
            </td>
        </tr>
    )
}

ControlPointEditor.propTypes = {
    type: PropTypes.string.isRequired,
    controlPoint: ImmutablePropTypes.contains({
        x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    }),
    handleChange: PropTypes.func.isRequired,
}

export default ControlPointEditor