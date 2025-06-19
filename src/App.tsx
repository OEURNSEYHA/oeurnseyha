import './App.css'
import ButtonDragDropMenu from './components/ButtonDragDropMenu'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import ServerMonitoringGrafana from './pages/ServerMonitoringGrafana'
function App() {
 
  return (
    <>
    <main className='App'>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="articles/server-monitoring-grafana" element={<ServerMonitoringGrafana/>}/>
        </Routes>
        <ButtonDragDropMenu/>
        <Footer/>
    </main>
    </>
  )
}

export default App
