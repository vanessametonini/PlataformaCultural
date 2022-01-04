<template>
  <div class="profile">
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
  </div>
</template>
<script>
import PinsProfile from '../../components/NewPinsProfile.vue';
import TopicsProfile from '../../components/NewTopicsProfile.vue';
import EventsProfile from '../../components/NewEventsProfile.vue';

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
  }
}
</script>
<style lang="scss" scoped>
.profile {
   padding: 16px;
}

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
</style>