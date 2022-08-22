import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postDog, getTemperaments} from '../../actions/index';
import { useDispatch, useSelector } from "react-redux";
import s from './CreateDog.module.css'

function validate(input){
    let errors = {};
    let exp = /^[a-zA-Z ]+$/gm;
    if(!input.name){
                errors.name = "Nombre de raza es requerido";
            }
            else if (!exp.test(input.name) ){
                errors.name = 'No se admiten caracteres especiales'
            }
            else if (input.name.length > 50 ){
                errors.name = 'Máximo 50 caracteres'
            }
        
            if (!input.image) {
                errors.image = "Imagen es requerido"
            }
        
            if (!input.lifeSpan) {
                errors.lifeSpan = 'Esperanza de vida es requerido'
            } else if (input.lifeSpan < 1 || input.lifeSpan > 20) {
                errors.lifeSpan = 'Elija entre 1 y 20 años'   
            }
        
            if (!input.minWeight) {
                errors.minWeight = 'Peso Mínimo es requerido'
            } else if (Number(input.minWeight) <= 0 || Number(input.minWeight >= 100)) {
                errors.minWeight = 'Elija entre 0 a 100kgs'    
            }
        
            if (!input.maxWeight) {
                errors.maxWeight = 'Peso Máximo es requerido'
            } 
            else if (Number(input.maxWeight < input.minWeight)) {
                errors.maxWeight = 'Peso Máximo debe ser mayor o igual a Peso Mínimo'
            }    
            else if (Number(input.maxWeight) <= 0 || Number(input.maxWeight > 100)) {
                errors.maxWeight = 'Elija entre 0 a 100kg'
            }
        
            if (!input.minHeight) {
                errors.minHeight = 'Altura Mínima es requerido'
            } else if (Number(input.minHeight) <= 0 || Number(input.minHeight >= 100)) {
                errors.minHeight = 'Elija entre 0 a 100cm'    
            }
        
            if (!input.maxHeight) {
                errors.maxHeight = 'Altura Máxima es requerido'
            } 
            else if (Number(input.maxHeight < input.minHeight)) {
                errors.maxHeight = 'Altura Máxima debe ser mayor o igual a Altura Mínima'
            }    
            else if (Number(input.maxHeight) <= 0 || Number(input.maxHeight > 100)) {
                errors.maxHeight = 'Elija entre 0 a 100cm'
            }
        
            if (!input.temperament.length){
                errors.temperament="Elija mas de un temperamento"
            }

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
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
    }))
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
        <div className={s.fondo} >
            <div className={s.contenedor} >
            <h1 className={s.titulo} >Crear nueva raza</h1>
            <form  onSubmit={e => handleSubmit(e)}>
                <div>
                    <label  >Raza: </label>
                    <input
                    type= 'text'
                    value={input.name}
                    name='name'
                    onChange={(e) => handleChange(e)}
                    />
                    <div className={s.alerta} >
                    {errors.name &&(<p>{errors.name}</p>)}
                    </div>
                </div>
                <div>
                <label>Imagen: </label>
                    <input
                    type= 'url'
                    value={input.image}
                    name='image'
                    onChange={(e) => handleChange(e)}
                    />
                    <div className={s.alerta} >
                    {errors.image &&(<p>{errors.image}</p>)}
                    </div>
                </div>
                <div>
                <label>Esperanza de vida: </label>
                    <input
                    type="number"
                    value={input.lifeSpan}
                    name='lifeSpan'
                    onChange={(e) => handleChange(e)}
                    />
                    <div className={s.alerta} >
                    {errors.lifeSpan &&(<p>{errors.lifeSpan}</p>)}
                    </div>
                </div>                
                <div>
                <label>Peso Minimo: </label>
                    <input
                    type= 'number'
                    value={input.minWeight}
                    name='minWeight'
                    onChange={(e) => handleChange(e)}
                    />
                    <div className={s.alerta} >
                    {errors.minWeight &&(<p>{errors.minWeight}</p>)}
                    </div>
                </div>
                <div>
                <label>Peso Maximo: </label>
                    <input
                    type= 'number'
                    value={input.maxWeight}
                    name='maxWeight'
                    onChange={(e) => handleChange(e)}
                    />
                    <div className={s.alerta} >
                    {errors.maxWeight && (<p>{errors.maxWeight}</p>)}
                    </div>
                </div>
                <div>
                <label>Altura Minima: </label>
                    <input
                    type= 'number'
                    value={input.minHeight}
                    name='minHeight'
                    onChange={(e) => handleChange(e)}
                    />
                    <div className={s.alerta} >
                    {errors.minHeight &&(<p>{errors.minHeight}</p>)}
                    </div>
                </div>
                <div>
                <label>Altura Maxima: </label>
                    <input
                    type= 'number'
                    value={input.maxHeight}
                    name='maxHeight'
                    onChange={(e) => handleChange(e)}
                    />
                    <div className={s.alerta} >
                    {errors.maxHeight && (<p>{errors.maxHeight}</p>)}
                    </div>
                </div>
                <label>Temperamentos: </label>
                <select  onChange={(e) => handleSelect(e)}>
                    {temperaments.map((el) => (
                    <option value={`${el.id},${el.name}`} key={el.id}>{el.name}</option>))}
                </select>
                {errors.temperament &&(
                    <p className={s.alerta} >{errors.temperament}</p>
                )}
                <br/>
                {input.temperament.map(el =>
                    <div className={s.temps}>
                        <button type="reset" onClick={() => handleDelete(el)}> {el.name} X</button>
                    </div>
                    )}
                  <br/>  
                <button className={s.crear}  type="submit">Crear</button>
            </form>
            </div>
            <Link to='/home'><button className={s.atras} >Volver al inicio</button></Link>

        </div>
    )

}