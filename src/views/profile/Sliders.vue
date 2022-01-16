<template>
  <div class="profile">
    <template v-if="pins || events || topics">
      <section class="profile-carousel">
        <h2>Meus Pins</h2>
        <pins-profile />
      </section>
      <section class="profile-carousel">
        <h2>Meus Debates</h2>
        <topics-profile />
      </section>
      <section class="profile-carousel">
        <h2>Meus Eventos</h2>
        <events-profile />
      </section>
    </template>
    <template v-else>
      <h2 class="empty">
        Faça sua primeira colaboração, insira seu <router-link
          class="link"
          to="/profile/pins/add"
        >
          pin
        </router-link>, um <router-link
          class="link"
          to="/profile/events/add"
        >
          evento
        </router-link> ou <router-link
          class="link"
          to="/profile/topics/add"
        >
          debate
        </router-link>.
      </h2>
    </template>
  </div>
</template>
<script>
import PinsProfile from '../../components/PinsProfile.vue';
import TopicsProfile from '../../components/TopicsProfile.vue';
import EventsProfile from '../../components/EventsProfile.vue';

export default {
  name: "Sliders",
  components: {
    PinsProfile,
    TopicsProfile,
    EventsProfile
  },
  data () {
    return {
      topicSlider: 1,
      eventSlider: 1,
    }
  },
  computed: {
   pins() {
     return this.$store.getters['pins/getMyPins'].length > 0;
   },
   events() {
     return this.$store.getters['events/getMyEvents'].length > 0;
   },
   topics() {
     return this.$store.getters['topics/getMyTopics'].length > 0;
   }

  }
}
</script>
<style lang="scss" scoped>
.profile {
   padding: 32px;

  .profile-carousel {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;

    h2 {
      font-size: 2em;
      font-weight: bolder;
      margin: 0 0 10px;
      position: relative;
      align-self: flex-start;

    }

    .btn-add {
      background: black;
      bottom: -40px;
      color: white;
      content: "+";
      cursor: pointer;
      display: block;
      font-size: 1em;
      font-weight: bolder;
      height: 50px;
      right: -10px;
      line-height: 50px;
      position: absolute;
      text-align: center;
      text-decoration: none;
      width: 50px;
      z-index: 1;
    }


  }
  .empty {
    font-size: 1.8rem;
    font-weight: bold;

    @media screen and (min-width: 1024px) {
      max-width: 360px;      
    }
  }

  .link {
    color: #000;
  }
}
</style>