import { PropTypes } from "prop-types";
import { ProductDetail } from "./ProductDetail";

//pasando las propiedades de Product del componente padre al componente hijo
//con prods que es el products y el handlerRemove
export const ProductGrid = ( {handlerProductSelected, handlerRemove,  products = [] } ) => {
return(
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>price</th>
                    <th>update</th>
                    <th>remove</th>
                </tr>
            </thead>
            <tbody>
                 {products.map(product => {
                return <ProductDetail handlerProductSelected={handlerProductSelected}
                handlerRemove={handlerRemove} 
                product={product} key={product.name} />
                })}

            </tbody>
        </table>
        
    )
 } 

//ponemos array porque el arreglo lo toma como objeto
//para validar los prop
//antes instalamos  npm i prop-types
ProductGrid.propTypes = {
    products: PropTypes.array.isRequired,
    handlerRemove: PropTypes.func.isRequired,
    handlerProductSelected: PropTypes.func.isRequired
}