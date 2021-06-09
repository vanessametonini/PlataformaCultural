<template>
  <div class="app-page profile-page">
    <div class="row no-wrap">
      <header class="col-auto">
        <logo-card class="mg-bottom8" />
        <avatar-card
          v-if="currentUser.avatarId"
          :user="currentUser"
          class="mg-bottom8"
        />
        <base-button
          class="btn-logout"
          theme="primary"
          @click="$store.dispatch('users/destroyToken'); $router.push({ name: 'Home' });"
        >
          sair
        </base-button>
      </header>
      <div class="col-auto">
        <nav class="row">
          <user-card
            class="card"
            :user="currentUser"
            @card-click="form = 'user'"
          />
          <pin-card
            class="card"
            @card-click="form = 'pin'"
          />
          <event-card
            class="card"
            @card-click="form = 'event'"
          />
          <topic-card
            class="card"
            @card-click="$router.push({ name: 'CreateTopic' })"
          />
        </nav>
        <main>
          <forms-profile
            class="forms"
            :form="form"
          />
        </main>
      </div>
      <div class="col">
        <topic-profile />
        <pins-profile @card-click="form = 'pin-editor'" />
        <events-profile />
      </div>
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
import EventsProfile from "../components/EventsProfile.vue";
import PinsProfile from "../components/PinsProfile.vue";
import TopicCard from "../components/TopicsCard.vue";
import TopicProfile from "../components/TopicProfile.vue";


export default {
  name: "ProfilePage",
  components: {
    BaseButton,
    AvatarCard,
    UserCard,
    EventCard,
    PinCard,
    FormsProfile,
    TopicCard,
    EventsProfile,
    PinsProfile,
    TopicProfile
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
  created() {
    this.$store.commit('users/SET_SELECTED_FORM', 'user');
    this.$store.dispatch('pins/loadPins');
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.profile-page {
  padding: 16px;
}

.btn-logout {
  font-size: 16px;
  width: 100%;
}

.card {
  margin-right: 8px;
}

nav.row {
  margin-left: 8px;
}

.forms {
  margin-left: 10px;
  width: calc(100% - 16px);
  background-color: #f5f5f5;
  padding: 16px 32px;
  margin-bottom: 60px;

  @include for-tablet-landscape-up {
    width: 585px;
  }

  @include for-big-desktop-up {
    width: 614px;
  }
}



</style>
