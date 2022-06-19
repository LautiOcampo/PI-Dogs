import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postDog, getTemperaments} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";

export default function createDog(){
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)

    const[input, setInput] = useState({
        name:"",
        minHeight:"",
        maxHeight:"",
        minWeight:"",
        maxWeight:"",
        lifeSpan:"",
        img:"",
        temperament:[]
    })

    useEffect(() => {
        dispatch(getTemperaments());
    },[]);

    return(
        <div>
            <Link to='/home'><button>Volver al inicio</button></Link>
            <h1>Crear nueva raza</h1>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input
                    type= 'text'
                    value={input.name}
                    name='name'
                    />
                </div>
                <div>
                <label>Imagen:</label>
                    <input
                    type= 'url'
                    value={input.img}
                    name='img'
                    />
                </div>                
                <div>
                <label>Peso Minimo:</label>
                    <input
                    type= 'number'
                    value={input.minWeight}
                    name='minWeight'
                    />
                </div>
                <div>
                <label>Peso Maximo:</label>
                    <input
                    type= 'number'
                    value={input.maxWeight}
                    name='maxWeight'
                    />
                </div>
                <div>
                <label>Altura Minima:</label>
                    <input
                    type= 'number'
                    value={input.minHeight}
                    name='minHeight'
                    />
                </div>
                <div>
                <label>Altura Maxima:</label>
                    <input
                    type= 'number'
                    value={input.maxHeight}
                    name='maxHeight'
                    />
                </div>
                <select>
                    {temperaments.map((temp)=> (
                        <option value={temp.name}>{temp.name}</option>
                    ))}
                </select>
            </form>
        </div>
    )

}
