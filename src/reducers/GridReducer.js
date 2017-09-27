import { fromJS } from 'immutable'

const initialState = fromJS({
   path: [
       {
           x: 0,
           y: 0
        },
       {
           x: 100,
           y: 200
       },
       {
           x: 300,
           y: 400
       },
       {
           x: 400,
           y: 450
       },
       {
           x: 200,
           y: 250
       },
       {
            x: 500,
            y: 500
        },
        {
            x: 300,
            y: 100
        }
   ]
})

const GridReducer = (state = initialState, action) => {
    
    console.log(action)

    switch (action.type) {
           
        default:
            return state
    }
}

export default GridReducer