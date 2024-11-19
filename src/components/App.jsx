import Login from './Login';
import Register from './Register';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App1 from '../App'
import FeedbackForm from './feedback';
import About from './aboutus';
import Profile from './profile';
function App() {

  return (
    <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Register/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/feedback" element ={<FeedbackForm/>} />
          
          <Route path= "/home" element= {<App1/>} />
          <Route path= "/about" element= {<About/>} />
          <Route path= "/profile" element= {<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App