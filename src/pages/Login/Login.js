import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import AuthContext from "../../context/AuthContext";

import {
  singInWithGoogle,
  singInWithEmailAndPassword,
} from "../../firebase/firebase";

import { syncUserData } from "../../utils/auth-requests";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const currentUser = useContext(AuthContext);

  async function handleLoginWithGoogleClick(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await singInWithGoogle();
      await syncUserData();
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await singInWithEmailAndPassword(email, password);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="container p-4 mt-5">
        <div className="row flex-column align-items-center">
          <div className="col col-lg-6">
          <section className="row row-cols-1 mb-3">
              <div className="col">
                <form action="#" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                        />
                        <label className="form-check-label" for="form2Example31"> Remember me </label>
                      </div>
                    </div>

                    <div className="col">
                      <Link to="/reset-password" style={{ textDecoration: 'none' }}>Forgot your password?</Link>
                    </div>
                  </div>
                  <div className="col">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Logging in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              </div>
            </section>

            <div className="text-center">
              <p>Not a member? <Link to="/sign-up" style={{ textDecoration: 'none' }}>Resgister</Link></p>
              <p>or sign up with:</p>
              <Button onClick={handleLoginWithGoogleClick}>
                  Google
                </Button>
            </div>
            
            {loginError && (
              <section className="row row-cols-1 mb-3 border py-3 bg-light">
                <div className="col">
                  <h2 className="h5">Something went wrong</h2>
                  <hr />
                  <p className="mt-3">{loginError}</p>
                </div>
              </section>
            )}
           
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;