import { useEffect, useState } from "react";

// hay que pasar los datos de initialDataForm
// al estado useState entonces le pasamos el atributo name a la variable del 
// const { name, description, price }= form;

const initialDataForm = {
    id: 0,
    name: '',
    description: '',
    price: ''
}


//handlerAdd() viene de Productapp para pasarlo com un props

export const ProductForm = ({ productSelected, handlerAdd}) => {

/*
    //obtener los datos para poblar el formulario entonces usamos el
    //el estado useState le pasamos la data inicial  que es initialDataForm
*/

   const [form, setForm ] = useState(initialDataForm);


   /*
   // destructuramos los valores del formulario de la data
   // para traer la variable de forma independiente (name) y no como de objeto (form.name) etc
   // en un conjunto de variables del contexto de la funcion initialDataForm
   // con el onchange cambiamos le valor en el event y con setForm lo modificamos
   // y con ...form le pasamos todos los dato del objeto form (la data del formulario)
   // mantenemos solo name en name: event.target.value
   //donde event tiene el nuevo valor 
   */

   /*
      event.preventDefault(); para que no haga el refresh en la pagina

   */

   const {id, name, description, price } = form;


   useEffect(() => {
    setForm(productSelected);
   }, [productSelected]);

    return(
        <form onSubmit={ (event) => {
            event.preventDefault();

            if(!name || !description || !price){
                alert ('Debe completar los datos del formulario')
                return;
            }

            //limpiando los datos del formulario
            //console.log(form);

            //aqui ponemos la funcion handler y pasamos el objeto form donde tiene el objeto product
            //es el name, decription y price
            handlerAdd(form);
            setForm(initialDataForm);
        }}>


        <div>
            <input 
            placeholder="Name"
            className="form-control my-3 w-70"
            name="name"
            value={name}
            onChange={(event) => setForm({
                ...form, 
                name: event.target.value
            })}
            />
        </div>

        <div>
            <input 
            placeholder="Description"
            className="form-control my-3 w-70"
            name="description"
            value={description}
            onChange={(event) => setForm({
                ...form, 
                description: event.target.value
            })}
            />
        </div>


        <div>
            <input 
            placeholder="Price"
            className="form-control my-3 w-70"
            name="price"
            value={price}
            onChange={(event) => setForm({
                ...form, 
                price: event.target.value
            })}
            />
        </div>
        <div>
            <button type = "submit" className="btn btn-primary">
               {id > 0 ? 'Update': 'Create'} 
            </button>
        </div>
        </form>
    )
}