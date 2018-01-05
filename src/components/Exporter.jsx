import React from 'react'
import  { exportToJsonFile } from '../utils/exportToJson'
import  { importFromJsonFile } from '../utils/importFromJson'
import { extractPaths } from '../utils/extractPaths'

const Exporter = ( {paths} ) => {

    const exportToJson = () => {
        console.log("Export")
        const json = extractPaths(paths)
        exportToJsonFile(json)
    }

    // https://www.html5rocks.com/en/tutorials/file/dndfiles/

    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
    
        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                      f.size, ' bytes, last modified: ',
                      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                      '</li>');
                      console.log(f.name)

                      var reader = new FileReader();
                      reader.readAsDataURL(f);
                      console.log(reader)
                      console.log(reader.result)

                        // Only process image files.
                        // console.log(f.type.match('json.*'))
                        // if (!f.type.match('image.*')) {
                        //     continue;
                        // }

        }
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

        //console.log(output)
      }

    return(
        <div>
            <ul>
                <li>
                    <button onClick={() => importFromJsonFile()}>Import</button>
                </li>
                <li>
                    <button onClick={() => exportToJson()}>Export</button>
                </li>
            </ul>
            <div>
            <label for="file">IMPORT</label>
            <input type="file" id="files" name="files[]" onChange={handleFileSelect} />
            <output id="list"></output>
            </div>
        </div>
    )
}

export default Exporter
