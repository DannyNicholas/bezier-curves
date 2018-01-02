export const extractPaths = (paths) => {
    return {
        data: extractControlPoints(paths)
    }
}

const extractControlPoints = (paths) => {
    return paths.map( (path) => {
        const controlPoints = path.get('controlPoints')
        return {
            start: extractPoint(controlPoints.get('start')),
            finish: extractPoint(controlPoints.get('finish')),
            startControl: extractPoint(controlPoints.get('startControl')),
            finishControl: extractPoint(controlPoints.get('finishControl')),
            pathPoints: path.get('pathPoints')
        }
    })
}

const extractPoint = (controlPoint) => {
    const point = controlPoint.get('point')
    return {
        x: point.get('x'),
        y: point.get('y')
    }
}