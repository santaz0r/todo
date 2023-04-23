import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';

import Footer from '../../components/ui/Footer/Footer';
import Header from '../../components/ui/Header/Header';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { checkAuth, getUserLoadingStatus } from '../../store/user';

function MainLayout() {
  const isLoading = useAppSelector(getUserLoadingStatus());
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
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
