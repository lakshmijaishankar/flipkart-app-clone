import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './LoadingItem.css';
const LoadingItem = () => {
    return (
        <ul className="loading-item-container">
            {Array.from({ length: 10 }).map((_, index) => {
                return (
                    <li key={index} className="bg-white p-2 shadow-md">
                        <div role="img" className="image-loading aspect-square">
                            <Skeleton count={1} className="aspect-square" />
                        </div>
                        <p className="short-desc">
                            <Skeleton />
                        </p>
                        <Skeleton className="h-5 w-9" />
                        <Skeleton className="h-6 w-12" />
                    </li>
                );
            })}
        </ul>
    );
};

export default LoadingItem;
