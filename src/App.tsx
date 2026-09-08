import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeView from './pages/Home/HomeView'
import FavouritesView from './pages/Favourites/FavouritesView'
import AuthView from './pages/Auth/AuthView'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/favourites" element={<FavouritesView />} />
          <Route path="/auth" element={<AuthView />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
