# Bezier Curves

## Internal JSON Structure

### High level example

The internal representation of the Bezier curve data is an array of path data.

Each path holds it's:
  - calculated path points
  - control points
  - number of points on path
  - is path active

  Example JSON:

```
{
  // array of bezier curve data
  paths: [
    {
      // array of calculated path points
      path: [
        {x: 50, y: 50}, ...
      ],
      // each control point holds name and a control point position
      controlPoints: {
        start: {name: 'start', point: {x: 50, y:50}},
        startControl: {name: 'startControl', point: {x: 50, y:50}},
        finish: {name: 'finish', point: {x: 50, y:50}},
        finishControl: {name: 'finishControl', point: {x: 50, y:50}}
      },
      // number of points between start and finish
      pathPoints: 100,
      // is path active? - only one path can be active
      active: true
    },
    .... more path/control point objects ...
  ],
  // dimensions of display area
  width: 540,
  height: 960,
  // animation status
  animation: {
    animating: true,
    nextIndex: 8,
    position: {
        x: 24,
        y: 32
    }
}
```


Detailed exmaple

```
{
  paths: [
    {
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
      pathPoints: 100,
      active: true
    },
    {
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
      pathPoints: 100,
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
