import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "signIn" */ '../views/SignIn.vue'),
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signUp" */ '../views/SignUp.vue'),
  },
  {
    path: '/recover',
    name: 'Recover',
    component: () => import(/* webpackChunkName: "recover" */ '../views/Recover.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
      adminAuth: true,
    },
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import(/* webpackChunkName: "schedule" */ '../views/Schedule.vue'),
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: '/topics', // todos os tópicos (debates)
    name: 'Topics',
    component: () => import(/* webpackChunkName: "Topics" */ '../views/Topics.vue'),
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: '/topics/createTopic', // todos os tópicos (debates)
    name: 'CreateTopic',
    component: () => import(/* webpackChunkName: "Topics" */ '../views/CreateTopic.vue'),
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: '/topics/:topicId', // página de um tópico
    name: 'TopicPage',
    component: () => import(/* webpackChunkName: "topic" */ '../views/TopicPage.vue'),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import(/* webpackChunkName: "terms" */ '../views/Terms.vue'),
  },
  {
    path: '/faq',
    name: 'Faq',
    component: () => import(/* webpackChunkName: "faq" */ '../views/Faq.vue'),
  },
  {
    path: '/test',
    name: 'ViewTest',
    component: () => import(/* webpackChunkName: "teste" */ '../views/ViewTest.vue'),
  },
  {
    path: '/buffer',
    name: 'Buffer',
    component: () => import(/* webpackChunkName: "teste" */ '../views/buffer.vue'),
  },
];

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition;
  }
  const position = {};
  // new navigation.
  // scroll to anchor by returning the selector
  if (to.hash) {
    position.selector = to.hash;

    if (to.name === 'Terms') {
      // specify offset of the element
      if (to.hash === '#terms') {
        return {
          selector: to.hash,
        };
      }
      // position.offset = { y: 1200 };
      // } else if (to.hash === '#privacity') {
      //   return {
      //     selector: to.hash,
      //   };
      //   // position.offset = { y: 0 };
      // }
    }
  }
  // check if any matched route config has meta that requires scrolling to top
  if (to.matched.some((m) => m.meta.scrollToTop)) {
    // cords will be used if no selector is provided,
    // or if the selector didn't match any element.
    position.x = 0;
    position.y = 0;
  }
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  return position;
};

const Router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior,
});

Router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // const accessToken = localStorage.getItem('access_token');
    // const accessToken = sessionStorage.getItem('access_token');
    const accessToken = true;
    console.log(`to ${to.name}`);
    if (to.name !== 'SignIn' && !accessToken) {
      next({
        path: '/signIn',
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default Router;
