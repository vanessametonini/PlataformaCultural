<template>
  <q-card
    square
    class="schedule-item"
    :style="{ 'background-color': category(item.categoryId).color }"
  >
    <q-card-section class="card">
      <div id="title" class="big-title bolder text-white">
        {{ item.title }}
      </div>
      <div class="csaption mg-top16 text-white">
        {{ `Dia ${$store.getters["formatDate"](item.dateTime)}` }}
      </div>
      <div class="caption text-white">
        {{ `Às ${$store.getters["formatTime"](item.dateTime)}` }}
      </div>
    </q-card-section>

    <q-card-section class="card col text-white pt-0">
      <span class="row body-3">
        {{ item.description }}
      </span>
      <span class="row body-2 mg-top32">
        {{ item.local }}
      </span>
      <span class="row caption" v-if="item.street">
        {{ `${item.street}, ${item.number}, ${item.neighborhood}` }}
      </span>
      <span class="row caption">
        {{ item.ticket? `R$ ${moeda(item.ticket)}` : "Gratuito"  }}
      </span>
    </q-card-section>

    <q-card-section class="card-links">
      <q-list class="flex no-wrap">
        <q-item
          v-if="item.link"
          clickable
          tag="a"
          target="_blank"
          :href="item.link"
          title="Link"
        >
          <q-item-section avatar>
            <i class="fas fa-link"></i>
          </q-item-section>
        </q-item>

        <q-item
          v-if="item.phone"
          clickable
          tag="a"
          target="_blank"
          :href="`https://api.whatsapp.com/send?phone=55${item.phone}`"
          :title="`Whatsapp ${item.phone}`"
        >
          <q-item-section avatar >
            <i class="fab fa-whatsapp"></i>
          </q-item-section>
        </q-item>

        <q-item
          v-if="item.facebook"
          clickable
          tag="a"
          target="_blank"
          :href="item.facebook"
          title="Facebook"
        >
          <q-item-section avatar>
            <i class="fab fa-facebook"></i>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-if="item.instagram"
          tag="a"
          target="_blank"
          :href="item.instagram"
          title="Instagram"
        >
          <q-item-section avatar>
            <i class="fab fa-instagram"></i>
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

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

#title {
  margin-left: -4px;
  margin-top: 0px;
  line-height: 2.5rem;
}

.schedule-item {
  margin-bottom: 16px;
}

.card {
  padding: 32px;
  position: relative;
}

.card-links {
  padding: 0 32px 32px;
  color: white;

  .flex.no-wrap.q-list{
    justify-content: flex-end;
  }

}

.fa-facebook,
.fa-whatsapp,
.fa-instagram,
.fa-link {
  color: white;
  font-size: 16px;
  margin-left: auto;
}
</style>
