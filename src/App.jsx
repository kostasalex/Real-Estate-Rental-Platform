import { Header, Login, SignUp, Cards } from './components'
import { Route, Routes } from 'react-router-dom';
function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Cards/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  )
}

export default App
