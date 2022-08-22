import React from 'react';
import s from "./Card.module.css"

function Card ({name, image,temperament, minWeight, maxWeight, minHeight, maxHeight, id}) {
    return(
        <div className={s.card}>
            <h1 className={s.titulo} >{name}</h1>
            <img className={s.image} src={image} alt='img not found' width='230px' height='190px'/>
            <h3 className={s.temperament} >Temperament:</h3>
            <p className={s.infotemp} >{Array.isArray(temperament)? temperament.join(', ' ) : temperament}</p>             
            <p className={s.heightweight} >Min Height: {minHeight} cm - Max Height: {maxHeight} cm</p>
            <p className={s.heightweight} >Min Weight: {minWeight} kg - Max Weight: {maxWeight} kg</p>
        </div>
    )
}

export default Card
