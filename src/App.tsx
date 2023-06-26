import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { ApiProvider } from "./utils/ApiContext";
import Favourites from "./pages/Favourites";
import PlayListsPage from "./pages/PlayListsPage";
// import Auth from "./pages/Auth";
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
        <ApiProvider>
          <Routes>
            {/* <Route path="/album/:id">
                <AlbumPage />
              </Route> */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/playlists" element={<PlayListsPage />} />
            {/* <Route path="/" element={<Auth />} /> */}
          </Routes>
        </ApiProvider>
      </main>
    </div>
  );
};

export default App;
