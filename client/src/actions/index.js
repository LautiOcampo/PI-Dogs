import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var info = await axios.get('http://localhost:3001/dogs',{
        });
        return dispatch({
            type: 'GET_DOGS',
            payload: info.data
        })
    }
}

export function getTemperaments (){
    return async function (dispatch){
        var json = await axios("http://localhost:3001/temperaments",);
        return dispatch ({
            type: 'GET_TEMPERAMENT', 
            payload: json.data
        })
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function filterByTemperaments (payload) {
    console.log(payload)
    return {
        type: "FILTER_BY_TEMPERAMENTS",
        payload
    }
}

export function filterCreated (payload) {
    return{
        type: "FILTER_CREATED",
        payload
    }
}


//////////Del seba:

// export function getDogs() {
//     return  async function (dispatch) {
//         try{
//             var info= await axios("http://localhost:3001/dogs")
//                 return dispatch ({
//                     type: 'GET_ALL_DOGS',
//                     payload: info.data
//                 })
            
// }
//     catch (error){
//     console.log(error)
//     }
//   }
// }