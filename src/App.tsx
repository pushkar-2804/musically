import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/Home";
import Search from "./pages/Search";
// import { useState } from "react";
// import MyContext, { dataProp } from "./context";

const App = () => {
  // const [data, setData] = useState<dataProp>({} as dataProp);

  // const updateData = (newData: dataProp) => {
  //   setData(newData);
  // };
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        {/* <MyContext.Provider value={{ data, updateData }}> */}
        <Routes>
          {/* <Route path="/album/:id">
                <AlbumPage />
              </Route> */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        {/* </MyContext.Provider> */}
      </main>
    </div>
  );
};

export default App;
