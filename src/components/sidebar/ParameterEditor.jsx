import React from 'react'
import PropTypes from 'prop-types'

const ParameterEditor = ( {pathIndex, parameterKey, parameterValue, changePathParameter} ) => {

    const handleChange = (event) => {
        const value = event.target.value === '' ? '' : parseInt(event.target.value,10)
        changePathParameter(pathIndex, parameterKey, value)
    }

    return(
        <tr>
            <th scope="row">{parameterKey}</th>
            <td>
                <input type="number" value={parameterValue} onChange={handleChange} />
            </td>
        </tr>
    )
}

ParameterEditor.propTypes = {
    pathIndex: PropTypes.number.isRequired,
    parameterKey: PropTypes.string.isRequired,
    parameterValue: PropTypes.number.isRequired,
    changePathParameter: PropTypes.func.isRequired,
}

export default ParameterEditor