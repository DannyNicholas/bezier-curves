import React from 'react'

const PathPoint = ( {point} ) => {
    return (
        <div>
            {point.get('x')}
            ,
            {point.get('y')}
        </div>
    )
}

export default PathPoint