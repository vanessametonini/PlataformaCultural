<template>
  <div class="box">
    <div class="input-content">
      <h4
        v-if="editMode"
        class="title-3 bolder"
      >
        Edite seu evento
      </h4>
      <h4
        v-else
        class="title-3 bolder"
      >
        Adicione um novo evento
      </h4>
      <!-- event name -->
      <div class="column mg-top16">
        <span class="subheading-2">Nome do evento*</span>
        <q-input
          v-model="name"
          class="input"
          dense
          input-class="text-black"
          color="black"
          maxlength="90"
          :error-message="nameErrorMessage"
          :error="$v.name.$error"
          @blur="$v.name.$touch"
        />
      </div>
      <div class="row justify-between mg-top8">
        <div class="column">
          <span class="subheading-2">Data*</span>
          <q-input
            v-model="date"
            class="input"
            dense
            input-class="text-black"
            color="black"
            readonly
            :error-message="dateErrorMessage"
            :error="$v.date.$error"
          >
            <template #prepend>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="date"
                    mask="DD/MM/YYYY"
                    unmasked-value
                    color="black"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Fechar"
                        color="black"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="column">
          <span class="subheading-2">Hora*</span>
          <q-input
            v-model="time"
            class="input"
            dense
            input-class="text-black"
            color="black"
            readonly
            :error-message="timeErrorMessage"
            :error="$v.time.$error"
          >
            <template #prepend>
              <q-icon
                name="access_time"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="time"
                    mask="HH:mm"
                    unmasked-value
                    color="black"
                    format24h
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Fechar"
                        color="black"
                        flat
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <!-- address -->
      <div class="column mg-top8">
        <span class="subheading-2">Local do evento*</span>
        <q-input
          v-model="local"
          class="input"
          dense
          input-class="text-black"
          color="black"
          hint="Caso seja online, escreva o nome da plataforma: Youtube, Zoom, Instagram ..."
          :error-message="localErrorMessage"
          :error="$v.local.$error"
          @blur="$v.local.$touch"
        />
      </div>

      <!-- number & zipcode -->
      <div class="row justify-between mg-top8">
        <div class="column">
          <span class="subheading-2">CEP</span>
          <q-input
            v-model="zipcode"
            class="input"
            dense
            mask="##.###-###"
            unmasked-value
            input-class="text-black"
            color="black"
            :error-message="zipcodeErrorMessage"
            :error="$v.zipcode.$error"
            @blur="$v.zipcode.$touch"
            @keyup="searchAddress()"
          />
        </div>
        <div class="column">
          <span class="subheading-2">Número</span>
          <q-input
            ref="inputNumber"
            v-model="number"
            class="input"
            dense
            mask="#####"
            unmasked-value
            input-class="text-black"
            color="black"
            :error-message="numberErrorMessage"
            :error="$v.number.$error"
            @blur="$v.number.$touch"
          />
        </div>
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Rua - logradouro</span>
        <q-input
          v-model="street"
          disable
          class="input"
          dense
          input-class="text-black"
          color="black"
          :error-message="streetErrorMessage"
          :error="$v.street.$error"
          @blur="$v.street.$touch"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Bairro</span>
        <q-input
          v-model="neighborhood"
          disable
          class="input"
          dense
          input-class="text-black"
          color="black"
          :error-message="neighborhoodErrorMessage"
          :error="$v.neighborhood.$error"
          @blur="$v.neighborhood.$touch"
        />
      </div>

      <!-- description -->
      <div class="column mg-top8">
        <span class="subheading-2">Descrição*</span>
        <q-input
          v-model="description"
          autogrow
          dense
          hint="Máximo 200 caracteres"
          :rules="[(val) => val.length <= 400 || 'Máximo de 400 caracteres']"
          input-class="text-black"
          color="black"
          :error-message="descriptionErrorMessage"
          :error="$v.description.$error"
          @blur="$v.description.$touch"
        />
      </div>

      <!-- ticket -->
      <div class="column mg-top8">
        <span class="subheading-2">Valor</span>
        <q-field
          v-model="ticket"
          class="input"
          dense
          input-class="text-black"
          color="black"
        >
          <template #control="{ id, floatingLabel, value, emitValue }">
            <money
              v-show="floatingLabel"
              :id="id"
              class="q-field__input text-left"
              v-bind="money"
              :value="value"
              @input="emitValue"
            />
          </template>
        </q-field>
      </div>

      <!-- link -->
      <div class="column mg-top8">
        <span class="subheading-2">Link</span>
        <q-input
          v-model="link"
          class="input"
          dense
          input-class="text-black"
          color="black"
          hint="Deixe o link caso o evento for online!"
          :error-message="linkErrorMessage"
          :error="$v.link.$error"
          @blur="$v.link.$touch"
        />
      </div>

      <!-- category -->
      <div class="column mg-top8">
        <span class="subheading-2">Categoria*</span>
        <q-select
          v-model="categoryId"
          option-value="id"
          option-label="label"
          map-options
          emit-value
          class="input"
          square
          dense
          :options="categories"
          options-dense
          options-selected-class
          color="black"
          :error-message="categoryErrorMessage"
          :error="$v.categoryId.$error"
          @blur="$v.categoryId.$touch"
          @input="
            category = $store.getters['categories/getCategoryById'](categoryId)
          "
        >
          <template #selected>
            <span class="caption bold">{{ category.label }}</span>
          </template>
        </q-select>
      </div>

      <q-carousel
        v-if="images.length"
        v-model="slide"
        swipeable
        animated
        :arrows="images.length > 1"
        navigation
        infinite
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide
          v-for="n in images.length"
          :key="`full-${n}`"
          :name="n"
          :img-src="`${$store.getters['services/getImagePath']}${
            images[n - 1]
          }`"
        />
        <template #control>
          <q-carousel-control
            position="bottom-right"
            :offset="[18, 18]"
          />
        </template>
      </q-carousel>
      
      <!-- file picker -->
      <div class="column mg-top8">
        <span class="subheading-2">Insira uma imagem</span>
        <q-file
          :value="files"
          class="input"
          dense
          square
          counter
          use-chips
          multiple
          :max-files="3"
          accept=".jpg,.jpeg,.png,.gif"
          max-file-size="2097152"
          :error-message="filesErrorMessage"
          :error="$v.files.$error"
          @blur="$v.files.$touch"
          @input="updateFiles"
        >
          <template #append>
            <q-icon
              v-if="files !== null"
              name="close"
              class="cursor-pointer"
              @click.stop="files = null"
            />
            <q-icon
              name="create_new_folder"
              @click.stop
            />
          </template>
          <template #hint>
            Tamanho máximo de 2MB. Formato JPG.
          </template>
        </q-file>
      </div>
    </div>
    <!-- actions edit -->
    <div
      class="mg-top32"
      align="right"
    >
      <q-btn
        outline
        color="black"
        @click="confirmCreate()"
      >
        <span class="caption">Enviar</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createHelpers } from "vuex-map-fields";
import { required, url, minLength, numeric, requiredIf, helpers } from "vuelidate/lib/validators";
import { Money } from "v-money";
import { QField } from "quasar";
import axios from 'axios';

const { mapFields } = createHelpers({
  getterType: "events/getField",
  mutationType: "events/updateField",
});

const zipcodeNotFound = (value, vm) => !helpers.req(value) || (value && vm.zipcodeNotFound == false);

export default {
  name: "EventProfile",
  components: {
    Money,
    QField,
  },
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      waiting: false,
      files: null,
      file: null,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        maxlength: 14,
        masked: false,
      },
      autoplay: true,
      slide: 1,
      zipcodeNotFound: false
    };
  },
  validations: {
    categoryId: {
      required,
    },
    name: {
      required,
    },
    date: {
      required,
    },
    time: {
      required,
    },
    local: {
      required,
    },
    street: {},
    neighborhood: {},
    number: {
      numeric,
    },
    zipcode: {
      minLength: minLength(8),
      zipcodeNotFound,
      required: requiredIf(function() {
        return this.zipcode.length;
      })
    },
    description: {
      required,
    },
    link: {
      url,
    },
    files: {},
  },
  computed: {
    ...mapFields({
      category: "categorySelected",
      categoryId: "eventForm.categoryId",
      name: "eventForm.title",
      date: "eventForm.date",
      time: "eventForm.time",
      ticket: "eventForm.ticket",
      local: "eventForm.local",
      street: "eventForm.street",
      neighborhood: "eventForm.neighborhood",
      number: "eventForm.number",
      city: "eventForm.city",
      zipcode: "eventForm.zipcode",
      description: "eventForm.description",
      link: "eventForm.link",
      images: "eventForm.imageIds",
    }),
    ...mapGetters({
      categories: "categories/loadCategories",
      user: "users/getCurrentUser",
    }),
    categoryErrorMessage() {
      if (!this.$v.categoryId.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    nameErrorMessage() {
      if (!this.$v.name.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    dateErrorMessage() {
      if (!this.$v.date.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    timeErrorMessage() {
      if (!this.$v.time.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    localErrorMessage() {
      if (!this.$v.local.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    streetErrorMessage() {
      return "";
    },
    neighborhoodErrorMessage() {
      return "";
    },
    numberErrorMessage() {
      return "";
    },
    zipcodeErrorMessage() {
      if (!this.$v.zipcode.minLength) {
        return "Entre com um CEP válido";
      } else if (zipcodeNotFound) {
        return "CEP não encontrado"
      }      
      return "";
    },
    descriptionErrorMessage() {
      if (!this.$v.description.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    linkErrorMessage() {
      if (!this.$v.link.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    filesErrorMessage() {
      return "";
    },
  },
  created() {
    // if (!this.editMode) this.cleanForm() && this.$v.$reset();
    if(this.$route.params.action === "edit") {
      this.fetchStorage();
    } else if (this.$route.params.action !== "edit") {
      this.cleanForm() && this.$v.$reset();
    }
  },
  methods: {
    updateFiles(files) {
      if (Array.isArray(files) === false || files.length === 0) {
        this.files = null;
      } else if (Array.isArray(this.files) === true) {
        const diff = this.files.filter((file) => files.indexOf(file) === -1);
        if (diff.length === 1 && this.files.length > 1) {
          this.files = files.slice();
        } else if (this.files.length < 3) {
          this.files = diff.concat(files);
        }
      } else {
        this.files = files.slice();
      }
    },
    sendForm() {
      if (this.editMode) {
        this.$store.dispatch("events/updateEvent", { $router: this.$router });
      } else {
        this.$store.dispatch("events/createNewEvent", {
          $router: this.$router,
        });
      }

      this.waiting = false;
    },
    cleanForm() {
      this.date = "";
      this.time = "";
      this.ticket = "";
      this.site = "";
      this.street = "";
      this.neighborhood = "";
      this.number = "";
      this.city = "";
      this.zipcode = "";
      this.description = "";
      this.link = "";
      this.imgUrl = "";
      this.category = "";
      this.categoryId = null;
      this.name = "";
      this.local = "";
      this.images = [];
    },
    confirmCreate() {
      this.waiting = true;
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.$q.notify({
          message: "Por favor, aguarde.",
          position: "top-right",
          timeout: 1500,
        });

        //se tiver imagens
        if (this.files) {
          this.$store
            .dispatch("images/uploadArray", { files: this.files })
            .then((fileIds) => {
              this.images = fileIds;
              this.sendForm();
            })
            .catch((error) => {
              this.waiting = false;
            });
        }
        //se não tiver imagens
        else {
          this.sendForm();
        }
      } else {
        this.$q.notify({
          message: "Por favor, preencha os campos corretamente.",
          position: "top-right",
        });
      }
    },
    async searchAddress() {
      var self = this;
      self.zipcodeNotFound = false;
      
      if(/^[0-9]{8}$/.test(this.zipcode)){

        const addressData = await axios.get(("https://viacep.com.br/ws/" + this.zipcode + "/json/"))

          if(addressData.data.erro){
            this.$refs.inputNumber.focus();
            self.zipcodeNotFound = true;
            
            self.street = '';
            self.neighborhood = '';
            self.city = '';
            return;
          } 

          self.street = addressData.data.logradouro;
          self.neighborhood = addressData.data.bairro;
          self.city = addressData.data.localidade;
          this.$refs.inputNumber.focus();
      }
    },

    fetchStorage() {
      const info = this.$store.state.events.currentEvent;
      const date = new Date(this.$store.state.events.currentEvent.dateTime);
      const dateInfo = date.toLocaleDateString();
      const timeInfo = date.toLocaleTimeString();

      this.categoryId = info.categoryId;
      this.category = this.$store.getters["categories/getCategoryById"](
        this.categoryId
      );
      this.imageIds = info.imageIds;
      this.name = info.title;
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
    
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 26px;
  background-color: #f5f5f5;
  
  @media screen and (min-width: 1024px) {
    max-width: 586px;
  }

  @media screen and (min-width: 1800px) {
    max-width: 616px;
  }
}

.input {
  width: 100%;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: -8px;
}

.f-size {
  font-size: 0.9rem;
}

span {
  color: black;
}

.row.justify-between .column {
  width: 48%;
}
</style>
