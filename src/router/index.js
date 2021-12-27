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
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/recover',
    name: 'Recover',
    component: () => import('../views/Recover.vue'),
    meta: {
      hideForAuth: true
    }
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
    path: '/perfil',
    component: () => import('../views/NovoPerfil.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'perfil',
        component: () => import('../views/profile/Sliders.vue'),
      },
      {
        path: ':service/:action',
        name: 'Perfil',
        component: () => import('../views/profile/_service/_action/index.vue')    
      },
      {
        path: ':service/:action/:id',
        name: 'Perfil',
        component: () => import('../views/profile/_service/_action/_id.vue')
      }
    ]
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
    path: '/agenda',
    name: 'Agenda',
    component: () => import('../views/Schedule.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/topics',
    name: 'Topics',
    component: () => import('../views/Topics.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/topics/create',
    name: 'CreateTopic',
    component: () => import('../views/CreateTopic.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/topics/:topicId',
    name: 'TopicPage',
    component: () => import('../views/TopicPage.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/reset-password/:recoverToken', 
    name: 'ResetPasswordPage',
    component: () => import('../views/ResetPassword.vue'),
    meta: {
      requiresAuth: false,
      hideForAuth: true
    }
  },
  {
    path: '/confirm-email/:confirmToken', 
    name: 'ConfirmEmailPage',
    component: () => import('../views/ConfirmEmail.vue'),
    meta: {
      requiresAuth: false,
      hideForAuth: true
    }
  },
  {
    path: '/documentation',
    redirect: () => {
      window.location.replace(`${process.env.VUE_APP_BASE_URL||''}documentation`)
    }
  }
];

const Router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
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
