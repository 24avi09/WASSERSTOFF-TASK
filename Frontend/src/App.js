import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/app.css';
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import AddTopic from "./components/AddTopic"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/dashboard/:id' element={<Dashboard/>} />
      <Route path='/addtopic/:id' element={<AddTopic/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
