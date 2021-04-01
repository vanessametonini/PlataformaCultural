<template>
  <div class="app-page profile-page">
    <div class="row no-wrap">
      <div class="col-auto">
        <logo-card />
        <avatar-card :user="currentUser" />
        <out-card @logout-click="$store.dispatch('users/destroyToken'); $router.push({ name: 'Home' });" />
      </div>
      <div class="col-auto">
        <div class="row no-wrap ">
          <user-card
            :user="currentUser"
            @card-click="form = 'user'" 
          />
          <pin-card @card-click="form = 'pin'" />
          <event-card @card-click="form = 'event'" />
        </div>
        <forms-profile :form="form" />
      </div>
      <div class="col-auto">
        <events-profile />
        <pins-profile />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "../components/UserCard.vue";
import EventCard from "../components/EventCard.vue";
import PinCard from "../components/PinCard.vue";
import AvatarCard from "../components/AvatarCard.vue";
import OutCard from "../components/OutCard.vue";
import EventsProfile from "../components/EventsProfile.vue";
import FormsProfile from "../components/FormsProfile.vue";
import PinsProfile from "../components/PinsProfile.vue";


export default {
  name: "ProfilePage",
  components: {
    EventCard,
    UserCard,
    PinCard,
    AvatarCard,
    OutCard,
    EventsProfile,
    FormsProfile,
    PinsProfile,
  },
  data() {
    return {
      form: 'user',
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "users/getCurrentUser",
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";
@import "../styles/typo.scss";

.profile-page {
  padding: 16px;
}

</style>
