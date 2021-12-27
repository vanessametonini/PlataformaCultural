<template>
  <q-layout view="hHh Lpr lff" container class="profile-layout">
    <q-header elevated class="bg-black" :style="[ !mobile ? {'background-color': '#fff !important'} : '']">
      <q-toolbar>
        <q-toolbar-title>
          <logo-card :mobile="mobile" />
        </q-toolbar-title>
        <nav class="row" v-if="!mobile">
          <pin-card
            class="card"
          />
          <event-card
            class="card"
          />
          <topic-card
            class="card"
          />
        </nav>
        <q-btn
          flat
          round
          dense
          icon="menu"
          v-if="mobile"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="isMobileMenuOpen"
      side="left"
      show-if-above
      bordered
      :width="width"
      :breakpoint="1023"
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <div class="menu-container">
          <div>
            <avatar-card v-if="user.avatarId" :user="user" />
            <img v-else :src="defaultImage" alt="Avatar" />
          </div>
          <div
            class="name-box q-pa-lg"
            :style="{ background: getCategoryColor }"
          >
            <span class="name"
              >{{ user.firstName }}<br />{{ user.lastName }}
            </span>
            <base-button class="edit" @click="$router.push(`/perfil/user/edit/${user.id}`)">editar perfil</base-button>
          </div>
          <div class="btn-box">
            <base-button :to="{ name: 'Home' }">voltar no mapa</base-button>
            <base-button
              @click="
                $store.dispatch('users/destroyToken');
                $router.push({ name: 'Home' });
              "
              >sair</base-button
            >
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { mapGetters } from "vuex";
import AvatarCard from "../components/AvatarCard.vue";
import BaseButton from "../components/BaseButton.vue";
import EventCard from "../components/EventCard.vue";
import PinCard from "../components/PinCard.vue";
import TopicCard from "../components/TopicsCard.vue";

export default {
  name: "Profile",
  components: {
    AvatarCard,
    BaseButton,
    EventCard,
    PinCard,
    TopicCard
  },
  data() {
    return {
      defaultImage: require("../assets/default.png"),
      isMobileMenuOpen: false,
      mobile: true,
      width: 210
    };
  },
  mounted() {
    if (this.$q.screen.width >= 1024) this.mobile = false;
    if (this.$q.screen.width >= 1800) this.width = 220;
  },
  computed: {
    ...mapGetters({
      user: "users/getCurrentUser",
    }),
    getCategoryColor() {
      return this.$store.getters["categories/getCategoryById"](
        this.user.categoryId
      ).color;
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-layout {
  min-height: 100vh;

  .card {
    margin-right: 8px;
    margin-bottom: 0;
  }

  .menu-container {
    padding: 30px 14px;

    .avatar {
      max-width: 100%;
    }
    .name-box {
      position: relative;
      min-height: 180px;

      .name {
        font-weight: bold;
        font-size: 28px;
        color: #fff;
        word-break: break-word;
      }

      .edit {
          position: absolute;
          right: 20px;
          bottom: 20px;
          text-decoration: underline;
          background: transparent;
        }
    }
    .btn-box {
      margin: 20px 0;

      .base-button {
        width: 100%;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;

      }
        
    }
  }

  @media screen and (min-width: 1024px) {
    .q-toolbar__title {
      max-width: 198px;
    }

    .q-btn{ 
      font-size: 20px;
      margin-bottom: -120px;
    }
    
    .avatar {
      height: 190px;
    }
  }

  @media screen and (min-width: 1800px) {
    .q-toolbar__title {
      max-width: 208px;
    }

    
  }
}
</style>