import React from 'react';

function Card ({name, img,temperament, temperaments, minWeight, maxWeight, minHeight, maxHeight, id}) {
    return(
        <div>
            <h1>{name}</h1>
            <img src={img} alt='img not found' width='280px' height='210px'/>
            <h3>Temperament:<br/></h3> <h4>{temperaments}{Array.isArray(temperament)? temperament.join(', ' ) : temperament}</h4>             
            <h4>Min Height: {minHeight} cm - Max Height: {maxHeight} cm</h4>
            <h4>Min Weight: {minWeight} kg - Max Weight: {maxWeight} kg</h4>
        </div>
    )
}

export default Card
