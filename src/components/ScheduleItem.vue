<template>
  <q-card
    class="my-card"
    square
    :style="{ 'background-color': category(item.categoryId).color }"
  >
    <q-card-section>
      <div class="text-h6 text-black  ">
        {{ item.title }}
      </div>
      <div class="text-subtitle2 text-black ">
        {{ `Dia ${$store.getters['formatDate'](item.dateTime)}` }}
      </div>
      <div class="text-subtitle3 text-black ">
        {{ `Às ${$store.getters['formatTime'](item.dateTime)}` }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none text-black ">
      {{ item.description }}
    </q-card-section>

    <q-card-section class="q-pt-none text-black ">
      {{ `${item.street}, ${item.number}, ${item.neighborhood}` }}
    </q-card-section>
    <q-card-section class="q-pt-none text-black ">
      {{ `R$ ${moeda(item.ticket)}` }}
    </q-card-section>
    <q-card-section class="q-pt-none text-black ">
      <a
        class="q-pt-none text-black "
        :href="item.link"
      >{{ `${item.link}` }}</a>
    </q-card-section>

    <i class="fab fa-whatsapp">ddd</i>
    <q-icon
      flat
      round
      color="gray"
      class="fab fa-whatsapp"
      size="10px"
    />
    <!-- <q-item-section>
        <q-item-label>{{`${item.user.firstName} ${item.user.lastName}`}}</q-item-label>
        <q-item-label caption>{{`${$store.getters['categories/getCategoryById'](item.categoryId).label}`}}</q-item-label>
      </q-item-section> -->
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
        :img-src="`${$store.getters['services/getImagePath']}${item.images[n-1]}`"
      />
      <template #control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        >
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
  <!-- <div class="app-component">
    <div
      class="card column"
      :style="{ 'background-color': category(item.categoryId).color }"
    >
      <div class="q-pa-md">
        <q-carousel
          v-model="slide"
          swipeable
          animated
          arrows
          :fullscreen="fullscreen"
          infinite
        >
          <q-carousel-slide
            :name="1"
            img-src="https://cdn.quasar.dev/img/mountains.jpg"
          />
          <q-carousel-slide
            :name="2"
            img-src="https://cdn.quasar.dev/img/parallax1.jpg"
          />
          <q-carousel-slide
            :name="3"
            img-src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          <q-carousel-slide
            :name="4"
            img-src="https://cdn.quasar.dev/img/quasar.jpg"
          />

          <template #control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
            >
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
      </div>
      <span class="big-title bolder line-h16"> {{ item.title }} </span>
      <span class="caption bolder mg-top8"> {{ category(item.categoryId).label }} </span>

      <div class="row mg-top16">
        <span class="body-2 bolder"> Dia {{ item.date }} </span>
        <span class="body-2 bolder mg-left16"> às {{ item.time }} </span>
      </div>

      <span class="body-2 bolder mg-top32"> {{ item.description }} </span>

      <div class="row mg-top32">
        <span class="body-3"> {{ item.street }}, {{ item.neighborhood }} </span>
      </div>

      <span class="body-3">Entrada:  R$ {{ item.ticket }} </span>

      <a
        class=" link body-3 bolder mg-top16"
        target="blank"
        :href="item.link"
      >.link do evento</a>
    </div>  
  </div> -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ScheduleItem',
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
      category: 'categories/getCategoryById',
    }),
  },
  methods:{
    moeda(valor){
      console.log(valor);
      const v = (((valor*100).toString().replace(".", "").replace(/\D/g, '') / 100).toFixed(2) + '').split('.');
      const m = v[0].split('').reverse().join('').match(/.{1,3}/g);
      for (let i = 0; i < m.length; i++)
          m[i] = m[i].split('').reverse().join('') + '.';
      const r = m.reverse().join('');
      return r.substring(0, r.lastIndexOf('.')) + ',' + v[1];
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
</style>
