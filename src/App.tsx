import './App.css'
import ButtonDragDropMenu from './components/ButtonDragDropMenu'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import ServerMonitoringGrafana from './pages/ServerMonitoringGrafana'
import InstallJenkin from './pages/InstallJenkin'
import K3s from './pages/K3s'
function App() {
 
  return (
    <>
    <main className='App'>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="articles/server-monitoring-grafana" element={<ServerMonitoringGrafana/>}/>
          <Route path="articles/install-jenkin" element={<InstallJenkin/>}/>
          <Route path="/articles/how-to-setup-k3s" element={<K3s/>}/>
        </Routes>
        <ButtonDragDropMenu/>
        <Footer/>
    </main>
    </>
  )
}

export default App
