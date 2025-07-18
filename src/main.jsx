import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Landing from './pages/Landing.jsx'
import { AuthLayout, Login } from "./components"
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
        {
          path: '/',
          element: <Landing />
        },
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/login",
          element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          )
        },
        {
          path: "/signup",
          element: (
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          ),
        },
        {
          path: "/all-posts",
          element: (
            <AuthLayout authentication={true}>
              <AllPosts />
            </AuthLayout>
          ),
        },
        {
          path: "/add-post",
          element: (
            <AuthLayout authentication={true}>
              <AddPost />
            </AuthLayout>
          ),
        },
        {
          path: "/edit-post/:slug",
          element: (
            <AuthLayout authentication={true}>
              <EditPost />
            </AuthLayout>
          ),
        },
        {
          path: "/post/:slug",
          element: <Post />,
        },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
