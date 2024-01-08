import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/storeHook';
import { RxCross2 } from 'react-icons/rx';
import { removeCompareProduct } from '../../redux/silce/comparePrdSlice';
import { compareIsUnChecked } from '../../redux/silce/hasMorePrdSlice';
import './CompareProduct.css';

const CompareProduct = () => {
    const { compareProductItem, itemCount } = useAppSelector(
        (state) => state.comparePrdRed
    );
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        return () => {
            setIsOpen(false);
        };
    }, []);

    /*    useEffect(() => {
        if (spanRef.current) {
            spanRef.current.removeAttribute('class');
            spanRef.current.setAttribute('class', 'animate-count');
        }
    }, [itemCount]); */

    
    const handleRemoveComparePrd = (id: number) => {
        dispatch(removeCompareProduct({ id: id }));
        dispatch(compareIsUnChecked(id));
    };

    return (
        <section className="compare-product-wrapper ">
            {isOpen && (
                <div
                    className={`compare-product-container ${
                        isOpen && 'animate-bottom-right'
                    }`}
                >
                    <ul
                        className="flex flex-wrap gap-x-2 px-3 py-3"
                        onMouseMove={() => setIsOpen(true)}
                        onMouseOut={() => setIsOpen(false)}
                    >
                        {compareProductItem.map((comPrd) => {
                            return (
                                <li
                                    className="compare-prd-item "
                                    key={comPrd.id}
                                >
                                    <img
                                        src={comPrd.images[0]}
                                        alt={comPrd.title}
                                        className="aspect-square"
                                    />
                                    <span className="line-clamp-1 text-center text-[0.8rem] ">
                                        {comPrd.title}
                                    </span>
                                    <div
                                        className="cross opacity-80"
                                        onClick={() => {
                                            handleRemoveComparePrd(comPrd.id);
                                        }}
                                    >
                                        <RxCross2 />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    {/* <button className="remove-all-prd ">Remove All</button> */}
                </div>
            )}
            <section className="compare-prd-btn cursor-pointer">
                <div
                    onMouseEnter={() => {
                        setIsOpen(true);
                    }}
                    onMouseLeave={() => setIsOpen(false)}
                    className="flex space-x-2 rounded-sm bg-[#2874f0] px-5 py-2"
                >
                    <span className="uppercase">compare</span>
                    <span className="animate-count" ref={spanRef}>
                        {itemCount}
                    </span>
                </div>
            </section>
        </section>
    );
};

export default CompareProduct;
