import axios from "axios";

/*
    emulando la bd
       aqui en el service se conecta a la base de datos con axios
        de una funcion asincrona
        instalamos axios 
        npm i axios
*/

    const initProducts = [
        {
             id:1,
             name: 'Monitor Samsung 70',
             price: 500,
             description: 'Monitor sm'
        },
        {
            id:2,
            name: 'IPhone 14',
            price: 800,
            description: 'Apple'
        }
        
    ];

    //ruta 
    const baseUrl = 'http://localhost:8080/products';

    //va al backend y hace la consulta al bd
    export const listProduct = () => {
        return initProducts;
}

//axios hace una peticion asincrona
//axios es una promesa entonces ponemos await y ponemos asyn en la funcion
//implementamos esta funcion en ProductApp
export const findAll = async () => {
    try{
        const response = await axios.get(baseUrl);
        return response;

    } catch (error) {
        console.log(error);
    }
    //regresa una lista nula
    return null;
}


/*
  en el create pasamos el objeto producto lo desestructuramos y
  lo pasamos el name, description, price y en pasamos cada uno de los objetos
  como segundo parametro el objeto en cuerpo del RequestBody
  cuando se llama igual el atributo con el valor lo abreviamos
  y ponemos el await antes del post entonces ponemos el async

*/
export const create = async ({name, description, price}) => {
    try{
     const response = await axios.post(`${baseUrl}`, {
        name,
        description,
        price
        });
        return response;

    }catch (error) {
        console.log(error);
    }
    //undefined por es un solo objeto
    return undefined;
}



export const update = async ({id, name, description, price}) => {
    
    try{
    //const response = await axios.put(baseUrl +'/'+ id, {
        //de otra forma `${variable}/${id}`
    const response = await axios.put(`${baseUrl}/${id}`, {
        name,
        description,
        price
     });
     return response;
    }catch (error){
        console.log(error);
    }
   return undefined;
}

export const remove = async(id) => {
    try{
        await axios.delete(`${baseUrl}/${id}`);

    }catch (error){
        console.log()
    }
}