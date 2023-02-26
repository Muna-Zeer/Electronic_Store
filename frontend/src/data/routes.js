
import Dashboard from "../admin/Dashboard/dashboard.admin";
import Profile from "../admin/profile/profile.admin";
import editCategories from "../components/AdminFunctionality/category/edit-category.components";
import addCategory from "../components/AdminFunctionality/category/storeCategory.components";
import viewCategory from "../components/AdminFunctionality/category/view-category.components";
import order from "../components/AdminFunctionality/orders/orders.components";
import addproduct from "../components/AdminFunctionality/product/addproduct.components";
import editproduct from "../components/AdminFunctionality/product/editproduct.components";
import viewproduct from "../components/AdminFunctionality/product/view-product.components";
const routePath = [
  {
    path:'/admin',
    exact:true,
    name:"Admin"
  }
  ,{
    path: "/admin/dashboard",
    exact: true,
    name: "Dashboard",
    
    component: Dashboard,
  },
  {
    path:'/admin/profile',
    exact:true,
    name:'Profile',
    component:Profile,
  }
  ,{
   path:'/admin/add-category',
   exact:true,
   name:"addCategory",
   component:addCategory,
  },
  {path:'/admin/view-category',
   exact:true,
   name:"viewCategory",
   component:viewCategory,

},
{
   path:'/admin/edit-category/:id',
   exact:true,
   name:'editCategories',
   component:editCategories,
},
{
  path:'/admin/add-product',
  exact:true,
  name:'addproduct',
  component:addproduct,
},
{
  path:'/admin/view-product',
  exact:true,
  name:'viewproduct',
  component:viewproduct,
},
{
  path:'/admin/edit-product/:id',
  exact:true,
  name:'editproduct',
  component:editproduct,
},
{
  path:'/admin/orders',
  exact:true,
  name:'order',
  component:order,
}


];

export default routePath;
