import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Landing_Pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Items from "./pages/Items/Items";
import ItemDetail from "./pages/Items/ItemDetail";
import Categories from "./pages/Categories/Categories";
import CategoryDetail from "./pages/Categories/CategoryDetail";
import Orders from "./pages/Orders/Orders";
import OrderDetail from "./pages/Orders/OrderDetail";
import Customers from "./pages/Customers/Customers";
import CustomerDetail from "./pages/Customers/CustomerDetail";
import AddCustomer from "./pages/Customers/AddCustomer";
import Suppliers from "./pages/Suppliers/Suppliers";
import SupplierDetail from "./pages/Suppliers/SupplierDetail";
import AddSupplier from "./pages/Suppliers/AddSupplier";
import Supply_Orders from "./pages/Supply_Orders/Supply_Orders";
import Add_Supply_Orders from "./pages/Supply_Orders/Add_Supply_Order";
import Supply_OrderDetail from "./pages/Supply_Orders/Supply_OrderDetail";
import Warehouses from "./pages/Warehouses/Warehouses";
import WarehouseDetail from "./pages/Warehouses/WarehouseDetail";
import { ChakraProvider } from "@chakra-ui/react";
import CreateOrder from "./pages/Orders/AddOrder";
import CreateWarehouse from "./pages/Warehouses/AddWarehouse";
import AddItem from "./pages/Items/AddItem";
import EditItem from "./pages/Items/EditItem";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Items /></PrivateRoute>} />
          <Route path="/add-products" element={<PrivateRoute><AddItem /></PrivateRoute>} />
          <Route path="/edit-products/:id" element={<PrivateRoute><EditItem /></PrivateRoute>} />
          <Route path="/products/:id" element={<PrivateRoute><ItemDetail /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
          <Route path="/categories/:id" element={<PrivateRoute><CategoryDetail /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/orders/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
          <Route path="/addorders" element={<PrivateRoute><CreateOrder /></PrivateRoute>} />
          <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
          <Route path="/customers/:id" element={<PrivateRoute><CustomerDetail /></PrivateRoute>} />
          <Route path="/addcustomers" element={<PrivateRoute><AddCustomer /></PrivateRoute>} />
          <Route path="/suppliers" element={<PrivateRoute><Suppliers /></PrivateRoute>} />
          <Route path="/suppliers/:id" element={<PrivateRoute><SupplierDetail /></PrivateRoute>} />
          <Route path="/addsuppliers" element={<PrivateRoute><AddSupplier /></PrivateRoute>} />
          <Route path="/supplier-orders" element={<PrivateRoute><Supply_Orders /></PrivateRoute>} />
          <Route path="/add-supplier-orders" element={<PrivateRoute><Add_Supply_Orders /></PrivateRoute>} />
          <Route path="/supplier-orders/:id" element={<PrivateRoute><Supply_OrderDetail /></PrivateRoute>} />
          <Route path="/warehouses" element={<PrivateRoute><Warehouses /></PrivateRoute>} />
          <Route path="/warehouses/:id" element={<PrivateRoute><WarehouseDetail /></PrivateRoute>} />
          <Route path="/addwarehouse" element={<PrivateRoute><CreateWarehouse /></PrivateRoute>} />
          <Route path="/supply_orders" element={<PrivateRoute>< Supply_Orders /></PrivateRoute>} />
        </Routes>
      </Router>
    </ChakraProvider >
  );
}

export default App;
