import React from 'react'

const Animator = ( { animationOn, animationOff } ) => {

    return(
        <div>
            <ul>
                <li>
                    <button onClick={() => animationOn()}>Animation On</button>
                </li>
                <li>
                    <button onClick={() => animationOff()}>Animation Off</button>
                </li>
            </ul>
        </div>
    )
}

export default Animator
