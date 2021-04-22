<template>
  <div class="events-page">
    <q-layout view="lHh Lpr lff" container>
      <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> -->
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="257"
        :breakpoint="400"
      >
        <div class="drawer-layout">

          <logo-card />

          <div class="aside-actions">
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

            <div class="aside-filter-search" role="search">
              <q-input v-model="search" label="Procurar" square dense color="black">
                <template #prepend>
                  <q-icon class="bolder text-black" name="search" size="xs" />
                </template>
              </q-input>
            </div>

            <div class="aside-filter-btn">
              <base-button
                v-if="!$store.getters['getAuth']"
                class="btn-signup"
                theme="primary"
                @click="$router.push({ name: 'SignIn' })"
              >
                <span class="caption bolder text-white">Participar</span>
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
                  Adicione um novo evento
                </span>
              </base-button>
            </div>
          </div>
        </div>
      </q-drawer>

      <q-page-container>
        <q-page padding style="max-width: 1100px">
          <event-list />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import EventList from "../components/EventList.vue";
import BaseButton from "../components/BaseButton.vue";

export default {
  name: "SchedulePage",
  components: {
    EventList,
    BaseButton
  },
  data() {
    return {
      drawer: false,
      newEvent: "",
      filterTypeSelected: "mostRecent",
      search: "",
      options: [
        { label: "Próximos", value: "next", color: "black" },
        { label: "Novos", value: "mostRecent", color: "black" },
      ]
    };
  },
  computed: {
    allTopics() {
      const eventsToShow = this.$store.getters.eventsFiltered;
      return eventsToShow;
    },
  },
  methods: {
    signUp() {
      this.$router.push({ name: "SignUp" });
    },
    filterThis(filterType) {
      this.filterTypeSelected = filterType;
      console.log("filterThis", filterType);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.events-page .q-layout-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.drawer-layout {
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
}

.aside-actions {
  margin-top: 32px;
}

.aside-filter-options {
  margin-top: 0px;
  display: inline-block;
}

.filter-options-item {
  padding: 8px 0px 4px 0px;
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

.aside-filter-btn,
.aside-filter-search {
  margin-top: 32px;
}

</style>
