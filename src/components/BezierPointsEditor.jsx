import React from 'react'
import PropTypes from 'prop-types'
import ControlPointEditor from './ControlPointEditor'

const BezierPointsEditor = ( {controlPoints, moveControlPoint} ) => {

    return(
        <div>
            <ControlPointEditor
                type="start" controlPoint={controlPoints.get('start')} handleChange={moveControlPoint}/>
            <ControlPointEditor
                type="startControl" controlPoint={controlPoints.get('startControl')} handleChange={moveControlPoint}/>
            <ControlPointEditor
                type="finish" controlPoint={controlPoints.get('finish')} handleChange={moveControlPoint}/>
            <ControlPointEditor
                type="finishControl" controlPoint={controlPoints.get('finishControl')} handleChange={moveControlPoint}/>
        </div>
    )
}

BezierPointsEditor.propTypes = {
    controlPoints: PropTypes.object.isRequired,
    moveControlPoint: PropTypes.func.isRequired,
}

export default BezierPointsEditor