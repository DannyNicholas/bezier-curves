import React from 'react'

const Animator = ( {animate} ) => {

    return(
        <div>
            <ul>
                <li>
                    <button onClick={() => animate()}>Animate</button>
                </li>
            </ul>
        </div>
    )
}

export default Animator
