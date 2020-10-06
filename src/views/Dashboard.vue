<template>
  <div class="container">
    <!-- dashboar -->
    <div class="dashboard column">
      <!-- actions -->
      <div class="user-actions row">
        <q-chip>
          <q-avatar
            square
            size="xl"
          >
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          Admin
        </q-chip>

        <!-- <q-btn square @click="logout()" label="logout" size="sm" color="black"/> -->
        <q-btn
          flat
          label="sair"
          color="black"
          @click="logout()"
        />
      </div>

      <div class="admin-options column jus-items-center" />
    </div>

    <div class="content">
      <q-tabs
        v-model="tab"
        dense
        class="text-black"
        active-color="primary"
        indicator-color="orange-5"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="request"
          label="Requisições"
        />
        <q-tab
          name="users"
          label="Todos Usuários"
        />
        <q-tab
          name="categories"
          label="Categorias"
        />
        <q-tab
          name="pins"
          label="Pins"
        />
        <q-tab
          name="events"
          label="Eventos"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel name="request">
          <div class="text-h6">
            Re
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="users">
          <div class="text-h6">
            Alarms
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="categories">
          <div class="text-h6">
            categories
          </div>
          <div class="add-categories">
            <span class="spaced-32"> {{ category }} </span>
            <q-input
              v-model="category"
              dense
              square
              outlined
              class="input mg-top16"
              label="Nome"
            />

            <q-btn
              outlined
              class=""
              color="black"
              @click="addCategorie()"
            >
              <span class="span-btn">adicionar categoria</span>
            </q-btn>
          </div>
        </q-tab-panel>

        <q-tab-panel name="pins">
          <div class="text-h6">
            Pins
          </div>
        </q-tab-panel>

        <q-tab-panel name="events">
          <div class="text-h6">
            Movies
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <!-- <q-tab-panel name="pins">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel> -->
      </q-tab-panels>
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
export default {
  name: 'Profile',
  data() {
    return {
      tab: '',
      category: '',
    };
  },
  computed: {
    signedIn() {
      return this.$store.getters.signedIn;
    },
    // props de user-card
    getUser() {
      return this.$store.getters.currentUser;
    },
    // props de pin-profile
    getPinUser() {
      return this.$store.getters.myPin;
    },
    getPinStatus() {
      return this.$store.getters.pinCompleted; // verifica se o usuário possui um pin
    },
    // show infos from store
    myEventsSize() {
      return this.$store.state.myEvents.length;
    },
    getMyEvents() {
      const showMyEvents = this.$store.getters.myEvents;
      return showMyEvents;
    },
  },
  methods: {
    addCategorie() {
      this.$store.dispatch('addCategorie', {
        name: this.category,
      })
        .then(() => {
          console.log('compTest : add categorie');
        });
    },
    logout() {
      this.$store.dispatch('destroyToken');
      console.log('dashboard : try logout');
    },
    showEditInfo() {
      this.opemEditInfo = !this.opemEditInfo;
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

.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 0px;
  // background-color: #f5f5f5;
  background-color: white;
  padding: 8px;
  width: 100%;
  height: 100vh;

  @media screen and (min-width: 1200px) {
    align-items: center;
    justify-content: center;
  }
}

.dashboard {
  width: 350px;
  height: 100%;
  padding: 8px;
  background-color: white;
}

.user-actions {
  padding: 8px;
  border: 2px solid pink;
}

.admin-options {
  // background-color: #f5f5f5;
  padding: 4px;
}

.btn {
  max-width: 180px;
}

.add-categories {
  width: 350px;
  background-color: transparent;
}

.content {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.show {
  position: absolute;
  top: 500px;
  left: 24px;
  // height: 200px;
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

span {
  font-family: 'Helvetica';
  font-weight: bolder;
  font-size: 2em;
  color: white;
  margin: 16px;
}

// ------------------------- components -----------------------------------------------------

</style>
