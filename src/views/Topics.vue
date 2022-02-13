<template>
  <div class="topics-page">
    <q-layout
      view="lHh Lpr lff"
      container
    >
    <q-header
      class="bg-black mobile-only"
    >
      <q-toolbar>
        <q-toolbar-title>
          <logo-card :mobile="true" />
        </q-toolbar-title>
        
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="drawer = !drawer"
        />
      </q-toolbar>
    </q-header>
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="257"
        :breakpoint="1023"
      >
        <div class="drawer-layout">
          <logo-card />

          <div class="aside-actions">
            <div class="aside-filter-options">
              <div
                v-for="(item, index) in options"
                :key="index"
                class="filter-options-item"
                @click="currentFilter = item.value"
              >
                <span
                  id="filter-item"
                  class="body-3"
                  :class="{ 'selected-effect' : currentFilter === item.value }"
                >
                  {{ item.label }}
                </span>
              </div>
            </div>

            <div
              class="aside-filter-search"
              role="search"
            >
              <q-input
                v-model="search"
                label="Procurar"
                square
                dense
                color="black"
              >
                <template #prepend>
                  <q-icon
                    class="bolder text-black"
                    name="search"
                    size="xs"
                  />
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
                class="row no-wrap al-items-center"
                theme="primary"
                @click="$router.push('/profile/topics/add')"
              >
                <span class="body-2 bolder text-white"> + </span>
                <span class="caption bolder text-white"> adicionar um novo debate </span>
              </base-button>
            </div>
          </div>
        </div>
      </q-drawer>

      <q-page-container>
        <q-page
          padding
          style="max-width: 1100px"
        >
          <topics-list />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>



<script>
import { createHelpers } from 'vuex-map-fields';
import TopicsList from '../components/TopicsList.vue';
import BaseButton from '../components/BaseButton.vue';

const { mapFields } = createHelpers({
  getterType: 'topics/getField',
  mutationType: 'topics/updateField',
});

export default {
  name: 'TopicsPage',
  components: {
    TopicsList,
    BaseButton,
  },
  data() {
    return {
      drawer: false,
      newEvent: "",
      filterTypeSelected: "mostRecent",
      options: [
        { label: 'Mais ativos', value: 'mostActive', color: 'black' },
        { label: 'Mais comentados', value: 'mostAnswed', color: 'black' },
        { label: 'Novos', value: 'mostRecent', color: 'black' },
      ],
    };
  },
  computed: {
    ...mapFields(['search', 'currentFilter']),
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.topics-page .q-layout-container {
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

@media screen and (min-width: 1024px) {
  .mobile-only {
    display: none;
  }
}
</style>
