export const extractPaths = (paths, width, height) => {
    return {
        pathData: extractPathData(paths),
        width: width,
        height: height
    }
}

// return an array of path data
const extractPathData = (paths) => {
    return paths.map( (path) => {
        
        const controlPoints = extractControlPoints(path.get('controlPoints'))
        const parameters = extractParameters(path.get('parameters'))
        return Object.assign(
            { type: path.get('type') },
            controlPoints,
            parameters
        )
    })
}

// return an object representing all control points
const extractControlPoints = (controlPoints) => {

    const extractedControlPoints = {}
    controlPoints.forEach( (controlPoint) => {
        extractedControlPoints[controlPoint.get('name')] = extractPoint(controlPoint)
    })
    return extractedControlPoints
}

// extract x and y co-ordinates from control point
const extractPoint = (controlPoint) => {
    const point = controlPoint.get('point')
    return {
        x: point.get('x'),
        y: point.get('y')
    }
}

// return an object representing all parameters
const extractParameters = (parameters) => {

    const extractedParameters = {}
    parameters.map((value, key) => extractedParameters[key] = value)
    return extractedParameters
}