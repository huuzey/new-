import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import dynamic from "next/dynamic";
import { useSession, signIn, signOut } from "next-auth/react";

function Layout({ title, children }) {
  const { data: session } = useSession();

  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + " - Amazona" : "Amazona"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex  min-h-screen flex-col justify-between ">
        <header className="sticky top-0">
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <a href="/" className="text-lg font-bold">
              amazona
            </a>
            <div>
              <a href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </a>
              <a href="/login" className="p-2">
                {session ? session.user.name : "Login"}
              </a>
              <a onClick={() => signOut()}>sign out</a>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Amazona</p>
        </footer>
      </div>
    </>
  );
}
export default dynamic(() => Promise.resolve(Layout), { ssr: false });
