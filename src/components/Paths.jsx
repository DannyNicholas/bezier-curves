import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'

const Paths = ( { paths, moveControlPoint, changePathPoints } ) => {

    // valueSeq() allows immutable map to be used as children
    const Paths = paths.valueSeq()
        .map((path, index) =>
            <Grid
                key={index}
                pathIndex={index}
                path={path.get('path')}
                controlPoints={path.get('controlPoints')}
                pathPoints={path.get('pathPoints')}
                moveControlPoint={moveControlPoint}
                changePathPoints={changePathPoints}
            />
        )

    return (
        <div>
            {Paths}
        </div>
    )
}

Paths.propTypes = {
    paths: PropTypes.object.isRequired
}

export default Paths
