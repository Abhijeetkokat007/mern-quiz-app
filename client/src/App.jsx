import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Quiz from "./components/Quiz/Quiz";
import Dashboard from "./pages/Dashboard";
import User from "./routes/User";
import { useContext } from "react";
import QuizContext from "./contexts/QuizContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RootLayout from "./layouts/RootLayout";
import Settings from "./pages/Settings";
// import PrivateRoute from "./components/PrivateRoute";
// import DashSidebar from "./components/DashSidebar";

import Navbar from "./components/Navbar/Navbar";
function App() {
  const { userQuiz } = useContext(QuizContext)
  console.log(userQuiz)
  return (
    <>
      <div className="app font-montserrat">
      
      
        <Routes>
          <Route path="/" element={userQuiz ? <Navigate to="/user" /> : <Quiz />} />
          <Route path="/user" element={userQuiz === null ? <Navigate to="/" /> : <User />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/signup" element={ <Signup />} />
          

          <Route element={<RootLayout />}>
            <Route path="/dashbord" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/settingss" element={<Settings />} />
        


 
  <Route path="/dashbord" element={<Dashboard />} />
            
  

</Routes>
       
      </div>
    </>
  );
}

export default App;
