import './App.css';
import Register_form from './components/Register_form';
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Success_Page from './components/Success_Page';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register_form/>}></Route>
      <Route path='/success' element={<Success_Page/>}></Route>

    </Routes>
    </BrowserRouter>
    
    
    
    </>
  );
}

export default App;
