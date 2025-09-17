import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { error: showError, success: showSuccess } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        showSuccess("Login successful!");
      } else {
        showError(result.error || "Login failed");
      }
    } catch (err) {
      showError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleFillCredentials = () => {
    setEmail("admin@dashboard.com");
    setPassword("password");
    showSuccess("Demo credentials filled");
  };

  return (
    <div className={styles.container}>
      <div className={`card ${styles.card}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Welcome Back
          </h1>
          <p className={styles.subtitle}>
            Sign in to your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="formField">
            <label>Email</label>
            <input
              type="email"
              className="formInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dashboard.com"
              required
            />
          </div>

          <div className="formField">
            <label>Password</label>
            <input
              type="password"
              className="formInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full ${styles.submitButton}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className={styles.demoCredentials}>
          <div className={styles.demoText}>
            <strong>Demo Credentials:</strong>
            <br />
            Email: admin@dashboard.com
            <br />
            Password: password
          </div>
          <button
            type="button"
            className={`btn  ${styles.fillButton}`}
            onClick={handleFillCredentials}
            disabled={loading}
          >
            Fill Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
