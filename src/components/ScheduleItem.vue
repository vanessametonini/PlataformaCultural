<template>
  <div class="app-component">
    <div
      class="card column"
      :style="{ 'background-color': category(item.categoryId).color }"
    >
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
    <!-- <div class="img-box">
      <q-img
        :src="item.imgUrl"
        :ratio="16/9"
        placeholder-src="statics/avatar01.jpg"
      />
      <img
        class="img"
        src="../assets/statics/avatar01.jpg"
      >
    </div> -->
  </div>
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
  computed: {
    ...mapGetters({
      category: 'categories/getCategoryById',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

$cardWidth: 320px;

* {
  font-family: 'Helvetica';
  box-sizing: border-box;
}

.app-component {
  overflow: hidden;
  width: $cardWidth;
  margin: 0px 8px 8px 4px;
  transition: transform .2s;
  overflow: hidden;

  @include for-desktop-up {
    width: 400px;
    min-width: 350px;
  }

  @include for-phone-only {
    width: 350px;
    margin: 8px 4px 24px 4px;
  }
}

.card {
  padding: 24px 32px;
  max-width: $cardWidth;
}

.line-h16 {
  line-height: 1em;
}

.img-box {
  padding: 0px;
  margin: 0px;
  width: $cardWidth;
  max-height: 250px;
  overflow: hidden;

  .img {
    height: auto;
    width: 100%;
  }
}

span {
  color: white;
}

.link {
  text-decoration: none;
  color: white;
}

</style>
