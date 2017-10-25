import React from 'react'
import PropTypes from 'prop-types'

const PathPointsEditor = ( {pathIndex, pathPoints, handleChange} ) => {

    const handlePathPointsChange = (event) => {
        const value = event.target.value === '' ? '' : parseInt(event.target.value, 10) 
        handleChange(pathIndex, value)
    }

    return(
        <tr>
            <th scope="row">Path Points</th>
            <td colSpan="2">
                <input type="number" value={pathPoints} onChange={handlePathPointsChange} />
            </td>
        </tr>
    )
}

PathPointsEditor.propTypes = {
    pathPoints: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    handleChange: PropTypes.func.isRequired,
}

export default PathPointsEditor