<template>
  <div class="topics-profile">
    <h3>Meus Eventos</h3>
    <q-scroll-area
      :bar-style="barStyle"
    >
      <q-list>
        <q-item
          v-for="event in $store.getters['events/getMyEvents']"
          :key="event.id"
          v-ripple
          clickable
          class="info"
          :style="{ 'border-color': $store.getters['categories/getCategoryById'](event.categoryId).color}"
        >
          <q-item-section
            v-if="event.imageIds[0]"
            avatar
          >
            <q-avatar square>
              <img
                :src="`${$store.getters['services/getImagePath']}${event.imageIds[0]}`"
              >
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-white">
              {{ mask(event.title) }}
            </q-item-label>
            <q-item-label caption>
              {{ event.date }}
            </q-item-label>
          </q-item-section>
          <q-item-section class="actions">
            <q-item-label 
              class="icon" 
              @click="openEvent(event.id)"
            >
              <i class="fas fa-eye" />
            </q-item-label>
            <q-item-label 
              class="icon" 
              @click="$emit('card-click'), $store.commit('events/SET_CURRENT_EVENT', event), fetchStorage(event)"
            >
              <i class="fas fa-edit" />
            </q-item-label>
            <q-item-label 
              class="icon"
              @click="$store.commit('events/SET_CURRENT_EVENT', event), confirm=true"
            >
              <i class="fas fa-trash" />
            </q-item-label>
          </q-item-section>
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="fas fa-trash" color="negative" text-color="white" />
                <span class="q-ml-sm">Tem certeza que deseja remover esse evento?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="negative" v-close-popup />
                <q-btn flat label="Remover" color="negative" v-close-popup @click="removeEvent()" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-item>
      </q-list>
    </q-scroll-area>
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
  data() {
    return {
      barStyle: {
       right: "0",
        borderRadius: "4px",
        backgroundColor: "#fff",
        width: "4px",
        opacity: .8,
      },
      confirm: false
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
    })
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
        hash: `#${eventId}`
      });
    },

    fetchStorage(info) {
      const date = new Date(this.$store.state.events.currentEvent.dateTime)
      const dateInfo = date.toLocaleDateString()
      const timeInfo = date.toLocaleTimeString()
     
      this.categoryId = info.categoryId;
      this.category = this.$store.getters['categories/getCategoryById'](this.categoryId);
      this.imageIds = info.imageIds;
      this.title = info.title;
      this.date = dateInfo;
      this.time = timeInfo;
      this.street = info.street;
      this.neighborhood = info.neighborhood;
      this.number = info.number;
      this.zipcode = info.zipcode;
      this.city = info.city;
      this.ticket = info.ticket;
      this.link = info.link;
      this.local = info.local;
      this.description = info.description;
    },
    removeEvent() {
      this.$store.dispatch("events/deleteEvent");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";

.topics-profile {
  @include profile-box;
  @include profile-scrolls;

  .q-scrollarea {
    height: 87px;
  }

  .info  {
    position: relative;
    display: flex;
    cursor: pointer;
  }

  .info:hover .actions {
      position: absolute;
      display: flex;
      flex-direction: row;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      justify-content: space-around;
      align-items: center;
      background-color: rgba(0, 0, 0, .7);
  }

  .actions {
    display: none;   
  }

  .icon {
      margin: 0;
      padding: 6px;
    }
}

</style>
