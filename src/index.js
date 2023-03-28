import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

// dev-s67v108f323hfk1r.us.auth0.com - DOMAIN
// CwFHJajyeQW07RD4beJfDUABkDqYGqBQ - CLIENT


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Auth0Provider
    domain="dev-s67v108f323hfk1r.us.auth0.com"
    clintId="CwFHJajyeQW07RD4beJfDUABkDqYGqBQ"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
    >
        <UserProvider>
            <ProductsProvider>
                <FilterProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </UserProvider>
    </Auth0Provider>
);
