import React from 'react'
import PathPoint from './PathPoint'

const Grid = ( {path} ) => {

    return (
        <div>
            <div>Hello</div>
            {
                path.map((point, index) =>
                    <PathPoint
                        key={index}
                        point={point}
                    />
                )
            }
        </div>
    )
}

export default Grid
