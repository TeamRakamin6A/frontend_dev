import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Supply_Orders from "./pages/Supply_Orders/Supply_Orders";
import Supply_OrderDetail from "./pages/Supply_Orders/Supply_OrderDetail";
import Warehouses from "./pages/Warehouses/Warehouses";
import WarehouseDetail from "./pages/Warehouses/WarehouseDetail";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/addcustomers" element={<AddCustomer />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/suppliers/:id" element={<SupplierDetail />} />
          <Route path="/supplier-orders" element={<Supply_Orders />} />
          <Route path="/supplier-orders/:id" element={<Supply_OrderDetail />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/warehouses/:id" element={<WarehouseDetail />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
