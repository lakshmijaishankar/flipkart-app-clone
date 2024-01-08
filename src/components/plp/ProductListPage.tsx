import { IoIosArrowDown } from 'react-icons/io';
import './ProductListPage.css';


const productListData: string[] = [
    'electronics',
    'TVs & appliances',
    'men',
    'women',
    'bady & kids',
    'home & furniture',
    'stores,Books & more',
    'flights',
    'offer zone',
    'grocery',
];
const ProductListPage = (): JSX.Element => {
    
    return (
        <section className="productlist_page_warapper ">
            <ul className="productlist_page">
                {productListData.map((title) => {
                    return (
                        <li className={`productpage_${title}`} key={title}>
                            <span>{title}</span>
                            <IoIosArrowDown className="mt-[0.1rem] text-[0.8rem] text-[#a7a6a6]" />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default ProductListPage;
