import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import BusinessRegister from './pages/BusinessRegister';
import SearchFilter from './pages/SearchFilter';



function App() {

  if(window.localStorage.getItem('token') === null){
    return <Login/>
  }
  
  

  return (
    <>

      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path='detail' element={<Detail />}></Route>
              <Route path='login' element={<Login/>}></Route>
              <Route path='register' element={<Register />}></Route>
              <Route path='business_register' element={<BusinessRegister />}></Route>
              <Route path='search' element={<SearchFilter />}></Route>
            </Route>
          </Routes>
      </BrowserRouter>

    </>
  
  );
}

export default App;
