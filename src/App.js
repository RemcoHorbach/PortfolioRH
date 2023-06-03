import logo from './assets/img/logo.png';
import './App.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Contact } from './components/Contact';
import'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <Contact/>
    </div>
  );
}

export default App;
