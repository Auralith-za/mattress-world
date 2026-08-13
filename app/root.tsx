import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import React, {useState, createContext, useContext} from 'react';
import appStyles from '~/styles/app.css?url';
import {type CartItem, type Product} from '~/types';

export function links() {
  return [
    {rel: 'stylesheet', href: appStyles},
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap',
    },
  ];
}

export async function loader({context}: LoaderFunctionArgs) {
  return {
    publicStoreDomain: context.env.PUBLIC_STORE_DOMAIN,
  };
}

// ─── Global App Context ──────────────────────────────────────────────────────
interface AppContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  compareItems: Product[];
  setCompareItems: React.Dispatch<React.SetStateAction<Product[]>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCompareOpen: boolean;
  setIsCompareOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isQuizOpen: boolean;
  setIsQuizOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(AppContext);

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        compareItems,
        setCompareItems,
        isCartOpen,
        setIsCartOpen,
        isCompareOpen,
        setIsCompareOpen,
        isQuizOpen,
        setIsQuizOpen,
      }}
    >
      <Outlet />
    </AppContext.Provider>
  );
}
