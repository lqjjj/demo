import Vue from 'vue'
import Router from 'vue-router'
import ShowBlog from "./components/ShowBlog";
import AddBlog from "./components/AddBlog";
import ManageBlog from "./components/ManageBlog";
import EditBlog from "./components/EditBlog";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      component:ShowBlog
    },
    {
      path:'/add',
      component: AddBlog
    },
    {
      path:'/manage',
      component:ManageBlog
    },
    {
      path:'/edit',
      component:EditBlog
    },
  ],
  mode:"history"
})
