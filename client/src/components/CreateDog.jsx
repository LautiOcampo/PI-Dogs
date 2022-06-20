import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postDog, getTemperaments} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";

function validate(input){
    let errors = {};
    let expression = /^[a-zA-Z ]+$/gm;
    if(!input.name){
        errors.name = "Se requiere un Nombre de Raza";
    }
    // else if (!expression.test(input.name) ){
    //     errors.name = 'Special Charactes are not supported'
    // }

    return errors
}

export default function CreateDog(){
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({});

    const[input, setInput] = useState({
        name:"",
        minHeight:"",
        maxHeight:"",
        minWeight:"",
        maxWeight:"",
        lifeSpan:"",
        image:"",
        temperament:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
    }))
        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, {id: e.target.value.split(",")[0], name: e.target.value.split(",")[1]}]
            // temperament: [...input.temperament, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postDog({
            ...input, 
            temperament: input.temperament.map( t => Number(t.id) )
        }))

        alert("Raza creada con exito")
        setInput({
        name:"",
        minHeight:"",
        maxHeight:"",
        minWeight:"",
        maxWeight:"",
        lifeSpan:"",
        image:"",
        temperament:[]
        })
        history.push("/home")
    }

    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)
        })
    }

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    return(
        <div>
            <Link to='/home'><button>Volver al inicio</button></Link>
            <h1>Crear nueva raza</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Raza:</label>
                    <input
                    type= 'text'
                    value={input.name}
                    name='name'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name &&(
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                <label>Imagen:</label>
                    <input
                    type= 'url'
                    value={input.image}
                    name='image'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                <label>Esperanza de vida:</label>
                    <input
                    type="number"
                    value={input.lifeSpan}
                    name='lifeSpan'
                    onChange={(e) => handleChange(e)}
                    />
                </div>                
                <div>
                <label>Peso Minimo:</label>
                    <input
                    type= 'number'
                    value={input.minWeight}
                    name='minWeight'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                <label>Peso Maximo:</label>
                    <input
                    type= 'number'
                    value={input.maxWeight}
                    name='maxWeight'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                <label>Altura Minima:</label>
                    <input
                    type= 'number'
                    value={input.minHeight}
                    name='minHeight'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                <label>Altura Maxima:</label>
                    <input
                    type= 'number'
                    value={input.maxHeight}
                    name='maxHeight'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <label>Temperamentos:</label>
                <select  onChange={(e) => handleSelect(e)}>
                    {temperaments.map((el) => (
                    <option value={`${el.id},${el.name}`} key={el.id}>{el.name}</option>))}
                    </select>
                {/* <ul><li>{input.temperament.map((el) => el.name + " ,")}</li></ul> */}
                {input.temperament.map(el =>
                    <div>
                        <p>{el.name}</p>
                        <button type="reset" onClick={() => handleDelete(el)}>X</button>
                    </div>
                    )}
                <button type="submit">Crear Raza</button>
            </form>
        </div>
    )

}
