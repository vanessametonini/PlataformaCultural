<template>
  <q-card
    square
    :style="{ 'background-color': category(pinView.categoryId).color }"
    class="pin-view"
  >
    <q-card-section class="card-title">
      <h2>{{ pinView.title }}</h2>
      <p>{{ category(pinView.categoryId).label }}</p>
    </q-card-section>

    <q-card-section class="card-description">
      <p>
        {{ pinView.description }}
      </p>
      <p>
        {{ `${pinView.street}, ${pinView.number || "S/N"}, ${pinView.neighborhood}` }}
      </p>
    </q-card-section>
    <q-card-section class="card-links">
      <q-list class="flex no-wrap">
        <q-item
          v-if="pinView.link"
          clickable
          tag="a"
          target="_blank"
          :href="pinView.link"
          title="Link"
        >
          <q-item-section avatar>
            <i class="fas fa-link" />
          </q-item-section>
        </q-item>

        <q-item
          v-if="pinView.phone"
          clickable
          tag="a"
          target="_blank"
          :href="`https://api.whatsapp.com/send?phone=55${pinView.phone}`"
          :title="`Whatsapp ${pinView.phone}`"
        >
          <q-item-section avatar>
            <i class="fab fa-whatsapp" />
          </q-item-section>
        </q-item>

        <q-item
          v-if="pinView.facebook"
          clickable
          tag="a"
          target="_blank"
          :href="pinView.facebook"
          title="Facebook"
        >
          <q-item-section avatar>
            <i class="fab fa-facebook" />
          </q-item-section>
        </q-item>
        <q-item
          v-if="pinView.instagram"
          clickable
          tag="a"
          target="_blank"
          :href="pinView.instagram"
          title="Instagram"
        >
          <q-item-section avatar>
            <i class="fab fa-instagram" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-carousel
      v-if="pinView.imageIds.length"
      v-model="slide"
      swipeable
      animated
      arrows
      navigation
      infinite
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      class="pin-carousel"
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
  name: "PinView",
  props: {
    pinView: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      slide: 1,
    };
  },
  computed: {
    ...mapGetters({
      category: "categories/getCategoryById",
    }),
  },
  methods: {
    maskPhone(phone) {
      var BRNumber = phone.toString().match(/(\d{2})(\d{5})(\d{4})/);
      return (BRNumber =
        "(" + BRNumber[1] + ") " + BRNumber[2] + "-" + BRNumber[3]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.pin-carousel {
  height: 300px;
}

.card-title h2 {
  font-size: 3em;
  font-weight: bolder;
  line-height: 1em;
  margin: 0 0 10px;
  padding: 0;
}

.card-title,
.card-description {
  color: white;
  padding: 32px 32px 0;

  p {
    margin: 0 0 10px;
  }
}

.my-slide {
  width: 100%;
  max-width: 100px;
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


@include for-phone-only {
  .pin-view {
    height: 100%;
  }

}

</style>
