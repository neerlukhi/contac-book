import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './components/Add';
import View from './components/View';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <Header/>
      <ToastContainer />
      <div className='flex flex-wrap'>
        <div className='w-1/5 h-[90vh]'>
          <Sidebar />
        </div>
        <div className='w-4/5 h-[90vh] overflow-x-hidden overflow-scroll  p-[20px]'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addcon" element={<Add />} />
            <Route path="/viewcon" element={<View />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
