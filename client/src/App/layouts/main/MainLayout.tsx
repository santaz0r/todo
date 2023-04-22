import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';

import Footer from '../../components/ui/Footer/Footer';
import Header from '../../components/ui/Header/Header';

function MainLayout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
