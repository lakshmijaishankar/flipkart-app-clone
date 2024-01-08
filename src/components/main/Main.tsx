import { Route, Routes } from 'react-router-dom';
import ProductDetails from '../productdetails/ProductDetails';
import Home from '../home/Home';
import './Main.css';

const Main = (): JSX.Element => {
    return (
        <main className="main_container relative ">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/productdetails/:id"
                    element={<ProductDetails />}
                />
            </Routes>
        </main>
    );
};

export default Main;
