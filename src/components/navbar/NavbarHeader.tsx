import { useAppSelector } from '../../redux/hooks/storeHook';
import Cart from '../cart/Cart';
import Navbar from './Navbar';
import './Navbar.css';

const NavbarHeader = () => {
    const { isOpened } = useAppSelector((state) => state.cartRedu);
    return (
        <header className="navbar-header ">
            <Navbar />
            {isOpened && <Cart />}
        </header>
    );
};

export default NavbarHeader;
