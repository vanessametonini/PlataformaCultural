<template>
  <div class="app-page profile-page">
    <div class="row no-wrap">
      <header class="col-auto">
        <logo-card />
        <avatar-card :user="currentUser" />
        <base-button
          class="btn-logout"
          theme="primary"
          @click="$store.dispatch('users/destroyToken'); $router.push({ name: 'Home' });"
        >
          sair
        </base-button>
      </header>
      <div class="col-auto">
        <nav class="row no-wrap">
          <user-card
            :user="currentUser"
            @card-click="form = 'user'"
          />
          <pin-card
            class="pin-card"
            @card-click="form = 'pin'"
          />
          <event-card @card-click="form = 'event'" />
        </nav>
        <main>
          <forms-profile
            class="forms"
            :form="form"
          />
        </main>
      </div>
      <!-- <aside class="col-auto">
        <events-profile />
        <pins-profile />
      </aside> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseButton from "../components/BaseButton.vue";
import AvatarCard from "../components/AvatarCard.vue";
import UserCard from "../components/UserCard.vue";
import EventCard from "../components/EventCard.vue";
import PinCard from "../components/PinCard.vue";
import FormsProfile from "../components/FormsProfile.vue";
// import EventsProfile from "../components/EventsProfile.vue";
// import PinsProfile from "../components/PinsProfile.vue";

export default {
  name: "ProfilePage",
  components: {
    BaseButton,
    AvatarCard,
    UserCard,
    EventCard,
    PinCard,
    FormsProfile,
    //EventsProfile,
    //PinsProfile,
  },
  data() {
    return {
      // form: 'user',
    };
  },
  computed: {
    form:{
      get(){
        return this.$store.state.users.selectedForm;
      },
      set(form){
        this.$store.commit('users/SET_SELECTED_FORM', form);
      }
    },
    ...mapGetters({
      currentUser: "users/getCurrentUser",
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.profile-page {
  padding: 16px;
}

.avatar,
.logo-box {
  margin-bottom: 10px;
}

.btn-logout {
  font-size: 16px;
  width: 100%;
}

.pin-card,
nav.row {
  margin: 0 10px;
}

.forms {
  margin: 10px auto;
  width: 90%;
}

</style>
