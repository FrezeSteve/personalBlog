import Home from "../containers/Index";
import Product from "../containers/Product";
import Article from "../containers/Article";
import Admin from "../containers/Admin";
import Login from "../containers/Login";
import EditOne from "../containers/EditOne";
// import Signup from "../containers/Signup";

const routes = [
  {
    path: "/",
    exact: true,
    strict: true,
    component: Home,
    id: "Home"
  },
  {
    path: "/add/",
    exact: true,
    strict: true,
    component: Product,
    id: "Product"
  },
  {
    path: "/article/:pid/",
    exact: true,
    strict: true,
    component: Article,
    id: "Article"
  },
  {
    path: "/admin/",
    exact: true,
    strict: true,
    component: Admin,
    id: "Admin"
  },
  {
    path: "/login/",
    exact: true,
    strict: true,
    component: Login,
    id: "Login"
  },
  {
    path: "/edit/:pid/",
    exact: true,
    strict: true,
    component: EditOne,
    id: "Edit"
  }
];
export default routes;
