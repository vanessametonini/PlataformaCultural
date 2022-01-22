<template>
  <div class="pins-profile">
    <carousel
      :mouse-drag="false"
      :loop="false"
      :center-mode="true"
      :per-page="1"
      :per-page-custom="[
        [640, 2],
        [1366, 3],
        [1600, 5]
      ]"
      :pagination-enabled="pagination"
      class="carousel"
    >
      <slide
        v-for="pin in userPinList"
        :key="pin.id"
      >
        <div
          class="content"
          :style="{
            background:
              pin.imageIds.length > 0
                ? `url(${$store.getters['services/getImagePath']}${pin.imageIds[0]}) no-repeat`
                : $store.getters['categories/getCategoryById'](pin.categoryId)
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
              icon="visibility"
              @click="$store.dispatch('pins/animatePin', { $router, pin })"
            />
            <q-fab-action
              class="no-border-radius"
              square
              color="black"
              text-color="white"
              icon="delete"
              @click="
                $store.commit('pins/SET_SELECTED_PIN_ID', pin.id),
                (confirm = true)
              "
            />
            <q-fab-action
              class="no-border-radius"
              square
              color="black"
              text-color="white"
              icon="edit"
              @click="
                $router.push(`/profile/pins/edit/${pin.id}`),
                $store.commit('pins/SET_SELECTED_PIN_ID', pin.id)
              "
            />
          </q-fab>
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">
              {{ pin.title }}
            </div>
            <div class="text-subtitle1">
              {{ pin.street }}
            </div>
          </div>

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
                <span
                  class="q-ml-sm"
                >Tem certeza que deseja remover esse pin?</span>
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
      </slide>
    </carousel>
  </div>
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
  emits: ["card-click"],
  data() {
    return {
      confirm: false,
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
    removePin() {
      this.$store.dispatch("pins/deletePin");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";

.pins-profile {
  width: 100%;
  overflow: hidden;
  padding-top: 26px;
}
</style>
