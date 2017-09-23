import { fromJS } from 'immutable'

const initialState = fromJS({
   path: [
       {
           x: 100,
           y: 200
       },
       {
           x: 300,
           y: 400
       },
       {
           x: 500,
           y: 750
       },
       {
           x: 1000,
           y: 200
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