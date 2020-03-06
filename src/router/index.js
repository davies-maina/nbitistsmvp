import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Overview from "../views/Admin/Overview.vue";
import Products from "../views/Admin/Products.vue";
import db from "../firebase/init";
import firebase from "firebase";
import Profile from "../views/Admin/Profile.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: { requiresAuth: true },

        children: [{
                path: "overview",
                name: "Overview",
                component: Overview
            },
            {
                path: "products",
                name: "Products",
                component: Products
            },
            {
                path: "profile",
                name: "Profile",
                component: Profile,
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    const currentUser = firebase.auth().currentUser;

    if (requiresAuth && !currentUser) {
        next("/");
    } else if (requiresAuth && currentUser) {
        next();
    } else {
        next();
    }
});

export default router;