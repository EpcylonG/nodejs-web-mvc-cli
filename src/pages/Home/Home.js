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

function Home(cartItems, handleRemove, handleChange) {
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

  const currentUser = useContext(AuthContext);

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
      <main className="container p-4">
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
        // handleAddToCart={handleAddToCart}
      /> }
      </div>
      <Cart
        className="col col-4"
        cartItems={cartItems}
        handleRemove={handleRemove}
        handleChange={handleChange}
      />
    </div>
      </main>
    </>
  );
}

export default Home;