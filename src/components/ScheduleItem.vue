<template>
  <q-card
    class="my-card"
    :style="{ 'background-color': category(item.categoryId).color }"
  >
    <!-- <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{item.date}}</q-item-label>
        <q-item-label caption>Subhead</q-item-label>
      </q-item-section>
    </q-item> -->
    <q-carousel
      v-model="slide"
      swipeable
      animated
      arrows
      navigation
      :fullscreen="fullscreen"
      infinite
      :autoplay="autoplay"
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
    <q-card-section>
      <div class="text-h6">
        {{ item.title }}
      </div>
      <!-- <div class="text-subtitle2">
        by John Doe
      </div> -->
    </q-card-section>
    <q-card-section class="q-pt-none">
      {{ lorem }}
    </q-card-section>
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
  // created(){
  //   console.log(this.item.date);
  // },
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

// <style lang="scss" scoped>
// @import '../styles/variables.scss';
// @import '../styles/mixins.scss';

// $cardWidth: 320px;

// * {
//   font-family: 'Helvetica';
//   box-sizing: border-box;
// }

// .app-component {
//   overflow: hidden;
//   width: $cardWidth;
//   margin: 0px 8px 8px 4px;
//   transition: transform .2s;
//   overflow: hidden;

//   @include for-desktop-up {
//     width: 400px;
//     min-width: 350px;
//   }

//   @include for-phone-only {
//     width: 350px;
//     margin: 8px 4px 24px 4px;
//   }
// }

// .card {
//   padding: 24px 32px;
//   max-width: $cardWidth;
// }

// .line-h16 {
//   line-height: 1em;
// }

// .img-box {
//   padding: 0px;
//   margin: 0px;
//   width: $cardWidth;
//   max-height: 250px;
//   overflow: hidden;

//   .img {
//     height: auto;
//     width: 100%;
//   }
// }

// span {
//   color: white;
// }

// .link {
//   text-decoration: none;
//   color: white;
// }

// </style>
