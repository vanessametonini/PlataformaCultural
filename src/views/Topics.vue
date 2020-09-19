<template>
  <div class="app-page topics-page">
    <!-- ASIDE -->
    <div class="topics-page-aside">
      <logo-card
        :black-mode="true"
        class="identity"
        size="180"
      />

      <div
        v-if="handleResize"
        class="aside-actions"
      >
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
              :class="{ 'selected-effect' : filterTypeSelected === item.value }"
            >
              {{ item.label }}
            </span>
          </div>
        </div>

        <div class="aside-filter-search">
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

        <div class="aside-filter-create-topic">
          <base-button
            class="row no-wrap al-items-center"
            theme="primary"
            @click="createNewTopic()"
          >
            <!-- <q-icon class="fas fa-plus text-white" size="xs"></q-icon> -->
            <span class="body-2 bolder text-white"> + </span>
            <span class="caption bolder text-white"> insira um novo diálogo </span>
          </base-button>
        </div>
      </div>
    </div>
    <!-- end aside -->

    <!-- filter to mobile -->
    <div
      v-if="handleResize"
      class="filter-mobile"
    >
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
        <topics-list />
      </q-scroll-area>
      <!-- end scroll-area -->
    </div>
    <!-- end content -->
  </div>
</template>

<script>
import TopicsList from '../components/TopicsList.vue';
import BaseButton from '../components/BaseButton.vue';

export default {
  name: 'TopicsPage',
  components: {
    TopicsList,
    BaseButton,
  },
  data() {
    return {
      newEvent: '',
      filterTypeSelected: 'mostRecent',
      search: '',
      options: [
        { label: 'Mais ativos', value: 'mostActive', color: 'black' },
        { label: 'Mais Comentados', value: 'mostAnswed', color: 'black' },
        { label: 'Novos', value: 'mostRecent', color: 'black' },
      ],
      thumbStyle: {
        right: '0px',
        top: '16px',
        borderRadius: '0px',
        backgroundColor: '#111111',
        width: '9px',
        heigth: '8px',
        opacity: 0.75,
      },
      barStyle: {
        right: '0px',
        top: '16px',
        borderRadius: '0px',
        backgroundColor: '#eeeeee',
        width: '9px',
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
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    createNewTopic() {
      this.$router.push({ name: 'CreateTopic' });
    },
    filterThis(filterType) {
      this.filterTypeSelected = filterType;
      console.log('filterThis', filterType);
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

@import '../styles/variables.scss';
@import '../styles/mixins.scss';
@import '../styles/typo.scss';

.topics-page {
  z-index: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  @include for-phone-only {
    height: 100%;
    flex-direction: column;
  }
}

.topics-page-aside {
  background-color: white;
  height: 100%;
  min-width: 250px;
  padding: 16px;
  margin: 8px 8px 0px 0px;
  z-index: 1;
  display: flex;
  flex-direction: column;

  @include for-phone-only {
    height: 80px;
    padding: 16px 16px 8px 16px;
    flex-direction: column;
  }

  @include for-tablet-portrait-only {
    margin: 0px 4px 0px 0px;
    padding: 16px 0px 8px 16px;
  }

  @include for-desktop-up {
    margin: 0px;
    padding: 24px 32px 8px 32px;
    align-self: flex-start;
  }

  .identity {
    align-self: flex-start;
    min-height: 180px;

    @include for-phone-only {
      width: 100%;
      padding: 0px;
      align-self: center;
    }
  }

  .aside-actions {
     @include for-phone-only {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
}

.aside-actions {
  // border: 1px solid red;
  margin-top: 0px;
  height: 100%;
  overflow: hidden;
  padding: 32px 0px 32px 0px;
  position: relative;
}

.aside-filter-options {
  margin-top: 0px;
  // width: fit-content;
  display: inline-block;
  // border: 2px solid $borderGray;
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
  content: '';
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
  // border: 2px solid pink;
}

.aside-filter-create-topic {
  position: absolute;
  bottom: 80px;
}

.content {
  height: 100vh;
  background-color: #f5f5f5;
  width: 100%;
  padding: 16px 0px 8px 16px;
  max-width: calc(3 * 360px);
  // overflow: hidden;
  z-index: 1;

  @include for-phone-only {
    width: 100%;
    padding: 8px;
  }

  @include for-desktop-up {
    align-self: center;
    margin: 0px;
    // padding: 16px 8px 8px 0px;
  }
}

.scrollArea {
  height: 100vh;
  width: 100%;
  padding: 8px 16px 16px 0px;

  @include for-phone-only {
    display: none;
    padding: 4px 8px 4px 8px;
  }
}

.filter-mobile {
  display: none;

  @include for-phone-only {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    z-index: 2;
    position: relative;
    // position: -webkit-sticky;
    top: 32px;
    right: 32px;
    background: black;
  }
}

span {
  color: white;
}

.white-space {
  height: 60px;
  //border: 2px solid green;

  @include for-phone-only {
    display: none;
  }
}

</style>
