// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import styles from './Header.module.css';
// import Logo from '../../assets/icons/logo.svg';
// import cartIcon from '../../assets/icons/cart.svg';

// export default function Header() {
//   const cartItems = useSelector((state) => state.cart.items);
//   const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <header className={styles.Header}>
//       <div className="globalContainer">
//         <div className={styles.headerContent}>
//           <Link to="/">
//             <img src={Logo} alt="Logo" />
//           </Link>
//           <nav className={styles.navBlock}>
//             <ul>
//               <li>
//                 <Link to="/" className={styles.navLink}>Main Page</Link>
//               </li>
//               <li>
//                 <Link to="/categories" className={styles.navLink}>Categories</Link>
//               </li>
//               <li>
//                 <Link to="/products" className={styles.navLink}>All Products</Link>
//               </li>
//               <li>
//                 <Link to="/discounted-products" className={styles.navLink}>All Sales</Link>
//               </li>
//             </ul>
//           </nav>
//           <Link to="/cart" className={styles.cartLink}>
//             <img src={cartIcon} alt="Cart" />
//             {cartItemsCount > 0 && (
//               <span className={styles.cartBadge}>{cartItemsCount}</span>
//             )}
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }
import React, { useState, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./Header.module.css";
import Logo from "../../assets/icons/logo.svg";
import cartIcon from "../../assets/icons/cart.svg";

const Header = memo(function Header() {
  const cartItems = useSelector((state) => state.cart.items);

  // Мемоизация подсчета товаров в корзине
  const cartItemsCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const [menuOpen, setMenuOpen] = useState(false);

  // Используем useCallback для оптимизации toggleMenu
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  // Массив для навигационных ссылок
  const navLinks = [
    { path: "/", label: "Main Page" },
    { path: "/categories", label: "Categories" },
    { path: "/products", label: "All Products" },
    { path: "/discounted-products", label: "All Sales" },
  ];

  return (
    <header className={styles.Header}>
      <div className="globalContainer">
        <div className={styles.headerContent}>
          <Link to="/">
            <img src={Logo} alt="Logo" loading="lazy" />
          </Link>
          <div
            className={classNames(styles.burgerMenu, {
              [styles.open]: menuOpen,
            })}
            onClick={toggleMenu}
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </div>
          <nav
            className={classNames(styles.navBlock, { [styles.open]: menuOpen })}
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/cart" className={styles.cartLink}>
            <img src={cartIcon} alt="Cart" loading="lazy" />
            {cartItemsCount > 0 && (
              <span className={styles.cartBadge}>{cartItemsCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
});

export default Header;
