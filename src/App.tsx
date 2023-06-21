import { Route, Routes} from 'react-router-dom'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import Home from './pages/Home'

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
               
            </Routes>
          </main>
        </div>
      
    // </Provider>
  )
}

export default App
