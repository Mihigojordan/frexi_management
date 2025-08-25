
import { API_URL } from './api/api';
import { SocketProvider } from './context/SocketContext';
import routes from './router'
import { RouterProvider } from "react-router-dom";

function App() {

  return (
    <SocketProvider serverUrl={API_URL}>

      <RouterProvider router={routes} ></RouterProvider>
    </SocketProvider>
  )
}

export default App
