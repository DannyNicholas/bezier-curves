import pointMultiplication from './pointMultiplication'
import pointAddition from './pointAddition'

// calculate current point based on parameter t (0 to 1)
const calculateBezierPoint = ( bezierPoints, t ) => {
    const u = 1 - t
    const tt = t * t
    const uu = u * u
    const uuu = uu * u
    const ttt = tt * t

    const pointStage1 = pointMultiplication( bezierPoints.get('start'), uuu )
    const pointStage2 = pointAddition( pointStage1, pointMultiplication( bezierPoints.get('startControl'), 3 * uu * t ) )
    const pointStage3 = pointAddition( pointStage2, pointMultiplication( bezierPoints.get('finishControl'), 3 * u * tt) )
    return pointAddition( pointStage3, pointMultiplication( bezierPoints.get('finish'), ttt) )
}

export default calculateBezierPoint