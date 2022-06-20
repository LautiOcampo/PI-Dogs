const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Dog, Temperament} = require('../db')

const { YOUR_API_KEY } = "697ded3d-3743-42b6-a3ee-b5907c4039f";
// const {YOUR_API_KEY} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            lifeSpan: el.life_span,
            minWeight: el.weight.metric.slice(0, 2),
            maxWeight: el.weight.metric.slice(4),
            minHeight: el.height.metric.slice(0, 2),
            maxHeight: el.height.metric.slice(4),
            temperament: el.temperament,
            image: el.image.url,
        };
    });
    return apiInfo;
};

// const getDbInfo = async () => {
//     return await Dog.findAll({
//         include: {
//             model: Temperament,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             },
//         }
//     })
// }

const getDbInfo = async () => { //saco toda la info de mi base de datos en el model Dogs e incluyo el model Temperament
    const DbInfo = await Dog.findAll({
        include: [{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }]
    });
     return DbInfo;
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/dogs', async (req,res, next) => {
try{
    const name = req.query.name
    let allDogs = await getAllDogs();
    if (name){
        let dogName = await allDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) : 
        res.status(404).send("No encontramos alguna raza con este nombre")
    }
    else{
        res.status(200).send(allDogs)
    }
}catch(error){
    next(error)
}
})


router.get('/temperaments', async(req,res) => {
try{
    const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)

    const temperament = temperamentApi.data.map(el => el.temperament).join(", ").split(", ")

    temperament.forEach(el=> {
        Temperament.findOrCreate ({
            where:{name:el}
        })
    });
    const dogTemperament = await Temperament.findAll();
    res.json(dogTemperament)

    }
    catch(error){
        console.log(error)
    }
})



router.post('/dogs',async(req,res,next)=>{
    let {
        name,
        lifeSpan,
        minWeight,
        maxWeight,
        minHeight,
        maxHeight,
        image,
        temperament
    }=req.body;   //esta variable tendra todo lo que me pide por body
    
    if (!name){
        return res.json({error: "Name is required"});
    }

    const existe = await Dog.findOne({ where: { name: name } });    
    if (existe) return res.json({ error: "The dog already exists" });

    try{
        let dogCreate = await Dog.create({
            name,
            minWeight,
            maxWeight,
            minHeight,
            maxHeight,
            lifeSpan,
            image,
        })

        dogCreate.addTemperament(temperament);
        res.send("Dog add successfully!");
    }catch(error){
        next(error)
    }
});



router.get('/dogs/:id', async(req, res) => {
    const id = req.params.id;
    const dogsTotal = await getAllDogs();
    if(id){
        let dogId = await dogsTotal.filter(el => el.id == id )
        dogId.length?
        res.status(200).json(dogId):
        res.status(404).json("No se encontro el perro")
    }
})


/////////////////////// Esta ruta es del Seba, tambien anda
// router.get('/temperaments',async(req,res)=>{
//     try{
//         let tempeSet = new Set();
//         const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)

//         temperamentApi.data.forEach(dog => {
//             let tempArray = dog.temperament ? dog.temperament.split(', ') : []
//             tempArray.forEach(temperament => tempeSet.add(temperament))

//         })
//         const tempe = Array.from(tempeSet)

//         tempe.forEach(async(elem)=>{
//             await Temperament.findOrCreate({
//                     where:{
//                         name:elem,
//                     }
//                 });
//         });

//         const temperamentDog = await Temperament.findAll();
//         res.json(temperamentDog);
        
//     }catch (error){
//         console.log(error);
//     }
// });




// router.get('/dog/:id',async(req,res,next)=>{
//     try{
//         const {id}=req.params;
//         let dogsTotal = await getDogs();

//         if(id){
//             let idDog = await dogsTotal.filter(dog => id.length>8 ? dog.id === id : (dog.id)===parseInt(id));
//             idDog ? res.status(200).send(idDog) : res.status(404).send("Dog not found");
//         }
//     }catch (error){
//         next(error)
//     }
// });


module.exports = router;
