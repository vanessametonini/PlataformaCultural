<template>
  <div class="box">
    <div
      v-if="showThisShort"
      class="first"
      :style="{ 'background-color': category.color }"
    >
      <div class="header column">
        <span class="title-2 bolder line-h16"> {{ title }} </span>
        <div class="row spaced-32">
          <span class="body-3 bold"> {{ formatDate }} </span>
          <!-- <span class="body-2 bold"> {{ date.year }} </span> -->
          <span class="body-3 bold mg-left16"> {{ time }} </span>
        </div>

        <div class="column spaced-16">
          <span class="body-2 bold"> {{ item.address.street }} - {{ item.address.number }} </span>
          <span class="body-2 bold"> {{ item.address.neighborhood }} </span>
        </div>
      </div>

      <q-btn
        ref="btnFirst"
        flat
        class="reset-btn btn"
        @click="emitThisEvent()"
      >
        <span class="caption bolder">editar</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

// import { gsap, TweenMax, Expo } from 'gsap/all';

// gsap.registerPlugin(TweenMax, Expo);

export default {
  name: 'CollapsedEventView',
  components: {
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      id: this.item.id, // emit to edit
      title: this.item.title,
      date: this.item.date,
      time: this.item.time,
      category: {
        label: '',
        value: '0',
        color: '#000',
      },
      showThisShort: true,
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
  },
  mounted() {
    this.setCategory();
  },
  methods: {
    emitThisEvent() {
      this.$emit('event-to-edit', this.id);
      console.log('shortEvent to edit : (id)', this.id); // emitindo que o shortEvent a ser editado
      // this.showThisShort = false;
    },
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

* {
  font-family: 'Helvetica';
  color: white;
}

.box {
  transition: 2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.active {
  // width: 350px;
  // height: 100%;
  // transition: 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  animation: expand 1s linear;
}

@keyframes expand {
  0%{
    width: 200px;
    height: 200px;
  }
  50% {
    width: 350px;
  }
  100% {
    width: 350px;
    height: 100%;
  }
}

.editMode {
  height: 100%;
  width: 350px !important;
}

.first {
  height: 200px;
  width: 200px;
  padding: 16px;
  overflow: hidden;
  position: relative;
  // border: 2px solid white;;
  background-color: #b8cad4;

  .header {
    align-self: center;
    position: relative;
  }

  .btn {
    height: 30px;
    width: 60px;
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
}

.edit, .ready {
  width: 350px;
  height: 100%;
}

.edit {
  align-items: center;
  padding: 24px;
  transition: 1s expand linear;
}

// .edit {
//   background-color: #E6B545;
// }

.ready {
  padding: 32px;
  height: 100%;
  position: relative;

  .context {
    position: relative;
  }

  .action {
    position: absolute;
    top: 16px;
    right: 16px;

    .btn-edit {
      height: 30px;
      width: 60px;
      border-radius: 0px;
    }
  }
}

.roll-out {
  animation: roll-out 1.5s linear;
}

.roll-in {
  animation: roll-out 1s linear reverse;
}

@keyframes roll-out {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.6);
  }
  100% {
    transform: scale(0.6);
  }
}

span {
  color: white;
}

</style>
