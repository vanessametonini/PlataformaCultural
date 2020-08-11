<template>
  <div class="app-page profile-page">
    <div class="content row no-wrap">
      <button
        class=""
        style="height: 60px; width: 150px; background-color: black;"
        @click="logout()"
      >
        <span class="body-2 text-white">sair</span>
      </button>
      <!-- FIRST COLUMN -->
      <div class="column">
        <!-- IDENTITY & USER IMG -->
        <div class="profile-brand row">
          <logo-card
            class="logo"
            :black-mode="true"
            size="200"
          />

          <div class="img-box">
            <img
              class="user-img"
              src="../assets/statics/avatar01.jpg"
              alt="Imagen não encontrada"
              height="200px"
              width="200px"
            >
          </div>
        </div>

        <!-- USER INFO -->
        <div class="user-info">
          <user-card
            class="profile-card"
            :theme="theme"
            :user="currentUser"
            @emitLogout="logout()"
          />
        </div>
      </div>

      <!-- PIN -->
      <div class="pin">
        <pin-editor v-if="!1" />
        <pin-teste
          :fetch="myPinState"
          :item="myPin"
        />
      </div>

      <!-- EVENT (CREATE/EDIT) -->
      <div class="event">
        <event-editor />
      </div>

      <!--  EVENTS GRID -->
      <div class="events">
        <q-scroll-area
          class="scrollArea"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
        >
          <div
            v-for="item in myEvents"
            :key="item.id"
            class="event-item"
          >
            <collaped-event-view :item="item" />
            <!-- <span> {{ item.newEvent }} </span> -->
          </div>
        </q-scroll-area>
      </div>
    </div>

    <div class="show column">
      <!-- <q-btn outlined @click="login()" label="login" style="heigth: 30px; width: 60px; background-color: white;"/> -->
      <!-- <q-btn outlined @click="logout()" label="logout" style="heigth: 30px; width: 60px; background-color: white;"/> -->
      <!-- show pin status and data -->
      <!-- <span class="status"> pin:store:status = {{ userPinStatus }} </span> -->
      <!-- <span class="pin-status"> {{ getPinUser }} </span> -->

      <!-- show my events lenght and data -->
      <!-- <span class="status"> store -> token = {{ getStateToken }} <br> </span> -->
      <!-- <span class="status"> store -> key = {{ getKeyToken }} <br> </span> -->
      <!-- <span class="status"> myEvents size = {{ myEventsSize }} <br> </span> -->
      <!-- <span class="pin-status"> {{ getMyEvents }} </span> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserCard from '../components/UserCard.vue';
import PinEditor from '../components/PinEditor.vue';
import EventEditor from '../components/EventEditor.vue';
import CollapedEventView from '../components/CollapsedEvent.vue';
import PinTeste from '../components/pinTeste.vue';

export default {
  name: 'ProfilePage',
  components: {
    UserCard,
    PinEditor,
    EventEditor,
    CollapedEventView,
    PinTeste,
  },
  data() {
    return {
      currentUser: {
        name: 'none',
        email: 'none@email.com',
        categoryId: 8,
      },
      theme: {
        label: 'none',
        value: '0',
        color: '#AD3B3B',
      },
      userImg: '../assets/statics/avatar01.jpg',
      thumbStyle: {
        right: '0px',
        borderRadius: '0px',
        backgroundColor: '#111111',
        width: '9px',
        heigth: '5px',
        opacity: 0.75,
      },
      barStyle: {
        right: '0px',
        borderRadius: '0px',
        backgroundColor: '#f5f5f5',
        width: '9px',
        opacity: 0.2,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    ...mapGetters({
      currentUser: 'users/loadCurrentUser',
      myPin: 'users/getMyPin',
      myPinState: 'users/getMyPinState',
      myEvents: 'users/getMyEvents',
    }),
  },
  created() {
    this.loadCurrentUser();
  },
  beforeMounted() {
    this.getPageTheme();
  },
  methods: {
    async loadCurrentUser() {
      this.currentUser = await this.$store.dispatch('users/loadCurrentUser');
    },
    logout() {
      this.$store.dispatch('users/destroyToken')
        .then(
          this.$router.push({ name: 'Home' }),
        ).catch((error) => {
          console.log(error);
        });
    },
    setNewkey() {
      this.$store.dispatch('setKey');
      console.log('setNewKey');
    },
    showEditInfo() {
      this.opemEditInfo = !this.opemEditInfo;
    },
    async getPageTheme() {
      const id = this.currentUser.categoryId;
      console.log('id', id);
      this.theme = await this.$store.dispatch('categories/getCategoryTheme', { id });
      console.log('theme', this.theme);
    },
  },
};
</script>
<style lang="scss" scoped>

@import '../styles/variables.scss';
@import '../styles/mixins.scss';

* {
  font-family: 'Helvetica-Bold';
  box-sizing: border-box;
}

.show {
  position: absolute;
  top: 500px;
  left: 24px;
  width: 400px;
  background-color: #000;

  .status {
    color: red;
    font-size: 0.9rem;
  }

  .pin-status {
    color: white;
    font-size: 0.9rem;
  }
}

.profile-page {
  display: flex;
  align-items: flex-start;
  border-radius: 0px;
  background-color: white;
  padding: 24px;
  width: 100%;

  @media screen and (min-width: 1200px) {
    align-items: center;
    justify-content: center;
  }
}

.content {
  width: 100%;
  height: 100%;
}

span {
  font-family: 'Helvetica-Normal';
  font-weight: bolder;
  font-size: 2em;
  color: white;
  margin: 16px;
}

// ------------------------- components -----------------------------------------------------

.profile-brand {
  height: 200px;
  width: 400px;
  margin: 2px;
  overflow: hidden;
}

.user-info {
  margin: 2px;
}

.pin {
  // max-width: 350px;
  margin: 2px;
  overflow: hidden;
}

.event {
    margin: 2px;
}

.events {
  height: 100%;
  // max-width: 410px;
  margin: 2px;
  position: relative;

  .scrollArea {
    height: 600px;
    width: 212px;
  }

  .event-item {
    width: 200px;
    height: 200px;
    margin-bottom: 4px;
    margin-right: 4px;
  }

}

// ---------------------------------- others ---------------------------------------------
.edit-info {
  height: 0px;
  width: 100%;
  margin-top: 8px;
  background-color: $edit;
  transition: 1.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  opacity: 1;
}

.active-edit-info {
  height: 50px;
}

// --------------------------------- start container components --------------------------
.context {
  margin-top: 8px;
  width: 100%;
  height: 100%;
  padding: 0px;
}

</style>
