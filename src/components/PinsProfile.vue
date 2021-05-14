<template>
  <div class="pins-profile">
    <h3>Meus Pins</h3>
    <q-scroll-area
      :bar-style="barStyle"
    >
      <q-list>
        <q-item
          v-for="pin in $store.getters['pins/getMyPins']"
          :key="pin.id"
          v-ripple
          clickable
          :style="{ 'border-color': $store.getters['categories/getCategoryById'](pin.categoryId).color}"
          @click="$store.dispatch('pins/animatePin', { $router, pin })"
        >
          <q-item-section
            v-if="pin.imageIds[0]"
            avatar
          >
            <q-avatar square>
              <img
                :src="`${$store.getters['services/getImagePath']}${pin.imageIds[0]}`"
              >
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-white">
              {{ mask(pin.title) }}
            </q-item-label>
            <q-item-label caption>
              {{ mask(pin.street) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
export default {
  name: "PinsProfile",
  props: {},
  data() {
    return {
      barStyle: {
        right: "0",
        borderRadius: "4px",
        backgroundColor: "#fff",
        width: "4px",
        opacity: .8,
      },
    };
  },
  computed: {},
  methods: {
    mask(text) {
      const limit = 20;
      if (text.length > limit) return text.substring(0, limit) + "...";
      return text;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.pins-profile {
  @include profile-box;
  @include profile-scrolls;
}

</style>
