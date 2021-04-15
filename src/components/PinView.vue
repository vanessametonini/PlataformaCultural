<template>
  <q-card
    class="my-card"
    square
    :style="{ 'background-color': category(pinView.categoryId).color }"
  >
    <q-card-section>
      <div class="text-h6 text-black">
        {{ pinView.title }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none text-black">
      {{ pinView.description }}
    </q-card-section>

    <q-card-section class="q-pt-none text-black">
      {{ `${pinView.street}, ${pinView.number}, ${pinView.neighborhood}` }}
    </q-card-section>

    <q-card-section class="q-pt-none text-black">
      <q-list>
        <q-item
          v-if="pinView.link"
          clickable
          tag="a"
          target="_blank"
          :href="pinView.link"
        >
          <q-item-section avatar>
            <i class="fas fa-link"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Link</q-item-label>
            <q-item-label caption>{{ pinView.link }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="pinView.phone">
          <q-item-section avatar>
            <i class="fab fa-whatsapp"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Whatsapp</q-item-label>
            <q-item-label caption>{{ maskPhone(pinView.phone) }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="pinView.facebook" clickable tag="a" target="_blank" :href="pinView.facebook">
          <q-item-section avatar>
            <i class="fab fa-facebook"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>{{ pinView.facebook }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-if="pinView.instagram" tag="a" target="_blank" :href="pinView.instagram">
          <q-item-section avatar>
            <i class="fab fa-instagram"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Instagram</q-item-label>
            <q-item-label caption>{{ pinView.instagram }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      arrows
      navigation
      height="200px"
      :fullscreen="fullscreen"
      infinite
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide
        v-for="n in pinView.imageIds.length"
        :key="`full-${pinView.id}-${n}`"
        :name="n"
        :img-src="`${$store.getters['services/getImagePath']}${
          pinView.imageIds[n - 1]
        }`"
      />
      <template #control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]">
          <q-btn
            push
            round
            dense
            color="white"
            text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PinView",
  props: {
    pinView: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      autoplay: true,
      slide: 1,
      fullscreen: false,
    };
  },
  computed: {
    ...mapGetters({
      category: "categories/getCategoryById",
    }),
  },
  methods:{
    maskPhone(phone){
      var BRNumber = phone.toString().match(/(\d{2})(\d{5})(\d{4})/);
      return BRNumber = "(" + BRNumber[1] + ") " + BRNumber[2] + "-" + BRNumber[3];
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 320px

.my-slide
  width: 100%
  max-width: 100px

.fa-facebook
  color: rgb(59, 91, 152)
  font-size: 1.5rem

.fa-whatsapp
  color: green
  font-size: 1.5rem

.fa-instagram
  color: black
  font-size: 1.5rem

.fa-link
  color: black
  font-size: 1.5rem
</style>
