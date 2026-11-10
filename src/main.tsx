import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { Layout } from './layout'
import '../styles.css'

// 1. Create a root route layout wrapper
const rootRoute = createRootRoute({
  component: Layout,
})

// 2. Placeholder index home route 
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    // If your index file has a custom component, we will wire it here next
    return <div className="p-8 text-center text-xl font-bold">Welcome to My Portfolio Workspace!</div>
  },
})

// 3. Assemble the router tree path mappings
const routeTree = rootRoute.addChildren([indexRoute])
const router = createRouter({ routeTree })

// 4. Render the app wrapped in the missing RouterProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
)
