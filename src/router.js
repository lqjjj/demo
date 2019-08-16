import Vue from 'vue'
import Router from 'vue-router'
import ShowBlog from "./components/ShowBlog";
import AddBlog from "./components/AddBlog";

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
    }
  ],
  mode:"history"
})
