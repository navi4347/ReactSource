import Auth from './Components/Auth/Auth';
import Menu from './Components/Menu'
import NotFound from "./Components/NotFound";
import Sales from './Pages/User/Sales'
import Domain from './Components/Auth/Domain';
import Portpairtest from './Mail/Outlook';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
  return (
    <Router>
    <Routes>   
      <Route path="/" element={<Auth />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Sales" element={<Sales />} />
      <Route path="/Domain" element={<Domain />} />
      <Route path="/Portpairtest" element={<Portpairtest />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App