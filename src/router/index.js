import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/plataforma',
    name: 'Plataforma',
    component: () => import('../views/Plataforma.vue'),
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('../views/Forum.vue'),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('../views/Terms.vue'),
  },
  {
    path: '/contato',
    name: 'Contato',
    component: () => import('../views/Contato.vue'),
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue'),
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/recover',
    name: 'Recover',
    component: () => import('../views/Recover.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
      adminAuth: true,
    },
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('../views/Schedule.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/topics', // todos os tópicos (debates)
    name: 'Topics',
    component: () => import('../views/Topics.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/topics/createTopic', // todos os tópicos (debates)
    name: 'CreateTopic',
    component: () => import('../views/CreateTopic.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/topics/:topicId', // página de um tópico
    name: 'TopicPage',
    component: () => import('../views/TopicPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/buffer',
    name: 'Buffer',
    component: () => import('../views/buffer.vue'),
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

store.dispatch('initStore');

Router.beforeEach((to, from, next) => {
  if (store.state.authenticated == null) {
    store.watch(() => store.state.authenticated, (status) => {
      if (status) {
        next();
      } else if (to.matched.some((record) => record.meta.requiresAuth)) {
        next('/signIn');
      } else {
        next();
      }
    });
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.authenticated) {
      next();
    } else {
      next('/signIn');
    }
  } else {
    next();
  }
});

export default Router;
