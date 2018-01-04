import React from 'react'
import PropTypes from 'prop-types'
import './DimensionsEditor.css'

const DimensionsEditor = ( {width, height, changeDimensions} ) => {

    const handleWidthChange = (event) => {
        const newWidth = event.target.value === '' ? '' : parseInt(event.target.value, 10)
        changeDimensions(newWidth, height)
    }

    const handleHeightChange = (event) => {
        const newHeight = event.target.value === '' ? '' : parseInt(event.target.value, 10)
        changeDimensions(width, newHeight)
    }

    return(
        <div className="dimensionsEditor">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col">Width</th>
                        <th scope="col">Height</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                           Dimensions
                        </th>
                        <td>
                            <input type="number" value={width} onChange={handleWidthChange} />
                        </td>
                        <td>
                            <input type="number" value={height} onChange={handleHeightChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

DimensionsEditor.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    changeDimensions: PropTypes.func.isRequired
}

export default DimensionsEditor