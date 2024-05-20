import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


import Order from './components/Order';
import OrderGte from './components/orderGte/Order';
import { useEffect, useState} from 'react';
 //?LCODIGO=0010513436&cte=0000109476

const App = () => {


  return (
 
    <Router>
      <div>
       <Routes>
          <Route path="/quote/" element={<Order />} />
          <Route path="/quotegte" element={<OrderGte />} />
       </Routes>
      </div>
    </Router>
  );
}

export default App;
