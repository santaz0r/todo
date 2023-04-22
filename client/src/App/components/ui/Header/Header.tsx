import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import { useState } from 'react';
import Modal from '../../modal/Modal';

function Header() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentModal, setCurrentModal] = useState<'register' | 'login'>('register');
  const handleButton = (btn: 'register' | 'login') => {
    setCurrentModal(btn);
    setIsModalActive(true);
  };

  const setActiveLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navigation_link} ${styles.active_link}` : styles.navigation_link;
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <nav>
          <ul className={styles.navigation}>
            <li>
              <NavLink className={setActiveLink} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={setActiveLink} to="about">
                About
              </NavLink>
            </li>
          </ul>
        </nav>
        <li className={styles.navigation__buttons}>
          <button type="button" className={styles.navigation__btn} onClick={() => handleButton('register')}>
            Register
          </button>
          <button type="button" className={styles.navigation__btn} onClick={() => handleButton('login')}>
            Login
          </button>
        </li>
        {isModalActive && (
          <Modal setActive={setIsModalActive}>
            {currentModal === 'register' ? (
              // <RegisterForm setCurrentModal={setCurrentModal} setActive={setIsModalActive} />
              <p>kek1</p>
            ) : (
              //   <LoginForm setCurrentModal={setCurrentModal} setActive={setIsModalActive} />
              <p>kek2</p>
            )}
          </Modal>
        )}
      </div>
    </header>
  );
}

export default Header;
