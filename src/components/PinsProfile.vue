<template>
  <div class="pins-profile">
    <h3>Meus Pins</h3>
    <q-scroll-area
      :bar-style="barStyle"
    >
      <q-list>
        <q-item
          v-for="pin in $store.getters['pins/getMyPins']"
          :key="pin.id"
          class="info"
          :style="{ 'border-color': $store.getters['categories/getCategoryById'](pin.categoryId).color}"
        >
          <q-item-section
            v-if="pin.imageIds[0]"
            avatar
          >
            <q-avatar square>
              <img
                :src="`${$store.getters['services/getImagePath']}${pin.imageIds[0]}`"
              >
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ mask(pin.title) }}
            </q-item-label>
            <q-item-label caption>
              {{ mask(pin.street) }}
            </q-item-label>
          </q-item-section>
          <q-item-section class="actions">
            <q-item-label 
              class="icon" 
              @click="$store.dispatch('pins/animatePin', { $router, pin });"
            >
              <i class="fas fa-eye" />
            </q-item-label>
            <q-item-label 
              class="icon" 
              @click="$emit('card-click'), $store.commit('pins/SET_SELECTED_PIN_ID', pin.id), fetchStorage()"
            >
              <i class="fas fa-edit" />
            </q-item-label>
            <!-- <q-item-label class="icon">
                <i class="fas fa-trash"></i>
              </q-item-label> -->
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "pins/getField",
  mutationType: "pins/updateField",
});
export default {
  name: "PinsProfile",
  props: {},
  emits: ['card-click'],
  data() {
    return {
      barStyle: {
        right: "0",
        borderRadius: "4px",
        backgroundColor: "#fff",
        width: "4px",
        opacity: .8,
      },
    };
  },
  computed: {
    ...mapFields({
      category: "categorySelected",
      categoryId: "pinForm.categoryId",
      title: "pinForm.title",
      email: "pinForm.email",
      phone: "pinForm.phone",
      street: "pinForm.street",
      number: "pinForm.number",
      neighborhood: "pinForm.neighborhood",
      city: "pinForm.city",
      cep: "pinForm.zipcode",
      description: "pinForm.description",
      images: "pinForm.imageIds",
      link: "pinForm.link",
      facebook: "pinForm.facebook",
      instagram: "pinForm.instagram",
      twitter: "pinForm.twitter",
      whatsapp: "pinForm.whatsapp",
    }),
  },
  methods: {
    mask(text) {
      const limit = 20;
      if (text.length > limit) return text.substring(0, limit) + "...";
      return text;
    },
    fetchStorage() {
      const idToUpdate = this.$store.state.pins.selectedPinId;
      const info = this.$store.getters['pins/getPinById'](idToUpdate);
      this.categoryId = info.categoryId;
      this.category = this.$store.getters['categories/getCategoryById'](this.categoryId);
      this.title = info.title;
      this.email = info.email;
      this.phone = info.phone;
      this.number = info.number;
      this.street = info.street;
      this.neighborhood = info.neighborhood;
      this.city = info.city;
      this.cep = info.zipcode;
      this.description = info.description;
      this.link= info.link;
      this.facebook = info.facebook
      this.instagram = info.instagram;
      this.images = info.imageIds;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.pins-profile {
  @include profile-box;
  @include profile-scrolls;

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
