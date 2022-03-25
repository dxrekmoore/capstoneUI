import './App.css';
import Navbar from './components/Navbar';
import Basemap from './components/Map/Basemap';
function App() {
  return (
    <>
      <div className="App">
        <Navbar/>
        <Basemap/>
      </div>
    </>
  );
}

export default App;