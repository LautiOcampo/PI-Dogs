import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var info = await axios.get('/dogs',{
        });
        return dispatch({
            type: 'GET_DOGS',
            payload: info.data
        })
    }
}

export function getTemperaments (){
    return async function (dispatch){
        var json = await axios("/temperaments",);
        return dispatch ({
            type: 'GET_TEMPERAMENT', 
            payload: json.data
        })
    }
}

export function getName(name){
    return async function(dispatch){
        try {
        var json = await axios("/dogs?name=" + name);
        return dispatch({
            type: 'GET_NAME',
            payload: json.data
        })    
    }
    catch(error) {
        alert ("Raza no encontrada")
    } 
}
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get("/dogs/" + id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        }
        catch(error){
            console.log(error);
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
        try{
            const json = await axios.post('/dogs', payload);
            return json
        }
        catch(error){
            console.log(error)
        }
    }
};