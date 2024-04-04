import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import User from './components/getUser/User.jsx';
import Add from './components/addUser/Add.jsx';
import Edit from './components/updateUser/Edit.jsx';
import Login from './components/login/login.jsx';
import Admin from './components/admin/admin.jsx';

function App() {
 
  const route = createBrowserRouter([
    {
      path:"/",
      element:<Login/>,
    },
    {
      path:"/user",
      element:<User/>,
    },
    {
      path:"/admin",
      element:<Admin/>,
    },
    {
      path:"/add",
      element:<Add/>,
    },
    {
      path:"/edit/:id",
      element:<Edit/>,
    }
    
  ])
  
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
