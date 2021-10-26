<template>
  <div>
    <section class="profile-carousel">
      <h2>
        Meus Pins
        <router-link
          to="profile/pins/add"
          aria-label="Adicionar Pin no mapa"
          class="btn-add"
        >
          +
        </router-link>
      </h2>
      <pins-profile />
    </section>
  </div>
</template>
<script>
import PinsProfile from '../../components/PinsProfile.vue';

export default {
  name: "Sliders",
  components: {
    PinsProfile,
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
.profile-carousel {

  h2 {
    font-size: 2em;
    font-weight: bolder;
    margin: 0;
    position: relative;
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