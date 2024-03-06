import { PropTypes } from "prop-types";


//le pasamos el handlerRemove de ProductGrid
export const ProductDetail = ( { handlerProductSelected, handlerRemove, product = {} }) => {

    //cuando obtenga de la bd el id
    //poner <button onClick= {() => handlerRemove(product.id)}

    return (

            <tr>
                <td>{ product.name }</td>
                <td>{ product.description }</td>
                <td>{ product.price }</td>

                <td>
                    <button className="btn btn-secondary btn-sm" onClick ={() => handlerProductSelected(product)} >
                        update
                    </button>
                </td>
        
                <td>
                    <button className="btn btn-danger btn-sm" onClick ={() => handlerRemove(product.id)} >
                        remove
                    </button>
                </td>
            </tr>
    )
}

//product = {}  pasa un arreglo entonces ponemos object

//propTypes valida  handlerRemove, product
ProductDetail.propTypes = {
    product: PropTypes.object.isRequired,
    handlerRemove: PropTypes.func.isRequired,
    handlerProductSelected: PropTypes.func.isRequired

}