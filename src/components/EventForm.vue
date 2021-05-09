<template>
  <div class="box">
    <div class="input-content">
      <h4 class="title-3 bolder">Adicione um novo evento</h4>
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
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="date"
                    mask="DD/MM/YYYY"
                    unmasked-value
                    color="black"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="black" flat />
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
            <template v-slot:prepend>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="time"
                    mask="HH:mm"
                    unmasked-value
                    color="black"
                    format24h
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="black" flat />
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

      <div class="column mg-top8">
        <span class="subheading-2">Rua - logradouro</span>
        <q-input
          v-model="street"
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
          class="input"
          dense
          input-class="text-black"
          color="black"
          :error-message="neighborhoodErrorMessage"
          :error="$v.neighborhood.$error"
          @blur="$v.neighborhood.$touch"
        />
      </div>

      <!-- number & zipcode -->
      <div class="row justify-between mg-top8">
        <div class="column">
          <span class="subheading-2">Número</span>
          <q-input
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
          />
        </div>
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
            <q-icon name="create_new_folder" @click.stop />
          </template>
          <template #hint> Tamanho máximo de 2MB. Formato JPG.</template>
        </q-file>
      </div>
    </div>
    <!-- actions edit -->
    <div class="mg-top32" align="right">
      <q-btn outline color="black" @click="confirmCreate()">
        <span class="caption">Cadastrar</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createHelpers } from "vuex-map-fields";
import { required, url, minLength, numeric } from "vuelidate/lib/validators";
import { Money } from "v-money";
import { QField } from "quasar";
const { mapFields } = createHelpers({
  getterType: "events/getField",
  mutationType: "events/updateField",
});

export default {
  name: "EventProfile",
  components: {
    Money,
    QField,
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
    street: {
    },
    neighborhood: {
    },
    number: {
      numeric
    },
    zipcode: {
      minLength: minLength(8),
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
    sendForm(){
      this.$store.dispatch("events/createNewEvent")
        .then(() => {
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
        });
      this.$router.push({ name: "Agenda" });
      this.waiting = false;
    },
    confirmCreate() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        if (this.waiting){
          this.$q.notify({
            message: "Por favor, aguarde.",
            position: 'top-right',
          });
          return;
        };
        this.waiting = true;

        //se tiver imagens
        if(this.files) {
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
          position: 'top-right',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 16px;
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
