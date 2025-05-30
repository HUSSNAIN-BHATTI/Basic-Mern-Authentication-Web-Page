import {BrowserRouter,Route,Routes} from "react-router-dom"
import { Home } from "./Home";
import { About } from "./About";
import { Contact } from "./Contact";
import { Service } from "./Service";
import { Register } from "./Register";
import { Login } from "./Login";
import { Navbar } from "./components/Navbar";
import { Error } from "./Error";
import { Logout } from "./Logout";
import { AdminLayout } from "./layouts/admin-Layout";
import { AdminContacts } from "./Admin-Contacts";
import { AdminUsers } from "./Admin-Users";
import { AdminUpdate } from "./Admin-Update";

const App= ()=>{
 return <>
 <BrowserRouter>
 <Navbar />
 <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/about" element={<About/>} />
  <Route path="/contact" element={<Contact/>} />
  <Route path="/service" element={<Service/>} />
  <Route path="/register" element={<Register/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/logout" element={<Logout/>} />
  <Route path="*" element={<Error/>}/>
  <Route path="/admin" element={<AdminLayout />}>
  <Route path="users" element={<AdminUsers/>} />
  <Route path="contacts" element={<AdminContacts/>} />
  <Route path="users/:id/edit" element={<AdminUpdate/>} />
  </Route>
 </Routes>
 </BrowserRouter>
 </>
};

export default App;
