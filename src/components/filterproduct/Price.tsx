import { IoIosArrowDown } from 'react-icons/io';
import { FilterAction } from './FilterProduct';
import { IoIosPricetags } from 'react-icons/io';

type PriceProps = {
    price: boolean;
    dispatch: (value: FilterAction) => void;
};

const prdPrice: string[] = ['100 to 300', '400 to 600', '700 to 1000'];
const Price = ({ price, dispatch }: PriceProps) => {
    return (
        <section className="filterproduct_price_container border-b px-4">
            <div className="filterproduct_heading flex items-center py-3">
                <IoIosPricetags className="shrink-0 text-[1.25rem]" />
                <span className="ml-1 text-[0.9rem] font-[500] uppercase">
                    Price
                </span>
                <IoIosArrowDown
                    className={`ms-[auto] cursor-pointer transition-[transform] duration-200 ${
                        price ? 'rotate-[-180deg]' : ''
                    }`}
                    onClick={() => {
                        dispatch({ type: 'price', payload: !price });
                    }}
                />
            </div>
            <ul
                className={`filterprd_price_list ${
                    price ? 'max-h-[80px]' : 'max-h-[0]'
                } flex flex-col overflow-y-hidden transition-[max-height] duration-200`}
            >
                {prdPrice.map((price) => {
                    return (
                        <li
                            className={`filterprd_price mt-1 flex items-center text-[0.9rem] capitalize`}
                            key={price}
                        >
                            <input
                                type="checkbox"
                                className={`filterprd_price_checkbox mr-2 aspect-square w-[1rem]`}
                                title={`price_checkbox`}
                                role="checkbox"
                            />
                            Rs {price}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default Price;
