
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Chat from './compoents/Chat';
import Join from './compoents/Join';

function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/' element={<Join/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
