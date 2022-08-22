import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDog, getDetail } from "../../actions";
import { useEffect } from "react";
import s from "./Detail.module.css";


export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const detailDog = useSelector((state) => state.detail)


    return(
        <div className={s.fondo}>
            {
                detailDog.length > 0 ?
                <div className={s.container} >
                    <h1 className={s.h1} >{detailDog[0].name} </h1>
                    <img src={detailDog[0].image} alt='img not found' width="330px" height="250px"  />
                    <h4 className={s.temperament} >Temperamentos: {detailDog[0].createdInDB ? detailDog[0].temperaments.map(el => el.name + (", ")) : detailDog[0].temperament + " "} </h4>
                    <h4>Peso: {detailDog[0].minWeight} kg - {detailDog[0].maxWeight} kg </h4>
                    <h4>Altura: {detailDog[0].minHeight} cm - {detailDog[0].maxHeight} cm </h4>
                    <h4>Esperanza de vida: {detailDog[0].lifeSpan}</h4>
                    {/* <h4>Origin:{detailDog[0].origin}</h4> */}
                    <Link to="/home">
                        <button className={s.button} >Volver al inicio</button>
                    </Link>
                </div>
                : <h2 className={s.cargando} >Cargando info...</h2>
            }

        </div>
    )

}