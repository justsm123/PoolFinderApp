import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import PoolDetail from './pages/PoolDetail';
import MapViewPage from './pages/MapViewPage';
import NotFound from './pages/NotFound';
import { PoolSearchProvider } from './context/PoolSearchContext';

const App = () => (
  <PoolSearchProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/pool/:id" element={<PoolDetail />} />
      <Route path="/map" element={<MapViewPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </PoolSearchProvider>
);

export default App;
