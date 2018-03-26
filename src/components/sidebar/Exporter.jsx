import React from 'react'
import  { exportToJsonFile } from '../../utils/exportToJson'
import  { importFromJsonFile } from '../../utils/importFromJson'
import { extractPaths } from '../../utils/extractPaths'

const Exporter = ( {paths, width, height, importPaths} ) => {

    const exportToJson = () => {
        console.log("Export")
        const json = extractPaths(paths, width, height)
        exportToJsonFile(json)
    }

    const importFromJson = (event) => {
        const files = event.target.files
        const file = files[0]
        console.log('Importing file: ' + file.name)
        importFromJsonFile(file, importPaths)
    }

    return(
        <div>
            <ul>
                <li>
                    <button onClick={() => exportToJson()}>Export</button>
                </li>
            </ul>
            <div>
                <input type="file" id="files" name="files[]" onChange={importFromJson} />
            </div>
        </div>
    )
}

export default Exporter
