import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes,  useLocation } from 'react-router-dom';

import Order from './components/Order/Order';
import OrderGte from './components/orderGte/Order';
import Login from './components/Login/LoginS';
import Home from './components/Home/Home';
import Sidebar from './components/Sidebar/sidebar';
import { useState } from 'react';
/* import NavBar from './components/navBar/NavBar'; */
import Orderlist from './components/Order/Orderlist';
import ProtectedRoute from './components/ProtectedRoute';

 //?LCODIGO=0010513436&cte=0000109476

const App = () => {


  return (
 
    <Router>
       <MainLayout />
    </Router>
  );
}


const MainLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
/*   const noNavbarPaths = ['/','/quote/','/quotegte/']; */
  const showSidebar = location.pathname === '/listquote/' ||  location.pathname === '/Home/'  ;
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
};

  return (
    <>
{/*      {!noNavbarPaths.includes(location.pathname) && <NavBar />} */}
      <div className="main-layout">  
              
          {showSidebar && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
          <div className="content">
          {showSidebar && (
                     <button className="open-btn" onClick={toggleSidebar}>
                        &#9776;
                    </button>
                )}
         
          <Routes>         
          <Route path="/" element={<Login />} />
          <Route path="/Home/" element={<Home />} />
          {/* <Route path="/listquote/" element={<Orderlist />} /> */}
          <Route
          path="/listquote"
          element={
            <ProtectedRoute>
              <Orderlist />
            </ProtectedRoute>
          }
        />
          <Route path="/quote/:lcodigo/:cte" element={<Order />} />
          <Route path="/quotegte/:lcodigo/:cte" element={<OrderGte />} />
       </Routes>
          </div>
      </div>
      </>
  );
};

export default App;
