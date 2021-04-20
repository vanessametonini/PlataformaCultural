<template>
  <div class="app-page events-page">
    <!-- ASIDE -->
    <div class="events-page-aside">
      <logo-card />

      <div v-if="handleResize" class="aside-actions">
        <div class="aside-filter-options">
          <div
            v-for="(item, index) in options"
            :key="index"
            class="filter-options-item"
            @click="filterThis(item.value)"
          >
            <span
              id="filter-item"
              class="body-3"
              :class="{ 'selected-effect': filterTypeSelected === item.value }"
            >
              {{ item.label }}
            </span>
          </div>
        </div>

        <div class="aside-filter-search">
          <q-input v-model="search" label="Procurar" square dense color="black">
            <template #prepend>
              <q-icon class="bolder text-black" name="search" size="xs" />
            </template>
          </q-input>
        </div>

        <div class="aside-filter-create-event">
          <base-button
            v-if="!$store.getters['getAuth']"
            class="btn-signup"
            theme="primary"
            @click="$router.push({ name: 'SignUp' })"
          >
            <!-- <span class="body-2 bolder text-white"> + </span> -->
            <span class="caption bolder text-white"> Cadastre-se </span>
          </base-button>

          <base-button
            v-if="$store.getters['getAuth']"
            class="btn-signup"
            theme="primary"
            @click="
              $store.commit('users/SET_SELECTED_FORM', 'event');
              $router.push({ name: 'Profile' });
            "
          >
            <span class="body-2 bolder text-white"> + </span>
            <span class="caption bolder text-white">
              adicione um novo evento
            </span>
          </base-button>
        </div>
      </div>
    </div>
    <!-- end aside -->

    <!-- filter to mobile -->
    <div v-if="handleResize" class="filter-mobile">
      <span class="body-2 bolder"> + </span>
    </div>

    <!-- content -->
    <div class="content">
      <!-- scroll area -->
      <q-scroll-area
        v-if="handleResize"
        class="scrollArea"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <event-list />
      </q-scroll-area>
      <!-- end scroll-area -->
    </div>
    <!-- end content -->
  </div>
</template>

<script>
import EventList from "../components/EventList.vue";
import BaseButton from "../components/BaseButton.vue";

export default {
  name: "SchedulePage",
  components: {
    EventList,
    BaseButton,
  },
  data() {
    return {
      newEvent: "",
      filterTypeSelected: "mostRecent",
      search: "",
      options: [
        { label: "Mais ativos", value: "mostActive", color: "black" },
        { label: "Mais Comentados", value: "mostAnswed", color: "black" },
        { label: "Novos", value: "mostRecent", color: "black" },
      ],
      thumbStyle: {
        right: "0px",
        top: "16px",
        borderRadius: "0px",
        backgroundColor: "#111111",
        width: "9px",
        heigth: "8px",
        opacity: 0.75,
      },
      barStyle: {
        right: "0px",
        top: "16px",
        borderRadius: "0px",
        backgroundColor: "#eeeeee",
        width: "9px",
        opacity: 0.2,
      },
    };
  },
  computed: {
    allTopics() {
      const eventsToShow = this.$store.getters.eventsFiltered;
      return eventsToShow;
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    signUp() {
      this.$router.push({ name: "SignUp" });
    },
    filterThis(filterType) {
      this.filterTypeSelected = filterType;
      console.log("filterThis", filterType);
    },
    handleResize() {
      const size = window.innerWidth;
      if (size > 600) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.events-page {
  z-index: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.events-page-aside {
  background-color: white;
  height: 100vh;
  min-width: 250px;
  padding-top: 16px;
  padding-left: 16px;
  margin-right: 8px;
  z-index: 1;
  position: relative;
}

.aside-actions {
  margin-top: 0px;
  height: 100%;
  overflow: hidden;
  padding: 32px 0px 32px 0px;
}

.aside-filter-options {
  margin-top: 0px;
  display: inline-block;
}

.filter-options-item {
  margin: 8px 0px 4px 0px;
}

#filter-item {
  cursor: pointer;
  color: $gray3;
  font-weight: bolder;
  position: relative;
  transition: 0.35s linear;
}

.selected-effect {
  color: black !important;
  margin-left: 8px;
  position: relative;
  transition: 0.75s linear;
}

.selected-effect:after {
  content: "";
  color: black;
  position: absolute;
  left: -8px;
  display: inline-block;
  height: 1em;
  width: calc(100% + 16px);
  border-bottom: 3px solid;
  margin-top: 8px;
  opacity: 1;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.aside-filter-search {
  margin-top: 40px;
}

.aside-filter-create-event {
  position: absolute;
  bottom: 80px;
}

.content {
  height: 100vh;
  background-color: #f5f5f5;
  width: 100%;
  padding: 16px 0px 8px 16px;
  max-width: calc(3 * 360px);
  z-index: 1;

}

.scrollArea {
  height: 100vh;
  width: 100%;
  padding: 8px 16px 16px 0px;
}

.filter-mobile {
  display: none;
}

span {
  color: white;
}

.white-space {
  height: 60px;
}
</style>
