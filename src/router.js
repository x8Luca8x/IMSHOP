import auth from "./auth";
import { createRouter, createWebHashHistory } from "vue-router";

import defaultLayout from "./layouts/side-nav-outer-toolbar";
import simpleLayout from "./layouts/single-card";

function loadView(view) {
  return () => import (/* webpackChunkName: "login" */ `./views/${view}.vue`)
}

const router = new createRouter({
  routes: [
    {
      path: "/home",
      name: "home",
      meta: {
        requiresAuth: false,
        layout: defaultLayout
      },
      component: loadView('HomeView')
    },
    {
      path: "/article/:id?",
      name: "article",
      meta: {
        requiresAuth: false,
        layout: defaultLayout
      },
      component: loadView('ArticleView'),
      props: true
    },
    {
      path: "/search/:searchQuery?",
      name: "search",
      meta: {
        requiresAuth: false,
        layout: defaultLayout
      },
      component: loadView('SearchView'),
      props: true
    },
    {
      path: "/cart",
      name: "cart",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: loadView('CartView')
    },
    {
      path: "/login-form",
      name: "login-form",
      meta: {
        requiresAuth: false,
        layout: simpleLayout
      },
      component: loadView('LoginForm')
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/recovery",
      redirect: "/home"
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/home"
    }
  ],
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {

  if (to.name === "login-form" && auth.loggedIn()) {
    next({ name: "home" });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        name: "login-form",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
