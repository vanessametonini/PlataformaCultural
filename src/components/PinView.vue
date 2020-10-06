<template>
  <div class="pin-component">
    <div
      class="content"
      :style="{ 'background-color' : getColor.color }"
    >
      <!-- <span>{{ options }}</span> -->
      <!-- <span>{{ getColor }}</span> -->
      <!-- <span>{{ pinView }}</span> -->

      <span class="title-1 bolder line-h16"> {{ this.pinView.title }} </span>
      <!-- <span class="body-2 bold mg-n-8"> {{ category.value.toLowerCase() }} </span> -->

      <span class="body-2 bolder spaced-32"> {{ this.pinView.description }} </span>

      <div class="row spaced-16">
        <span class="body-2 bolder"> {{ this.pinView.street }} - {{ this.pinView.neighborhood }} - {{ this.pinView.number }} </span>
      </div>

      <span class="body-2 bolder spaced-16"> {{ this.pinView.phone }} </span>

      <div class="links row mg-top16">
        <a
          class="link caption bolder"
          target="blank"
          :href="this.pinView.linkF"
        >.facebook</a>
        <a
          class="link caption bolder mg-left16"
          target="blank"
          :href="this.pinView.linkIG"
        >.instagram</a>
        <a
          class="link caption bolder mg-left16"
          target="blank"
          :href="this.pinView.otherLink"
        >.link</a>
      </div>
    </div>

    <div class="img-box">
      <img
        class="img"
        :src="this.pinView.imgUrl"
        width="350px"
      >
    </div>

    <div
      class="pin-view-tip-container"
      :style="{ 'background-color' : getColor.color }"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PinView',
  props: {
    pinView: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      categoryId: this.pinView.categoryId,
      title: '',
      email: '',
      phone: '',
      street: '',
      neighborhood: '',
      number: '',
      city: '',
      cep: '',
      description: '',
      linkF: '',
      linkIG: '',
      otherLink: '',
      imgUrl: '',
    };
  },
  // mounted() {
  //   this.setCategory();
  // },
  computed: {
    ...mapGetters({
      options: 'categories/loadCategories',
    }),
    getColor() {
      const target = this.options.find((item) => item.value === this.categoryId.toString());
      return target;
    },
  },
  methods: {
    // setColor() {
    //   const target = this.options.find((item) => item.categoryId === this.item.categoryId);
    // },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.pin-component {
  width: 300px;
  background-color: transparent !important;
  margin: 0px;
  padding: 0px;
  position: relative;
}

.content {
  padding: 32px 32px 16px 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
}

span {
  color: white;
}

.link {
  text-decoration: none;
  color: white;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(90%);
  }
}

.img-box {
  width: inherit;
  // height: auto;
  overflow: hidden;
  position: relative;
  z-index: 2;

  .img {
    height: inherit;
    max-height: 200px;
    width: inherit;
    margin-bottom: -10px;
  }
}

.pin-view-tip-container {
  height: 20px;
  width: 20px;
  overflow: hidden;
  position: absolute;
  left: 50%;
  z-index: 0;
  transform: translateX(-50%);
  margin: 0;
  clip-path: polygon(100% 0, 0 0, 48% 85%);
}

</style>
