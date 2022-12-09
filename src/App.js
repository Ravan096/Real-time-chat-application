import './App.css';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import {Join} from "./component/Join/Join.js";
import {Chat} from "./component/Chat/Chat.js";

function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<Join/>}/>
        <Route path="/chat" element={<Chat/>}/>
        </Routes>
        

      </Router>
  );
}

export default App;
