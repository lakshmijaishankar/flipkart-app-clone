import { useAppDispatch } from '../../redux/hooks/storeHook';
import { IoIosArrowDown } from 'react-icons/io';
import { FilterAction } from './FilterProduct';
import {
    fetchFilterProduct,
    filterUncheckedCategories,
    setCategories,
} from '../../redux/silce/productSlice';
import { ChangeEvent } from 'react';
import { BiCategory } from 'react-icons/bi';
import './Categories.css';

type CategoriesProps = {
    categories: boolean;
    dispatch: (value: FilterAction) => void;
};
const prdCategories: string[] = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting',
];

const Categories = ({ categories, dispatch }: CategoriesProps): JSX.Element => {
    const prdDispatch = useAppDispatch();

    const handleFilterCategories = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = event.target;
        console.log(value);
        if (checked) {
            prdDispatch(fetchFilterProduct(value));
            prdDispatch(setCategories(value));
        } else {
            prdDispatch(filterUncheckedCategories(value));
        }
    };

    return (
        <section className="filterproduct_categories_container border-b px-4">
            <div className="filterproduct_heading flex items-center py-3">
                <BiCategory className="shrink-0 text-[1.25rem]" />
                <span className="ml-1 text-[0.9rem] font-[500] uppercase">
                    Categories
                </span>
                <IoIosArrowDown
                    className={`ms-[auto] cursor-pointer transition-[transform] duration-200 ${
                        categories ? 'rotate-[-180deg]' : ''
                    }`}
                    onClick={() => {
                        dispatch({
                            type: 'categories',
                            payload: !categories,
                        });
                    }}
                />
            </div>
            <ul
                className={`filterprd_categories ${
                    categories ? 'max-h-[160px]' : 'max-h-[0]'
                }`}
            >
                {prdCategories.map((categories) => {
                    return (
                        <li
                            className={`filterprd_${categories} mt-1 flex items-center text-[0.9rem] capitalize`}
                            key={categories}
                        >
                            <input
                                type="checkbox"
                                className={`filterprd_${categories}_checkbox mr-2 aspect-square w-[1rem]`}
                                title={`${categories}_checkbox`}
                                role="checkbox"
                                value={categories}
                                onChange={handleFilterCategories}
                            />
                            {categories}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default Categories;
