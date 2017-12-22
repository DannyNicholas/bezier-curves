export const extractControlPoints = (paths) => {
    
    const output = paths.map( (path) => {
        return path.get('controlPoints')
    })

    return output
}