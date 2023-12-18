import "./App.css";
import Header from "./Header.js";
import Home from "./Home.js";
const App = () => {
  return (
    <div className="app">
      {/* Header*/}
      <Header />
      {/* Home // the components below header*/}
      <Home />
    </div>
  );
};

export default App;
