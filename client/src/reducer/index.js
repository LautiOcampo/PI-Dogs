const initialState = {
    dogs : [],
    allDogs: [],
    temperaments: [],
    detail: []
}

function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_DOGS':
        return{
            ...state,
            dogs: action.payload,
            allDogs: action.payload
        }

        case 'GET_TEMPERAMENT':
            return {
                ...state,
                temperaments: action.payload
            }

        case 'GET_NAME':
            return{
                ...state,
                dogs: action.payload
            }

        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }

        case 'ORDER_BY_NAME':
            let ordenar = action.payload === 'az' ? state.dogs.sort(function(a,b){
                if (a.name > b.name){
                    return 1;
                }
                if (a.name < b.name){
                    return -1;
                }
                return 0;
            }):
            state.dogs.sort(function(a,b){
                if (a.name > b.name){
                    return -1;
                }
                if (a.name < b.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                dogs: ordenar
            }

        case 'ORDER_BY_WEIGHT':
            let ordenByWeight = action.payload === 'min' ? state.dogs.sort((a,b) => {
                return a.minWeight - b.minWeight
            }): 
            state.dogs.sort((a,b) => {
                return b.minWeight - a.minWeight
            })
            return{
                ...state,
                dogs: ordenByWeight
            }
         
        case "FILTER_BY_TEMPERAMENTS":
            const allDogs = state.allDogs
            const temperamentFilter = action.payload === 'All' ? allDogs :
            allDogs.filter((e)=> e.temperament?.includes(action.payload))
            return {
                ...state,
                dogs: temperamentFilter,
            }

        case "FILTER_CREATED":

            const statusFiltered2 = action.payload === "created" ? state.allDogs.filter(el => el.createdInDB) : state.allDogs.filter(el => !el.createdInDB)
            return{
                ...state,
                dogs: action.payload === "All" ? state.allDogs : statusFiltered2
            }
        
        case 'POST_DOG':
            return{
                ...state,
            }

        default: return state;

    }
}

export default rootReducer;
