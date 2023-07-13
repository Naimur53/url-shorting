import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyUrls from "./Pages/MyUrls/MyUrls";
import SingleLinkNavigator from "./Pages/SingleLinkNavigator/SingleLinkNavigator";
import NavBar from "./Components/NavBar/NavBar";
import EditUrls from "./Pages/EditUrls/EditUrls";
import GradientUi from "./Components/GradientUi/GradientUi";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/edit-urls" element={<EditUrls />}></Route>
        <Route path="/my-urls" element={<MyUrls></MyUrls>}></Route>
        <Route
          path="/:shortUrl"
          element={<SingleLinkNavigator></SingleLinkNavigator>}
        ></Route>
      </Routes>
      <ToastContainer position="bottom-right" />
      <GradientUi></GradientUi>
    </BrowserRouter>
  );
}

export default App;
