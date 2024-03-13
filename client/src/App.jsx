import "./App.css";
import Quiz from "./components/Quiz/Quiz";
import { Routes, Route, Navigate } from "react-router-dom";
import User from "./routes/User";
import { useContext } from "react";
import QuizContext from "./contexts/QuizContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar/Navbar";
function App() {
  const { userQuiz } = useContext(QuizContext)
  console.log(userQuiz)
  return (
    <>
      <div className="app font-montserrat">
       <Navbar/>
        <Routes>
          <Route path="/" element={userQuiz ? <Navigate to="/user" /> : <Quiz />} />
          <Route path="/user" element={userQuiz === null ? <Navigate to="/" /> : <User />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/signup" element={ <Signup />} />
          {/* <Route path="/navbar" element={ <Navbar/>} /> */}

        </Routes>
      </div>
    </>
  );
}

export default App;
