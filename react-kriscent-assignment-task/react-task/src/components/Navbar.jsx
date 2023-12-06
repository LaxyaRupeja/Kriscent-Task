import { Button, Chip } from '@nextui-org/react';
import { useState } from 'react';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './Cart';
import MyOrders from './MyOrders';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const isLogin = useSelector((state) => state.isLogin);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleToggle = () => {
        setIsMobile(!isMobile);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
        alert("Logout successfully");
    }

    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex items-center justify-between">
                <div className="text-white text-lg font-semibold">Company Logo</div>

                {/* Hamburger icon for mobile */}
                <div className="lg:hidden" onClick={handleToggle}>
                    <svg
                        className="w-6 h-6 cursor-pointer text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </div>

                {/* Navigation links */}
                <ul className={`hidden lg:flex space-x-4 items-center`}>
                    <li>
                        <a className="text-white">Home</a>
                    </li>

                    <li>
                        <div className='space-x-2'>
                            <Cart />
                            {cart.length > 0 && (
                                <Chip>{cart.length}</Chip>
                            )}
                        </div>
                    </li>
                    {
                        isLogin &&
                        <li>
                            <MyOrders />
                        </li>
                    }
                    <li>
                        {
                            isLogin ? (
                                <Button onClick={handleLogout}>
                                    Logout
                                </Button>
                            ) : (
                                <Login />
                            )
                        }
                    </li>
                </ul>
            </div>

            {/* Mobile navigation */}
            {isMobile && (
                <ul className="lg:hidden mt-4 flex flex-col gap-4 font-semibold">
                    <li>
                        <a href="#home" className="block text-white">Home</a>
                    </li>
                    <li>
                        <a href="#contact" className="block text-white">Cart</a>
                    </li>
                    {
                        isLogin &&
                        <li>
                            <MyOrders />
                        </li>
                    }
                    <li>
                        {
                            isLogin ? (
                                <Button onClick={handleLogout}>
                                    Logout
                                </Button>
                            ) : (
                                <Login />
                            )
                        }
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
