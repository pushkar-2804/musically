import { Route, Routes} from 'react-router-dom'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import Home from './pages/Home'
import Search from './pages/Search'

const App = () => {
  return (
    // <Provider store={store}>
      
        <div className="app">
          <Sidebar/>
          <main className="main">
            <Routes>
              {/* <Route path="/album/:id">
                <AlbumPage />
              </Route> */}
              <Route path="/" element={<Home/>} />
              <Route path="/search" element={<Search/>} />
               
            </Routes>
          </main>
        </div>
      
    // </Provider>
  )
}

export default App
