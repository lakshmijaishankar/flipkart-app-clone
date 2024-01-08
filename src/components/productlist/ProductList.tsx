import { useEffect, useState, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    /* ProductObjectKey, */
    fetchProductList,
} from '../../redux/silce/productSlice';
import {
    fetchMoreProducts,
    clearHasMoreProducts,
} from '../../redux/silce/hasMorePrdSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/storeHook';
import { IoIosArrowDown } from 'react-icons/io';
import Product from '../product/Product';
import './ProductList.css';
import LoadingItem from '../loading/loadingitem/LoadingItem';
import { clearCompareProduct } from '../../redux/silce/comparePrdSlice';

const ProductList = () => {
    // const { loading, prdListData } = useAppSelector((state) => state.prdRedu);
    const [backToShow, setBackToShow] = useState<boolean>(false);
    const [animateBtn, setAnimateBtn] = useState<string>('');
    const [limit] = useState<number>(1);
    const [skip, setSkip] = useState<number>(0);
    const divRef = useRef(null) as any;
    const { hasMorePrdItems, /* loading, */ hasMore } = useAppSelector(
        (state) => state.hasMorePrdRed
    );
    const dispatch = useAppDispatch();

    const handleWindowEvent = () => {
        if (window.scrollY > 600) {
            setBackToShow(!backToShow);
            setAnimateBtn('animate_btn_bottom');
        } else {
            setAnimateBtn('animate_btn_top');
            setTimeout(() => {
                setBackToShow(false);
            }, 200);
        }
    };

    const handleHasMoreProducts = () => {
        setSkip((preSkip) => preSkip + 1);
    };

    useEffect(() => {
        dispatch(fetchProductList());
        window.addEventListener('scroll', handleWindowEvent);
        let { _infScroll } = divRef.current;
        console.log(_infScroll);
        _infScroll.removeAttribute('style');
        _infScroll.classList.replace(
            'infinite-scroll-component',
            'productlist-infinte-scroll-innercontainer'
        );
        _infScroll.parentElement.classList.replace(
            'infinite-scroll-component__outerdiv',
            'productlist-infinte-scroll-outercontainer'
        );
        return () => {
            setBackToShow(false);
            window.removeEventListener('scroll', handleWindowEvent);
            dispatch(clearHasMoreProducts());
            dispatch(clearCompareProduct());
        };
    }, []);

    useEffect(() => {
        console.log(limit, skip);
        dispatch(fetchMoreProducts({ limit: limit, skip: skip }));
    }, [skip]);

    const handleToScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const renderProductItems = () => {
        return (
            hasMorePrdItems.length > 0 && (
                <div className="productlist_conainer relative">
                    <ul>
                        <Product prdouctData={hasMorePrdItems} />
                    </ul>
                    {backToShow && (
                        <div
                            className={`back_top_top ${animateBtn}`}
                            role="button"
                            aria-hidden={`${backToShow ? 'false' : 'true'}`}
                            onClick={handleToScrollTop}
                        >
                            <IoIosArrowDown className="rotate-[-180deg]" />
                            Back to top
                        </div>
                    )}
                </div>
            )
        );
    };
    return (
        <>
            <InfiniteScroll
                dataLength={hasMorePrdItems.length}
                children={renderProductItems()}
                hasMore={hasMore}
                loader={<LoadingItem />}
                next={handleHasMoreProducts}
                ref={divRef}
            />
        </>
    );
};

export default ProductList;
/*  <div className="productlist_conainer relative">
      <ul className="grid gap-1 grid-cols-[repeat(5,minmax(auto,250px))] p-3 justify-evenly ">
        {loading ? (
          <div className="product_loading flex items-center justify-center">
            <CgSpinner className="text-[3rem] text-[#2874f0] animate-spin" />
          </div>
        ) : (
          prdItems.length && (
            <Product
              prdouctData={prdItems}
              handleLimitIncrement={handleLimitIncrement}
            />
          )
        )}
      </ul>
      {backToShow && (
        <div
          className={`back_top_top ${animateBtn}`}
          role="button"
          aria-hidden={`${backToShow ? "false" : "true"}`}
          onClick={handleToScrollTop}
        >
          <IoIosArrowDown className="rotate-[-180deg]" />
          Back to top
        </div>
      )}
    </div> */
/*  const handleLimitIncrement = () => {
    setSkip((preSkip) => preSkip + 1);
  }; */
