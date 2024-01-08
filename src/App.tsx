import { BrowserRouter } from 'react-router-dom';
import NavbarHeader from './components/navbar/NavbarHeader';
import Main from './components/main/Main';
import ProductListPage from './components/plp/ProductListPage';
import { ToastContainer } from 'react-toastify';
import { clearCompareProduct } from './redux/silce/comparePrdSlice';
import { clearAllChecked } from './redux/silce/hasMorePrdSlice';
import { useAppDispatch } from './redux/hooks/storeHook';
import 'react-toastify/dist/ReactToastify.css';
import './style/index.css';
import { useEffect, useState } from 'react';

const App = () => {
    const dispatch = useAppDispatch();
    const [showPlp, setShowPlp] = useState<number>(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setShowPlp(window.innerWidth);
        });
    }, []);
    return (
        <section className="app-container">
            <BrowserRouter>
                <NavbarHeader />
                {showPlp > 768 && <ProductListPage />}
                <Main />
                <ToastContainer
                    position="bottom-center"
                    toastClassName="bg-[#212121] text-white w-[425px]"
                    hideProgressBar={true}
                    closeButton={
                        <button
                            type="button"
                            className="text-[0.8rem] uppercase text-[#fb9d01]"
                            onClick={() => {
                                console.log('toast clear btn');
                                dispatch(clearCompareProduct());
                                dispatch(clearAllChecked());
                            }}
                        >
                            clear list
                        </button>
                    }
                />
            </BrowserRouter>
        </section>
    );
};

export default App;
