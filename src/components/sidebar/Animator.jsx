import React from 'react'
import PropTypes from 'prop-types'
import './Animator.css'

const Animator = ( { animating, animationOn, animationOff } ) => {

    const handleToggle = (event) => {
        if (event.target.checked === true) {
            animationOn()
        }
        else {
            animationOff()
        }
    }

    return(
        <div>
            <div>Animate</div>
            <label className="switch">
                <input type="checkbox" onChange={handleToggle} checked={animating} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

Animator.propTypes = {
    animating: PropTypes.bool.isRequired,
    animationOn: PropTypes.func.isRequired,
    animationOff: PropTypes.func.isRequired,
}

export default Animator
