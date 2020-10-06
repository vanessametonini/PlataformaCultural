<template>
  <div class="app-component">
    <div
      class="card column"
      :style="{ 'background-color': category.color }"
    >
      <span class="big-title bolder line-h16"> {{ title }} </span>
      <span class="caption bolder mg-top8"> {{ category.label }} </span>

      <div class="row mg-top16">
        <span class="body-2 bolder"> {{ formatDate }} </span>
        <!-- <span class="body-2 bold"> {{ date.year }} </span> -->
        <span class="body-2 bolder mg-left16"> {{ formatTime }} </span>
      </div>

      <span class="body-2 bolder mg-top32"> {{ description }} </span>

      <div class="row mg-top32">
        <span class="body-3"> {{ address.street }}, {{ address.neighborhood }} </span>
      </div>

      <span class="body-3">Entrada: {{ ticket }} </span>

      <a
        class=" link body-3 bolder mg-top16"
        target="blank"
        :href="link"
      >.link do evento</a>
    </div>

    <div class="img-box">
      <!-- <q-img :src="img" :ratio="16/9" placeholder-src="statics/avatar01.jpg"/> -->
      <img
        class="img"
        src="../assets/statics/avatar01.jpg"
      >
    </div>
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
  data() {
    return {
      id: this.item.id,
      title: this.item.title,
      date: this.item.date,
      time: this.item.time,
      address: this.item.address,
      ticket: this.item.ticket,
      link: this.item.link,
      description: this.item.description,
      categoryId: this.item.categoryId,
      category: {
        label: '',
        value: '0',
        color: '#000',
      },
      img: this.item.imgUrl,
    };
  },
  computed: {
    ...mapGetters({
      options: 'categories/loadCategories',
    }),
    formatDate() {
      const d = new Date(this.date);
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Junho', 'Julho', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const month = monthNames[d.getMonth()];
      let day;
      if (d.getDate().toString().length === 1) {
        day = `0${d.getDate()}`;
      } else {
        day = d.getDate();
      }
      return `${day} de ${month}`;
    },
    formatTime() {
      const t = this.time;
      return `${t.substr(0, 2)}h`;
    },
  },
  mounted() {
    this.setCategory();
  },
  methods: {
    setCategory() {
      const vm = this;
      const el = this.options.find((item) => item.value === vm.categoryId.toString());
      this.category = el;
    },
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
