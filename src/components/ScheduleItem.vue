<template>
  <q-card
    square
    class="schedule-item"
    :style="{ 'background-color': category(item.categoryId).color }"
  >
    <q-card-section class="card">
      <h2 class="title">
        {{ item.title }}
      </h2>
      <p class="caption">
        {{ category(item.categoryId).label }}
      </p>
      <p class="date-info">
        {{ `Dia ${$store.getters["formatDate"](item.dateTime)}` }}
        <br>
        {{ `Às ${$store.getters["formatTime"](item.dateTime)}` }}
      </p>
    </q-card-section>

    <q-card-section class="card card-description col text-white">
      <span class="row body-3">
        {{ item.description }}
      </span>
      <span class="row body-2 mg-top16 bolder">
        {{ item.local }}
      </span>
      <span
        v-if="item.street"
        class="row caption"
      >
        {{ `${item.street}, ${item.number}, ${item.neighborhood}` }}
      </span>
      <span class="row caption">
        {{ item.ticket? `R$ ${moeda(item.ticket)}` : "Gratuito" }}
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
            <i class="fas fa-link" />
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
          <q-item-section avatar>
            <i class="fab fa-whatsapp" />
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
            <i class="fab fa-facebook" />
          </q-item-section>
        </q-item>
        <q-item
          v-if="item.instagram"
          clickable
          tag="a"
          target="_blank"
          :href="item.instagram"
          title="Instagram"
        >
          <q-item-section avatar>
            <i class="fab fa-instagram" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-carousel
      v-if="item.images.length"
      v-model="slide"
      swipeable
      animated
      arrows
      navigation
      height="200px"
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
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        />
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
.card {
  color: white;
  padding: 32px 32px 8px;
  position: relative;
}

.title {
  font-size: 2rem;
  font-weight: bolder;
  line-height: 2rem;
  margin: 0 0 10px;
  hyphens: auto;

}

.title + .caption {
  margin-bottom: 4px;
}

.date-info {
  margin: 0;
}

.card-description {
  padding-top: 16px;
  word-break: break-word;
  hyphens: auto;
}

.schedule-item {
  margin-bottom: 16px;
}

.card-links {
  padding: 0 32px 16px;
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
