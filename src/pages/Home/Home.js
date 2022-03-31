import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Header from "../../components/Header/Header";
import AuthContext from "../../context/AuthContext";
import { getCurrentUserToken } from "../../firebase/firebase";
import Cart from "../../components/Cart/Cart";
import ProductListing from "../../components/ProductListing/ProductListing"

async function fetchUserToken(setUserToken, setLoading, setError) {
  setLoading(true);

  try {
    const token = await getCurrentUserToken();
    setUserToken(token);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
}

function Home(handleRemove, handleChange) {
  const [userToken, setUserToken] = useState();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [products, setProducts] = useState([{
    page: 1,
    paginationInfo: null,
    products: [],
    hasLoaded: false,
    hasError: false,
    errorMessage: null,
  }]);

  const [cartItems, setCartItems] = useState(() => "" );

  const currentUser = useContext(AuthContext);

  function buildNewCartItem(cartItem) {
    if (cartItem.quantity >= cartItem.unitsInStock) {
      return cartItem;
    }
  
    return {
      id: cartItem.id,
      title: cartItem.title,
      img: cartItem.img,
      price: cartItem.price,
      unitsInStock: cartItem.unitsInStock,
      createdAt: cartItem.createdAt,
      updatedAt: cartItem.updatedAt,
      quantity: cartItem.quantity + 1,
    };
  }

  function handleAddToCart(productId) {
    const prevCartItem = cartItems.find((item) => item.id === productId);
    const foundProduct = products.find((product) => product.id === productId);

    if (prevCartItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        if (item.quantity >= item.unitsInStock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });

      setCartItems(updatedCartItems);
      return;
    }

    const updatedProduct = buildNewCartItem(foundProduct);
    setCartItems((prevState) => [...prevState, updatedProduct]);
  }

  useEffect(() => {
    if (userToken && !currentUser) {
      setUserToken(null);
      setUsers(null);
    }
  }, [userToken, currentUser]);

  useEffect(() => {
    if (!userToken) {
      fetchUserToken(setUserToken, setLoading, setError);
    }
  }, [userToken]);

  useEffect(() => {
    async function getUsers(userToken, setUsers, setLoading, setError) {
      setLoading(true);

      try {
        const res = await axios.get("http://localhost:4000/", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setUsers(res.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getUsers(userToken, setUsers, setLoading, setError);
    if (userToken && !users) {
    }
  }, []);

  return (
    <>
      <Header />
      <main className="container d-flex">
        <div className="row">
          <div className="col col-8">
            <div className="row">
              <div className="col col-12">
                <header className="jumbotron">
                  <h1 className="display-4">Shoe shop</h1>
                  <p className="lead">
                    This is the best shoe shop ever, you will never find a better
                    one.
                  </p>
                  <p className="font-weight-bold">Buy now!</p>
                </header>
              </div>
            </div>
          </div>
          <div className="col col-12">
            { <ProductListing 
              products={users}
              handleAddToCart={handleAddToCart}
            /> }
          </div>
        </div>
            <Cart
              className="col col-3"
              cartItems={cartItems}
              handleRemove={handleRemove}
              handleChange={handleChange}
              />
      </main>
    </>
  );
}

export default Home;