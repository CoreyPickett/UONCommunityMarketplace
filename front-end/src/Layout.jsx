//Layout of web application
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  return (
    <>
    <NavBar />
    <Outlet />
    </>
  );
}