import { useReducer } from 'react';
import Categories from './Categories';
import { FaFilter } from 'react-icons/fa';
import Price from './Price';
import './FilterProduct.css';

type FilterPrdDropDown = {
    categories: boolean;
    price: boolean;
    rating: boolean;
};
export type FilterAction = {
    type: string;
    payload: boolean;
};
const filterPrdDropDown: FilterPrdDropDown = {
    categories: false,
    price: false,
    rating: false,
};
const reducer = (state: FilterPrdDropDown, action: FilterAction) => {
    const { type, payload } = action;
    switch (type) {
        case 'categories':
            console.log(payload);
            return {
                ...state,
                categories: payload,
            };
        case 'price':
            return {
                ...state,
                price: payload,
            };
        case 'rating':
            return {
                ...state,
                rating: payload,
            };
        default:
            return state;
    }
};

const FilterProduct = () => {
    const [state, dispatch] = useReducer<
        (state: FilterPrdDropDown, action: FilterAction) => FilterPrdDropDown
    >(reducer, filterPrdDropDown);

    return (
        <aside className={`filterproduct_container`}>
            <header className="relative  flex items-center border-b py-2 pl-4">
                <FaFilter className="text-[1.25rem]" />
                <h1 className="ml-1 text-[1.05rem]">Filters</h1>
            </header>
            <div>
                <Categories categories={state.categories} dispatch={dispatch} />
                <Price price={state.price} dispatch={dispatch} />
            </div>
        </aside>
    );
};

export default FilterProduct;
