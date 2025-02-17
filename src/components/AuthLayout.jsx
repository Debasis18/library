function AuthLayout({ children }) {
  return loader ? <h1>Loading</h1> : <>{children}</>;
}

export default AuthLayout;
