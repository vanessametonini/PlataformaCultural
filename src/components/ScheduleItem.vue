<template>
  <q-card
    class="my-card"
    square
    :style="{ 'background-color': category(item.categoryId).color }"
  >
    <q-card-section>
      <div class="text-h6 text-black">
        {{ item.title }}
      </div>
      <div class="text-subtitle2 text-black">
        {{ `Dia ${$store.getters["formatDate"](item.dateTime)}` }}
      </div>
      <div class="text-subtitle3 text-black">
        {{ `Às ${$store.getters["formatTime"](item.dateTime)}` }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none text-black">
      {{ item.description }}
    </q-card-section>

    <q-card-section class="q-pt-none text-black">
      {{ `${item.street}, ${item.number}, ${item.neighborhood}` }}
    </q-card-section>
    <q-card-section class="q-pt-none text-black">
      {{ `R$ ${moeda(item.ticket)}` }}
    </q-card-section>

    <q-card-section class="q-pt-none text-black">
      <q-list>
        <q-item
          v-if="item.link"
          clickable
          tag="a"
          target="_blank"
          :href="item.link"
        >
          <q-item-section avatar>
            <i class="fas fa-link"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Link</q-item-label>
            <q-item-label caption>{{ item.link }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="item.whatsapp">
          <q-item-section avatar>
            <i class="fab fa-whatsapp"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Whatsapp</q-item-label>
            <q-item-label caption>{{ item.whatsapp }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="item.facebook" clickable tag="a" target="_blank" :href="item.facebook">
          <q-item-section avatar>
            <i class="fab fa-facebook"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>{{ item.facebook }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-if="item.instagram" tag="a" target="_blank" :href="item.instagram">
          <q-item-section avatar>
            <i class="fab fa-instagram"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Instagram</q-item-label>
            <q-item-label caption>{{ item.instagram }}</q-item-label>
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
        v-for="n in item.images.length"
        :key="`full-${item.id}-${n}`"
        :name="n"
        :img-src="`${$store.getters['services/getImagePath']}${
          item.images[n - 1]
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
  name: "ScheduleItem",
  props: {
    item: {
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
  methods: {
    moeda(valor) {
      const v = (
        (
          (valor * 100).toString().replace(".", "").replace(/\D/g, "") / 100
        ).toFixed(2) + ""
      ).split(".");
      const m = v[0]
        .split("")
        .reverse()
        .join("")
        .match(/.{1,3}/g);
      for (let i = 0; i < m.length; i++)
        m[i] = m[i].split("").reverse().join("") + ".";
      const r = m.reverse().join("");
      return r.substring(0, r.lastIndexOf(".")) + "," + v[1];
    },
  },
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
  color: #4FCE5D
  font-size: 1.5rem

.fa-instagram
  color: black
  font-size: 1.5rem

.fa-link
  color: black
  font-size: 1.5rem
</style>
