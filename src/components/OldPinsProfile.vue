<template>
  <q-carousel
    v-model="slides"
    swipeable
    control-color="white"
    height="300px"
    animated
    arrows
    infinite
    class="text-white my-itens-carousel pins-profile"
  >
    <q-carousel-slide 
      v-for="pin in $store.getters['pins/getMyPins']"
      :key="pin.id"
      class="column no-wrap flex-center info"
      :name="pin.id"
      :style="{ 'background-color': $store.getters['categories/getCategoryById'](pin.categoryId).color}"
      :img-src="`${$store.getters['services/getImagePath']}${pin.imageIds[0]}`"
    >
      <div class="absolute-bottom custom-caption">
        <div class="text-h2">
          {{ pin.title }}
        </div>
        <div class="text-subtitle1">
          {{ pin.street }}
        </div>

        <q-list>
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
            <q-item-label 
              class="icon"
              @click="$store.commit('pins/SET_SELECTED_PIN_ID', pin.id), confirm=true"
            >
              <i class="fas fa-trash" />
            </q-item-label>
          </q-item-section>
        </q-list>

        <q-dialog
          v-model="confirm"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar
                icon="fas fa-trash"
                color="negative"
                text-color="white"
              />
              <span class="q-ml-sm">Tem certeza que deseja remover esse pin?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                v-close-popup
                flat
                label="Cancelar"
                color="negative"
              />
              <q-btn
                v-close-popup
                flat
                label="Remover"
                color="negative"
                @click="removePin()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { createHelpers } from "vuex-map-fields";
import { mapGetters } from "vuex";

const { mapFields } = createHelpers({
  getterType: "pins/getField",
  mutationType: "pins/updateField",
});
export default {
  name: "PinsProfile",
  emits: ['card-click'],
  data() {
    return {
      confirm: false,
      slides: "pins",
    };
  },
  computed: {
     ...mapGetters({
      userPinList: "pins/getMyPins",
    }),
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
    removePin() {
      this.$store.dispatch("pins/deletePin");
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.pins-profile {

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
