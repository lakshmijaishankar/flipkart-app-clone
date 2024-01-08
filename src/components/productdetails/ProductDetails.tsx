import { /* React,  */ useEffect, /* useRef */ useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/storeHook';
import { cartIsToOpen } from '../../redux/silce/cartSlice';
import { BsCurrencyRupee } from 'react-icons/bs';
import {
    fetchProductDetails,
    removeSelectedProduct,
} from '../../redux/silce/productSlice';
import { addToCart } from '../../redux/silce/cartSlice';
import { IoMdStar } from 'react-icons/io';
import ReactImageMagnify from 'react-image-magnify';
import DetailsLoading from '../loading/detailsloading/DetailsLoading';
import './ProductDetails.css';
import Skeleton from 'react-loading-skeleton';

/* type Coordinate = {
    x: number;
    y: number;
}; */
const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { prdDetails, loading } = useAppSelector((state) => state.prdRedu);
    const { cartItem } = useAppSelector((state) => state.cartRedu);
    const [goingToCart, setGoingToCart] = useState(false);
    const [showImageMaginifier, setShowImageMaginifier] = useState<number>(
        window.innerWidth
    );
    /* const [imageSrc, setImageSrc] = useState<string>('');
    const imgRef = useRef<HTMLImageElement>(null);
    const [axis, setAxis] = useState<Coordinate>({} as Coordinate); */

    const handleAddToCart = () => {
        setGoingToCart(true);
        setTimeout(() => {
            setGoingToCart(false);
            dispatch(addToCart(prdDetails[0]));
        }, 300);
    };

    const isProductInCart = (): boolean => {
        return cartItem.some((item) => item.id === prdDetails[0].id);
    };

    useEffect(() => {
        if (id !== undefined) {
            dispatch(fetchProductDetails(id));
        }
        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [id]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setShowImageMaginifier(window.innerWidth);
        });
    }, []);

    /* const handleMouseEvent = (event: React.MouseEvent<HTMLImageElement>) => {
        if (imgRef.current) {
            setImageSrc(imgRef.current.src);
            const { left, top, width, height } =
                imgRef.current.getBoundingClientRect();
            let x = event.clientX - left;
            let y = event.clientY - top;
            let percentageX = (x / width) * 100;
            let percentageY = (y / height) * 100;
            setAxis({ x: percentageX, y: percentageX });
        }
        console.log(event.clientX);
    }; */

    const renderProductDetails = () => {
        return prdDetails.map((details) => {
            return (
                <section className="productdetails_container " key={details.id}>
                    <aside className="productdetail_image basis-[442px] ">
                        <figure className="relative flex justify-center p-1">
                            {showImageMaginifier > 768 ? (
                                <ReactImageMagnify
                                    shouldUsePositiveSpaceLens={true}
                                    smallImage={{
                                        src: details.images[0],
                                        isFluidWidth: true,
                                    }}
                                    largeImage={{
                                        src: details.images[0],
                                        alt: details.title,
                                        width: 950,
                                        height: 880,
                                    }}
                                    enlargedImageClassName={
                                        'sideimage-of-hovered max-w-[none] '
                                    }
                                    enlargedImageContainerStyle={{
                                        border: 0,
                                        backgroundColor: 'white',
                                        boxShadow:
                                            '0px 0px 13px 0px rgb(0 0 0 / 10%)',
                                        left: '430px',
                                    }}
                                    imageClassName="aspect-square"
                                    enlargedImageContainerDimensions={{
                                        width: 750,
                                        height: '100%',
                                    }}
                                />
                            ) : (
                                <img
                                    src={details.images[0]}
                                    alt={details.title}
                                    className="aspect-square"
                                />
                            )}
                        </figure>
                    </aside>
                    <section className="productdetails">
                        <header>
                            <h1 className="text-[1.2rem] first-letter:capitalize">
                                {details.title} ({details.brand})
                            </h1>
                        </header>
                        <article>
                            <p className="product_details_description">
                                {details.description}
                            </p>
                        </article>
                        <div className="product_details_rating flex">
                            <div className="flex items-center rounded bg-[#388e3c] px-1 py-[1px] text-[0.8rem] text-white">
                                {details.rating}
                                <IoMdStar />
                            </div>
                        </div>
                        <div className="product_details_discount">
                            discount:
                            {details.discountPercentage}
                        </div>
                        <div className="product_details_price flex items-center">
                            <BsCurrencyRupee className="text-[1.3rem]" />
                            {details.price}
                        </div>
                        <footer className="flex">
                            {isProductInCart() ? (
                                <button
                                    className="w-[12rem] bg-[#ff9f00] p-[10px] text-white tablet:w-[8rem] tablet:p-[7px]"
                                    onClick={() => {
                                        dispatch(cartIsToOpen());
                                    }}
                                >
                                    Go To Cart
                                </button>
                            ) : (
                                <button
                                    className="w-[12rem] bg-[#ff9f00] p-[10px] text-white tablet:w-[8rem] tablet:p-[7px]"
                                    onClick={handleAddToCart}
                                >
                                    {goingToCart ? (
                                        <span>Going TO CART</span>
                                    ) : (
                                        'ADD TO CART'
                                    )}
                                </button>
                            )}
                        </footer>
                        {/* <ZoomImage src={imageSrc} x={axis.x} y={axis.y} /> */}
                    </section>
                </section>
            );
        });
    };

    const renderProductDetailsLoading = () => {
        return (
            <section className="productdetails_loading flex h-[calc(100vh-91.19px)] grow justify-center gap-x-3 bg-white pt-6 tablet:p-3">
                <aside className="productdetail_image flex-[0_0_442px] tablet:flex-[0_0_300px] ">
                    <DetailsLoading
                        children={
                            <Skeleton
                                count={1}
                                className="loading-image rounded-0 aspect-square shadow-lg"
                            />
                        }
                    />
                </aside>
                <section className="mt-8 basis-[60%] space-y-3">
                    <div role="header">
                        <DetailsLoading
                            children={
                                <Skeleton
                                    count={1}
                                    height={35}
                                    width={350}
                                    className="shadow-lg"
                                />
                            }
                        />
                    </div>
                    <div role="article">
                        <DetailsLoading
                            children={
                                <Skeleton
                                    count={1}
                                    className="h-[25px] w-[650px] shadow-lg tablet:h-[21px] tablet:w-[400px]"
                                />
                            }
                        />
                    </div>
                    <div>
                        <DetailsLoading
                            children={
                                <Skeleton
                                    count={1}
                                    height={25}
                                    width={80}
                                    className="shadow-lg"
                                />
                            }
                        />
                    </div>
                    <div role="button">
                        <DetailsLoading
                            children={
                                <Skeleton
                                    count={1}
                                    className="h-[55px] w-[150px] rounded-none shadow-lg tablet:h-[40px] tablet:w-[140px]"
                                />
                            }
                        />
                    </div>
                </section>
            </section>
        );
    };
    return (
        <>
            {/* {loading && (
        <div className="product_loading absolute inset-0 flex items-center justify-center">
          <CgSpinner className="text-[3rem] text-[#2874f0] animate-spin" />
        </div>
      )} */}
            {prdDetails.length > 0 && renderProductDetails()}
            {loading && renderProductDetailsLoading()}
        </>
    );
};

export default ProductDetails;
