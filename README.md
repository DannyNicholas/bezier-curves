# Paths Creator

## Internal Paths JSON Structure

### Overall Structure

The internal representation of paths is an array of path data with associated dimension and animation data and follows the structure below:

```
{
  // array of path data
  paths: [ ... ],

  // dimensions of display area
  width: 540,
  height: 960,

  // animation state
  animation: {
    animating: true,
    nextIndex: 8,
    position: {
        x: 24,
        y: 32
    }
  }
}
```

### Path Data

Each path data item holds it's:
  - calculated path points (an array of x,y path co-ordinates)
  - control points (e.g. start/finish positions)
  - additional parameters (e.g. number of points on path)
  - is path active? (only one path can be active)

Example JSON for a single item of path data:

```
{
  // path type
  type: ?
  
  // array of calculated path positions
  path: [ {x: 20, y: 490}, {x: 25, y: 495}, .... ],
  
  // control points
  controlPoints: {},
  
  // additional parameters
  parameters: {},
  
  // is path active?
  active: true/false
}
```

### Bezier Curve Paths

Bezier curve paths have the following control points and parameters.

- start - start position of bezier curve
- finish - finish position of bezier curve
- startControl - bezier start control position (alters path of curve)
- finishControl - bezier finish control position (alters path of curve)
- parameters - number of points on the bezier path

Example below:

```
type: 'bezier'

controlPoints: {
  start: { name: 'start', point: {x: 50, y:50} },
  startControl: { name: 'startControl', point: {x: 150, y:150} },
  finish: { name: 'finish', point: {x: 150, y:50} },
  finishControl: { name: 'finishControl', point: {x: 50, y:150} }
}

parameters: {
  pathPoints: 100
}
```

### Linear Paths

Linear paths have the following control points and parameters.

- start - start position of line
- finish - finish position of line
- parameters - number of points on the linear path

Example below:

```
type: 'linear'

controlPoints: {
  start: { name: 'start', point: {x: 50, y:50} },
  finish: { name: 'finish', point: {x: 150, y:250} }
}

parameters: {
  pathPoints: 100
}
```

### Pause Paths

Pause paths have the following control points and parameters.

- position - position while paused
- parameters - pause time in milliseconds

Example below:

```
type: 'pause'

controlPoints: {
  position: { name: 'position', point: {x: 50, y:50} }
}

parameters: {
  pauseTime: 100
}
```

### Detailed Example of JSON paths

```
{
  paths: [
    {
      type: 'bezier',
      path: [
        {
          x: 20,
          y: 490
        },
        .....
        {
          x: 200,
          y: 480
        }
      ],
      controlPoints: {
        start: {
          name: 'start',
          point: {
            x: 20,
            y: 490
          }
        },
        startControl: {
          name: 'startControl',
          point: {
            x: 20,
            y: 20
          }
        },
        finish: {
          name: 'finish',
          point: {
            x: 200,
            y: 480
          }
        },
        finishControl: {
          name: 'finishControl',
          point: {
            x: 200,
            y: 20
          }
        }
      },
      parameters: {
        pathPoints: 100
      }
      active: true
    },
    {
      type: 'bezier',
      path: [
        {
          x: 200,
          y: 480
        },
        {
          x: 201.25956000000002,
          y: 466.3379999999999
        },
        ....
        {
          x: 480,
          y: 480
        }
      ],
      controlPoints: {
        start: {
          name: 'start',
          point: {
            x: 200,
            y: 480
          }
        },
        startControl: {
          name: 'startControl',
          point: {
            x: 240,
            y: 20
          }
        },
        finish: {
          name: 'finish',
          point: {
            x: 480,
            y: 480
          }
        },
        finishControl: {
          name: 'finishControl',
          point: {
            x: 480,
            y: 20
          }
        }
      },
      parameters: {
        pathPoints: 100
      }
      active: false
    }
  ],
  width: 540,
  height: 960,
  animation: {
    animating: true,
    nextIndex: 8,
    position: {
        x: 24,
        y: 32
    }
}
```
