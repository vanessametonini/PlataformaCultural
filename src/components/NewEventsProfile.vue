<template>
  <div class="events-profile">
    <carousel
      :scrollPerPage="true"
      :perPage="1"
      :perPageCustom="[
        [640, 2],
        [1366, 3],
        [1600, 5]
      ]"
      :paginationEnabled="pagination"
      class="carousel"
    >
      <slide
        v-for="event in $store.getters['events/getMyEvents']"
        :key="event.id"
      >
        <div
          class="content"
          :style="{
            background:
              event.imageIds.length > 0
                ? `url(${$store.getters['services/getImagePath']}${event.imageIds[0]}) no-repeat`
                : $store.getters['categories/getCategoryById'](event.categoryId)
                    .color,
            'background-size': 'cover',
          }"
        >
          <q-fab
            class="btn-actions no-border-radius"
            square
            color="black"
            padding="13px"
            text-color="white"
            icon="more_vert"
            direction="left"
          >
            <q-fab-action
              class="no-border-radius"
              square
              color="black"
              text-color="white"
              @click="openEvent(event.id)"
              icon="visibility"
            />
            <q-fab-action
              class="no-border-radius"
              square
              color="black"
              text-color="white"
              @click="
                $store.commit('events/SET_CURRENT_EVENT', event),
                  (confirm = true)
              "
              icon="delete"
            />
            <q-fab-action
              class="no-border-radius"
              square
              color="black"
              text-color="white"
              @click="
                $router.push(`/perfil/events/edit/${event.id}`),
                  $store.commit('events/SET_CURRENT_EVENT', event)
              "
              icon="edit"
            />
            <!-- <q-fab-action
              class="no-border-radius"
              square
              color="black"
              text-color="white"
              @click="$router.push('/perfil/events/add')"
              icon="add"
            /> -->
          </q-fab>
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">
              {{ mask(event.title) }}
            </div>
            <div class="text-subtitle1">
              {{ event.local }}
            </div>
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar
                  icon="fas fa-trash"
                  color="negative"
                  text-color="white"
                />
                <span class="q-ml-sm"
                  >Tem certeza que deseja remover esse evento?</span
                >
              </q-card-section>

              <q-card-actions align="right">
                <q-btn v-close-popup flat label="Cancelar" color="negative" />
                <q-btn
                  v-close-popup
                  flat
                  label="Remover"
                  color="negative"
                  @click="removeEvent()"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "events/getField",
  mutationType: "events/updateField",
});
export default {
  name: "EventsProfile",
  props: {},
  emits: ["card-click"],
  data() {
    return {
      navigation: false,
      confirm: false,
    };
  },
  computed: {
    ...mapFields({
      category: "categorySelected",
      categoryId: "eventForm.categoryId",
      imageIds: "eventForm.imageIds",
      title: "eventForm.title",
      date: "eventForm.date",
      time: "eventForm.time",
      street: "eventForm.street",
      neighborhood: "eventForm.neighborhood",
      number: "eventForm.number",
      zipcode: "eventForm.zipcode",
      city: "eventForm.city",
      ticket: "eventForm.ticket",
      link: "eventForm.link",
      local: "eventForm.local",
      description: "eventForm.description",
    }),
    pagination() {
      return this.$q.screen.width < 768 ? false : true;
    } 
  },
  methods: {
    mask(text) {
      const limit = 20;
      if (text.length > limit) return text.substring(0, limit) + "...";
      return text;
    },
    async openEvent(eventId) {
      this.$router.push({
        name: "Agenda",
        hash: `#${eventId}`,
      });
    },

    removeEvent() {
      this.$store.dispatch("events/deleteEvent");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";

.events-profile {
  width: 100%;
  overflow: hidden;
  padding-top: 26px;

  .VueCarousel {

    :first-child {
      overflow: visible;
      margin-top: 0 !important;
    }

    .VueCarousel-inner {
      flex-basis: 304px;

      .VueCarousel-slide {
        position: relative;
        background: #fff;
        color: #fff;
        font-family: Arial;
        font-size: 24px;
        text-align: center;
        padding: 0 10px;

        .content {
          position: relative;
          height: 400px;

          .btn-actions {
            position: absolute;
            top: -25px;
            right: -8px;
            z-index: 1;
            display: block;
            cursor: pointer;
            text-decoration: none;
          }
        }
      }
    }

    .VueCarousel-navigation {
      .VueCarousel-navigation-button {
        &.VueCarousel-navigation-prev {
          transform: translateY(-50%) translateX(100%) !important;
          left: 30px !important;
        }

        &.VueCarousel-navigation-next {
          transform: translateY(-50%) translateX(-100%);
        }
      }
    }
  }
}
</style>
