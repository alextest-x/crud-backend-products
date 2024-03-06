import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { create, findAll, remove, update } from "../services/ProductService";
import { ProductForm } from "./ProductForm";
import { ProductGrid } from "./ProductGrid";


export const ProductApp = ( { title }) => {

    //const [products, setProduct] = useState(initProducts)
    //setProduct le pasamos los datos a useState([]); 
    const [products, setProducts] = useState([]);

    const [productSelected, setProductSelected ]= useState({
         id:0,
         name:'',
         description: '',
         price: ''
        })

        /*
        //funcion intermedia la convertimos en asincrona
        //y le ponemos el setProducts del hook useEffect
        //el result es un axion response porque tiene la data el json
        */
        const getProducts = async () => {
          const result = await findAll();
          console.log('getProducts: '+result);
          setProducts(result.data._embedded.products);

          //setProducts(result.data.embedded.products);
        
        }

        /*
        //un useEffect no puede ser asincono entonces no podemos usar await 
        //creamos una funcion getProducts()
        //asincrona donde obtiene la lista de productos con el await
        //console.log(result);
        */
        useEffect(() => {
            getProducts();
        }, []);

        /*
        //creamos una funcion intermedia para poner el async
        //porque no lo podemos poner el useEffect()
        // useEffect ( () => {
        //   const result = await findAll();
        //   setProducts(result);
        // }, []);
        */
    
        /*
        //la comentamos porque en esta ponemos la funcion findAll
          useEffect ( () => {
          const result = listProduct();
          setProducts(result);
         }, []);  //los corchetes vacios solo corre una vez
        */

   /*
   //para poner los datos en la pagina cuando registramos un producto
   //(product) viene del formulario
   //setProducts [...products, se mantine los elemnto de products y se agrega un nuevo objeto 
   //con desestructuracion {...product}] que no se modificar el estado actual solo el nuevo 
   //pasamos el handler en   <ProductForm />  
   // <ProductForm handlerAddProduct= {handlerAddProduct}/> le pasamos al componente hijo
   //en ProductForm.jsx como un props
   */
    
   const handlerAddProduct = async (product) => {

      //comentamos porque vamos a pasar a actualizar los campos del formulario
      //setProducts([ ...products, { ...product}]);
      //se encuentra el id lo actualiza sino lo registra uno nuevo
        
        if(product.id > 0) {
            console.log('product.id > 0 actualiza = ' + product.id );
            //aqui actualizamos a nivel de backend
            //actualizamos pasamos el objeto producto que lo recibe como argumento
            //que ya viene desestructurado y ponemos un await en una variable response
            //y lo pasamos al return con response.date porque viene del backend 
            //actualizamos con los datos de la bd response.date
            const response = await update(product);
          
            // si lo encuentra lo actualiza con el map a nivel del frontend
            setProducts(products.map(prodActualiza => {
            //if(prodActualiza.id == product.id){

              if(prodActualiza.id == response.data.id){
                console.log('response.data.id: ' + response.data.id);
              //return {...product}  //regresamos el nuevo objeto lo expandemos
              return { ...response.data}
         }
            //sino lo encuentra es porque es un nuevo registro
            return prodActualiza;
    }));
    }else {
      console.log('product.id = ' + product.id + ' : ' + ' Registra uno nuevo');
      const response = await create(product);
      setProducts([...products,  {...response.data}]);
       
      //setProducts([...products, { ...product, id: new Date().getTime() }]);
   }
}

    //para eliminar el producto de la bd poner el id
    const handlerRemoveProduct = (id)=> {
        //console.log(id);
        console.log('remove : ' + id);

        //ponemos el remove para que remueva de la bd
        remove(id);
        //traemos el arreglo y lo quitamos 
        //filter regresa un nueva arreglo es inmutable
        //filter llama una funcion predicate esuna funcion booleana 
        setProducts(products.filter( product => product.id != id ));
    }

    //...product esparcimos los atributos del estado useState
    const handlerProductSelected = (product) => {
         console.log(product);
         setProductSelected({ ...product});
    }


    /*
    {products.map() }
        .map obtiene cada elemento y lo modifica con el objeto products en html
        key es un elemnto unico como el id product.name o product.id
    
        <ProductGrid products={products}/>
        pasamos la tabla a ProductGrid y con las llaves le pasamos el parametro 
        products que son las propiedades que pasamos del componente padre
        al componente hijo 
       
        */

    return(
       <div className="container my-4">
        <h2> { title } </h2>
            <div className="row">
	    
	     <div className="col">

                  <ProductForm handlerAdd= {handlerAddProduct} productSelected={productSelected} />
                </div>

        <div className="col">
            {
            products.length > 0 ? <ProductGrid products = {products} 
            handlerRemove={handlerRemoveProduct} 
            handlerProductSelected={handlerProductSelected}/>
            : <div className="alert alert-warning"> No hay Productos en el sistema </div>
                
       }
          </div>
        </div>
    </div>
    )
}



ProductApp.propTypes = {
    title: PropTypes.string.isRequired
 }
