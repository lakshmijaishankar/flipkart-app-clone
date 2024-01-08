import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { cartIsToOpen } from '../../redux/silce/cartSlice';
import FlipkartLog from '../../assets/image/flipkart-plus.png';
import ExplorePlus from '../../assets/image/plus.png';
import { IoIosArrowDown } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/storeHook';
import MyAccount from '../account/MyAccount';
import { ProductObjectKey } from '../../redux/silce/productSlice';
import SearchSuggestion from '../search/SearchSuggestion';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (): JSX.Element => {
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const [searchQeury, setSearchQeury] = useState('') as any;
    const [searchResult, setSearchResult] = useState<ProductObjectKey[]>([]);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const [itemId, setItemId] = useState<number>(0);
    const resultContainer = useRef<HTMLLIElement>(null);
    const { prdListData } = useAppSelector((state) => state.prdRedu);
    const { cartCount } = useAppSelector((state) => state.cartRedu);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleToOpenMyAccount = useCallback(() => {
        setOpenDropDown(true);
    }, [openDropDown]);

    const handleToCloseMyAccount = useCallback(() => {
        setOpenDropDown(false);
    }, [openDropDown]);

    const serachSuggestion = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target;
        console.log(value);
        setSearchQeury(value);
        const temp = prdListData.filter((prd) =>
            prd.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResult(temp);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const { key } = e;
        let nextIndexCount = 0;
        console.log(key);
        switch (key) {
            case 'ArrowDown':
                console.log(resultContainer.current?.dataset.id);
                nextIndexCount = (focusedIndex + 1) % prdListData.length;
                setFocusedIndex(nextIndexCount);
                break;
            case 'ArrowUp':
                nextIndexCount =
                    (focusedIndex - 1 + prdListData.length) %
                    prdListData.length;
                setFocusedIndex(nextIndexCount);
                break;
            case 'Escape':
                setSearchQeury('');
                setFocusedIndex(-1);
                break;
            case 'Enter':
                setSearchQeury('');
                navigate(`/productdetails/${itemId}`);
                setFocusedIndex(-1);
                break;
            default:
                break;
        }
    };

    const handlePreventDefault = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleCartToOpen = () => {
        dispatch(cartIsToOpen());
    };
    useEffect(() => {
        if (resultContainer.current) {
            setSearchQeury(resultContainer.current.childNodes[1].textContent);
            let id = +(resultContainer.current.dataset.id + '');
            setItemId(id);
        }
    }, [focusedIndex]);
    return (
        <nav className="navbar_container flex flex-grow items-center">
            <div className="navbar_left flex flex-grow justify-end">
                <div className="flipkart_logo_container flex flex-col justify-center ">
                    <Link to="/">
                        <figure className="flipkart_logo max-w-[75px] tablet:max-w-[61px]">
                            <img
                                src={FlipkartLog}
                                alt="flipkart"
                                title="Flipkart"
                            />
                        </figure>
                    </Link>
                    <div className="explore_plus flex items-center gap-x-1 text-[11px]">
                        <i className="explore text-white">Explore</i>
                        <i className="plus text-[#fce403]">Plus</i>
                        <img
                            src={ExplorePlus}
                            alt="plus"
                            title="Plus"
                            className="max-w-[10px]"
                        />
                    </div>
                </div>
                <div
                    className="flipkart_searchbox_container relative ml-3 flex flex-grow-[0.8] items-center tablet:ml-2 tablet:grow"
                    /*  tabIndex={1}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setSearchQeury("");
          }} */
                >
                    <form
                        className="searchbox relative flex flex-grow justify-center"
                        onSubmit={handlePreventDefault}
                    >
                        <input
                            type="text"
                            title="Search for products, brands and more"
                            placeholder="Search for, brands and more"
                            onChange={serachSuggestion}
                            value={searchQeury}
                            onKeyDown={handleKeyDown}
                            // onBlur={() => setSearchQeury("")}
                        />
                        <button type="button" className="search_button">
                            <IoSearch />
                        </button>
                    </form>
                    {searchQeury && (
                        <SearchSuggestion
                            searchResult={searchResult}
                            focusedIndex={focusedIndex}
                            resultContainer={resultContainer}
                        />
                    )}
                </div>
            </div>
            <ul className="navbar_right ">
                <li
                    className="flipkart_account_container flex"
                    onMouseOver={() => handleToOpenMyAccount()}
                    onMouseOut={() => handleToCloseMyAccount()}
                >
                    <div
                        className="myaccount flex items-center gap-x-1 tablet:text-[0.8rem]"
                        aria-label="myaccount"
                        // onMouseEnter={}
                    >
                        <span>My Account</span>
                        <IoIosArrowDown
                            className={`transition-[transform] duration-[250ms] ${
                                openDropDown ? 'rotate-[-180deg]' : ''
                            }`}
                        />
                    </div>
                    {openDropDown && (
                        <MyAccount
                            accountCompOpen={openDropDown}
                            handleToOpenMyAccount={handleToOpenMyAccount}
                            handleToCloseMyAccount={handleToCloseMyAccount}
                        />
                    )}
                </li>
                <li className="flipkart_becomeseller_container flex items-center tablet:text-[0.9rem]">
                    <span>Become a Seller</span>
                </li>
                <li className="flipkart_more_container flex items-center gap-x-1 tablet:text-[0.9rem]">
                    <span>More</span>
                    <IoIosArrowDown />
                </li>
                <li
                    className="flipkart_cart_container relative flex items-center gap-x-1 tablet:text-[0.9rem]"
                    onClick={handleCartToOpen}
                >
                    <FaShoppingCart className="text-[1.5rem] tablet:text-[1rem]" />
                    <span>Cart</span>
                    {cartCount !== 0 && (
                        <span className="cart-itemcount absolute bottom-[2rem] left-2 font-semibold text-[#fce403]">
                            {cartCount}
                        </span>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
