import pointMultiplication from '../pointMultiplication'
import pointAddition from '../pointAddition'

// calculate current point based on parameter t (0 to 1)
const calculateBezierPoint = ( bezierPoints, t ) => {
    const u = 1 - t
    const tt = t * t
    const uu = u * u
    const uuu = uu * u
    const ttt = tt * t

    const pointStage1 = pointMultiplication( bezierPoints.get('start').get('point'), uuu )
    const pointStage2 = pointAddition( pointStage1, pointMultiplication( bezierPoints.get('startControl').get('point'), 3 * uu * t ) )
    const pointStage3 = pointAddition( pointStage2, pointMultiplication( bezierPoints.get('finishControl').get('point'), 3 * u * tt) )
    return pointAddition( pointStage3, pointMultiplication( bezierPoints.get('finish').get('point'), ttt) )
}

export default calculateBezierPoint