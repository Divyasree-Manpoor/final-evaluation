import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"
import Statement from "./pages/Statement"
import ProtectedRoute from "./components/ProtectedRoute"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Navigate to="/login"/>} />

<Route path="/signup" element={<Signup />} />

<Route path="/login" element={<Login />} />

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route
path="/send"
element={
<ProtectedRoute>
<SendMoney/>
</ProtectedRoute>
}
/>

<Route
path="/statement"
element={
<ProtectedRoute>
<Statement/>
</ProtectedRoute>
}
/>

{/* important fallback */}
<Route path="*" element={<Navigate to="/login" />} />

</Routes>

</BrowserRouter>

)

}

export default App