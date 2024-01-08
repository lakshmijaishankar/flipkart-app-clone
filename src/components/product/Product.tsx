import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { TiStar } from 'react-icons/ti';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/storeHook';
import {
    addCompareProduct,
    removeCompareProduct,
} from '../../redux/silce/comparePrdSlice';
import {
    compareIsChecked,
    compareIsUnChecked,
} from '../../redux/silce/hasMorePrdSlice';
import { ProductObjectKey } from '../../redux/silce/productSlice';
import CompareProduct from '../compareproduct/CompareProduct';
import './Product.css';

type ProductProps = {
    prdouctData?: ProductObjectKey[];
};

const Product = ({ prdouctData }: ProductProps) => {
    const dispatch = useAppDispatch();
    const { hasMorePrdItems } = useAppSelector((state) => state.hasMorePrdRed);
    const { itemCount } = useAppSelector((state) => state.comparePrdRed);

    const handleCompareToProduct = (
        e: ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        const product = hasMorePrdItems.filter((prd) => prd.id === id);
        if (e.target.checked) {
            dispatch(addCompareProduct(product[0]));
            dispatch(compareIsChecked(id));
        } else {
            dispatch(removeCompareProduct({ id: id }));
            dispatch(compareIsUnChecked(id));
        }
    };
    return (
        <>
            {prdouctData?.map((product) => {
                return (
                    <li className="product_card " key={product.id}>
                        <Link to={`/productdetails/${product.id}`}>
                            <figure className="product-image">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    loading="lazy"
                                    className="product-img  "
                                />
                            </figure>
                        </Link>
                        <h3 className="product_title ">{product.title}</h3>
                        <div className="product_price flex items-center">
                            <LiaRupeeSignSolid />
                            <span>{product.price}</span>
                        </div>
                        <div className="product_rating ">
                            <span className="text-[0.7rem]">
                                {Math.round(product.rating)}
                            </span>
                            <TiStar className="mb-[0.1rem]" />
                        </div>
                        <form className="product-compare-checkbox ">
                            <input
                                type="checkbox"
                                className="h-4 w-5 rounded-full"
                                onChange={(e) =>
                                    handleCompareToProduct(e, product.id)
                                }
                                checked={product.isChecked ? true : false}
                            />
                            <label className="ms-1 text-[0.75rem]">
                                Add to Compare
                            </label>
                        </form>
                    </li>
                );
            })}
            {itemCount !== 0 && <CompareProduct />}
        </>
    );
};

export default Product;

/* const handleInterSect = (enteries: IntersectionObserverEntry[]) => {
    let intersecting = enteries[0];
    if (intersecting.isIntersecting) {
      console.log(liElementRef.current);
    }
  };

  useEffect(() => {
    let observer = new IntersectionObserver(handleInterSect);
    if (liElementRef.current) {
      observer.observe(liElementRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []); */
