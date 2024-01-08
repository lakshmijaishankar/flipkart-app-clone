import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductObjectKey } from '../../redux/silce/productSlice';
import { Link } from 'react-router-dom';
import { TiStar } from 'react-icons/ti';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import './MyComponent.css';
import LoadingItem from '../loading/loadingitem/LoadingItem';

const MyComponent = () => {
    const [skip, setSkip] = useState<number>(0);
    const [hasMorePrd, setHasMorePrd] = useState<ProductObjectKey[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        const fetchMoreProducts = async () => {
            try {
                const response = await axios.get(
                    `https://dummyjson.com/products?skip=${skip * 10}&limit=${
                        1 * 10
                    }`
                );
                let productLength: number = response.data.products.length;
                console.log(productLength);
                if (productLength !== 0) {
                    setHasMorePrd([...hasMorePrd, ...response.data.products]);
                } else {
                    setHasMore(!hasMore);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchMoreProducts();
    }, [skip]);

    const handleHasMoreProducts = () => {
        setSkip((preSkip) => preSkip + 1);
    };

    const renderProducts = (): JSX.Element => {
        return (
            <div className="productlist_conainer relative">
                <ul className="grid grid-cols-[repeat(5,minmax(auto,250px))] justify-evenly gap-1 p-3">
                    {hasMorePrd.map((product) => {
                        return (
                            <li
                                className="product_card bg-white p-2 shadow-md"
                                key={product.id}
                            >
                                <Link to={`/productdetails/${product.id}`}>
                                    <figure className="product-image h-[192px] overflow-hidden rounded-md">
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            loading="lazy"
                                            className="h-[100%]"
                                        />
                                    </figure>
                                </Link>
                                <h3 className="product_title line-clamp-1 text-[0.8rem] font-[400] capitalize">
                                    {product.title}
                                </h3>
                                <div className="product_price flex items-center">
                                    <LiaRupeeSignSolid />
                                    <span>{product.price}</span>
                                </div>
                                <div className="product_rating inline-flex items-center rounded bg-[#388e3c] px-[6px] py-[2px] text-white">
                                    <span className="text-[0.7rem]">
                                        {product.rating}
                                    </span>
                                    <TiStar className="mb-[0.1rem]" />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };
    return (
        <>
            <InfiniteScroll
                dataLength={hasMorePrd.length}
                next={handleHasMoreProducts}
                hasMore={/* hasMore */ true}
                children={renderProducts()}
                loader={<LoadingItem />}
                hasChildren={true}
            >
                {/* {renderProducts()} */}
            </InfiniteScroll>
        </>
    );
};

export default MyComponent;
