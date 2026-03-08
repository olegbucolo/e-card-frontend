import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DefaultLayout from './layouts/DefaultLayout'

function App() {

  return (
    <>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route index element={<HomePage/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
