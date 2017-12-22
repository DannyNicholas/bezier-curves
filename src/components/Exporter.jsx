import React from 'react'
import  { exportToJsonFile } from '../utils/exportToJson'
import { extractPaths } from '../utils/extractPaths'

const Exporter = ( {paths} ) => {

    const exportToJson = () => {
        console.log("Export")
        const json = extractPaths(paths)
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
