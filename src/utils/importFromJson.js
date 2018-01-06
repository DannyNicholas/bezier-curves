// handle file select and import. based on
// https://www.html5rocks.com/en/tutorials/file/dndfiles/
export const importFromJsonFile = (file, importPaths) => {
 
  if (!window.File || !window.FileReader || !window.FileList) {
      alert('The File APIs are not fully supported in this browser.')
  }
  else {
      const reader = new FileReader()

      // executes when file has loaded
      reader.onload = (e) => {
          const fileText = reader.result
          const json = JSON.parse(fileText)
          importPaths(json)
      }

      reader.readAsText(file)
  } 
}