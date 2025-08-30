import Footer from "./Footer";
import Navbar from "./Navbar";
// import ThemeToggle from "./ThemeToggle";

const Layout = ({ children }) => {
  return (
    <>
      <div className="book-page" />
      <div className="page-stains" />
      <Navbar />
      {children}
      <Footer />
      {/* <ThemeToggle /> */}
    </>
  );
};

export default Layout;
