import React from 'react'
import  { exportToJsonFile } from '../utils/exportToJson'
import { extractControlPoints } from '../utils/extractControlPoints'

const Exporter = ( {paths} ) => {

    const exportToJson = () => {
        console.log("Export")
        const json = extractControlPoints(paths)
        exportToJsonFile(json)
    }

    return(
        <div>
            <ul>
                <li>
                    <button onClick={() => exportToJson()}>Export</button>
                </li>
            </ul>
        </div>
    )
}

export default Exporter
