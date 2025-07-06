import {Link} from "react-router-dom"
import HeartIcon from "./HeartIcon";

const Product = ({product}) => {
    return <div className="w-[20rem] ml-[2rem] p-3 relative">
        <div className="relative">
            <img src={product.image} alt={product.name}  className="w-[20rem] rounded"/>
            <HeartIcon product={product} />
        </div>

        <div className="p-4">
            <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between  item-center">
                <div className="text-lg text-white">{product.name}</div>
                <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">Ksh{product.price}</span>
            </h2>
            </Link>
        </div>
    </div>
}

export default Product;