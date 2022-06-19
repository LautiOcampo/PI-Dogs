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

export function getName(name){
    return async function(dispatch){
        try {
        var json = await axios("http://localhost:3001/dogs?name=" + name);
        return dispatch({
            type: 'GET_NAME',
            payload: json.data
        })    
    }
    catch(error) {
        console.log(error);
        // alert ("Raza no encontrada")
    } 
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

export function postDog(payload){
    return async function(dispatch){
        let json = await axios.post('http://localhost:3001/dogs', payload);
        console.log(json)
        return json;
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