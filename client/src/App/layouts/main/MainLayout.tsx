import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';

import Footer from '../../components/ui/Footer/Footer';
import Header from '../../components/ui/Header/Header';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { checkAuth, getIsLogin, getUserLoadingStatus, getUsersListStatus, loadUsersList } from '../../store/user';
import { loadTodosList } from '../../store/todos';

function MainLayout() {
  const isLoadingUser = useAppSelector(getUserLoadingStatus());
  const isLoadingUsersList = useAppSelector(getUsersListStatus());
  const isLoggedIn = useAppSelector(getIsLogin());
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUsersList());
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadTodosList());
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  if (isLoadingUser || isLoadingUsersList) {
    return <h2>Loading user...</h2>;
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
