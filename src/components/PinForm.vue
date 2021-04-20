<template>
  <div class="box">
    <div class="input-content">
      <h4 class="title-3 bolder">Adicione um novo pin</h4>
      <!-- pin name -->
      <div class="column mg-top16">
        <span class="subheading-2">Nome do pin</span>
        <q-input
          v-model="title"
          class="input"
          dense
          input-class="text-black"
          color="black"
          :error="$v.title.$error"
          :error-message="titleErrorMessage"
          @blur="$v.title.$touch"
        />
      </div>

      <!-- email -->
      <div class="column mg-top8">
        <span class="subheading-2">Email</span>
        <q-input
          v-model="email"
          class="input"
          dense
          type="email"
          input-class="text-black"
          color="black"
          :error="$v.email.$error"
          :error-message="emailErrorMessage"
          @blur="$v.email.$touch"
        />
      </div>

      <!-- phone -->
      <div class="column mg-top8">
        <span class="subheading-2">Telefone</span>
        <q-input
          v-model="phone"
          class="input"
          dense
          mask="(##) ##### - ####"
          unmasked-value
          color="black"
          :error="$v.phone.$error"
          :error-message="phoneErrorMessage"
          @blur="$v.phone.$touch"
        />
      </div>

      <!-- address -->
      <div class="column mg-top8">
        <span class="subheading-2">Rua - logradouro</span>
        <q-input
          v-model="street"
          class="input"
          dense
          input-class="text-black"
          color="black"
          :error="$v.street.$error"
          :error-message="streetErrorMessage"
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
          :error="$v.neighborhood.$error"
          :error-message="neighborhoodErrorMessage"
          @blur="$v.neighborhood.$touch"
        />
      </div>

      <!-- number & cep -->
      <div class="row justify-between mg-top8">
        <div class="column">
          <span class="subheading-2">Número</span>

          <q-input
            v-model="number"
            class="input"
            dense
            mask="########"
            input-class="text-black"
            color="black"
            :error="$v.number.$error"
            :error-message="numberErrorMessage"
            @blur="$v.number.$touch"
          />
        </div>

        <div class="column">
          <span class="subheading-2">CEP</span>
          <q-input
            v-model="cep"
            class="input"
            dense
            mask="##.###-###"
            unmasked-value
            input-class="text-black"
            color="black"
            :error="$v.cep.$error"
            :error-message="cepErrorMessage"
            @blur="$v.cep.$touch"
          />
        </div>
      </div>

      <!-- description -->
      <div class="column mg-top8">
        <span class="subheading-2">Descrição</span>
        <q-input
          v-model="description"
          autogrow
          class="f-size"
          dense
          hint="Máximo 200 caracteres"
          input-class="text-black"
          color="black"
          :error="$v.description.$error"
          :error-message="descriptionErrorMessage"
          @blur="$v.description.$touch"
        />
      </div>

      <!-- links -->
      <div class="column mg-top8">
        <span class="subheading-2">Link</span>
        <q-input
          v-model="link"
          class="input f-size"
          dense
          input-class="text-black"
          color="black"
          :error-message="linkErrorMessage"
          :error="$v.link.$error"
          @blur="$v.link.$touch"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Facebook</span>
        <q-input
          v-model="facebook"
          class="input f-size"
          dense
          input-class="text-black"
          color="black"
          :error-message="facebookErrorMessage"
          :error="$v.facebook.$error"
          @blur="$v.facebook.$touch"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Instagram</span>
        <q-input
          v-model="instagram"
          class="input f-size"
          dense
          input-class="text-black"
          color="black"
          :error="$v.instagram.$error"
          :error-message="instagramErrorMessage"
          @blur="$v.instagram.$touch"
        />
      </div>

      <!-- category -->
      <div class="column mg-top8">
        <span class="subheading-2">Categoria</span>
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
          :error="$v.categoryId.$error"
          :error-message="categoryErrorMessage"
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
          <template #hint> Tamanho máximo de 2MB </template>
          <!-- <template #after>
            <q-btn
              round
              dense
              flat
              icon="send"
              @click="sendImages"
            />
          </template> -->
        </q-file>
      </div>
    </div>

    <!-- actions edit -->
    <div class="mg-top32" align="right">
      <q-btn class="mg-right8" flat color="black" @click="cancelEdit()">
        <span class="caption">Cancelar</span>
      </q-btn>

      <q-btn outline color="black" @click="confirmCreate()">
        <span class="caption">Finalizar</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createHelpers } from "vuex-map-fields";
import { required, url, minLength, email } from "vuelidate/lib/validators";

const { mapFields } = createHelpers({
  getterType: "pins/getField",
  mutationType: "pins/updateField",
});

export default {
  name: "PinProfile",
  components: {},
  props: {
    item: {
      type: Object,
      default: null,
    },
    fetch: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: "#254C26",
    },
  },
  data() {
    return {
      waiting: false,
      valid: true,
      step: 0,
      lastStep: 0,
      active: false,
      background: this.bgColor,
      files: null,
      file: null,
    };
  },
  validations: {
    categoryId: {
      required,
    },
    title: {
      required,
    },
    email: {
      // required,
      email,
    },
    phone: {
      minLength: minLength(11),
    },
    street: {
      required,
    },
    number: {
      required,
    },
    neighborhood: {
      required,
    },
    city: {},
    cep: {
      required,
      minLength: minLength(8),
    },
    description: {
      required,
    },
    link: {
      url,
    },
    facebook: {
      url,
    },
    instagram: {
      url,
    },
    twitter: {
      url,
    },
    whatsapp: {},
    files: {
      required,
    },
  },
  computed: {
    ...mapGetters({
      categories: "categories/loadCategories",
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
    categoryErrorMessage() {
      if (!this.$v.categoryId.required) {
        return "Esse campo é requerido";
      }
      return "";
    },
    titleErrorMessage() {
      if (!this.$v.title.required) {
        return "Esse campo é requerido";
      }
      return "";
    },
    emailErrorMessage() {
      if (!this.$v.email.email) {
        return "Entre com um email válido";
      }
      return "";
    },
    phoneErrorMessage() {
      if (!this.$v.phone.minLength) {
        return "Entre com um telefone válido";
      }
      return "";
    },
    streetErrorMessage() {
      if (!this.$v.street.required) {
        return "Esse campo é requerido";
      }
      return "";
    },
    numberErrorMessage() {
      if (!this.$v.number.required) {
        return "Esse campo é requerido";
      }
      return "";
    },
    neighborhoodErrorMessage() {
      if (!this.$v.neighborhood.required) {
        return "Esse campo é requerido";
      }
      return "";
    },
    cityErrorMessage() {
      if (!this.$v.city.required) {
        return "Esse campo é requerido";
      }
      return "";
    },
    cepErrorMessage() {
      if (!this.$v.cep.required) {
        return "Esse campo é requerido";
      } else if (!this.$v.cep.minLength) {
        return "Entre com um cep válido";
      }
      return "";
    },
    descriptionErrorMessage() {
      if (!this.$v.description.required) {
        return "Esse campo é requerido";
      }
      return "";
    },
    linkErrorMessage() {
      if (!this.$v.link.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    facebookErrorMessage() {
      if (!this.$v.facebook.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    instagramErrorMessage() {
      if (!this.$v.instagram.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    twitterErrorMessage() {
      if (!this.$v.twitter.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    whatsappErrorMessage() {
      return "";
    },
    filesErrorMessage() {
      if (!this.$v.files.required) {
        return "É necessário uma imagem.";
      }
      return "";
    },
    // mascara para telefone
    phoneMask() {
      if (this.phone === null || this.phone === undefined) {
        console.log("phone undefined");
        return false;
      }
      let str = "";
      const p = this.phone;
      console.log("p", this.phone);
      const ddd = p.slice(0, 2);
      const prefix = p.slice(2, 7);
      const sufix = p.slice(7, 11);
      str = str.concat(ddd).concat("").concat(prefix).concat(" ").concat(sufix);
      console.log(str);
      return str;
    },
  },
  created() {},
  methods: {
    confirmCreate() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        if (this.waiting) {
          this.$q.notify({
            message: "Por favor, aguarde.",
          });
          return;
        }
        this.waiting = true;
        this.$store
          .dispatch("images/uploadArray", { files: this.files })
          .then((fileIds) => {
            console.log("image: ", fileIds);
            this.images = fileIds;
            this.$store.dispatch("pins/postPin", { $router: this.$router })
              .then(()=>{
                this.categoryId = '';
                this.title = '';
                this.email = '';
                this.phone = '';
                this.street = '';
                this.number = '';
                this.neighborhood = '';
                this.city = '';
                this.cep = '';
                this.description = '';
                this.images = '';
                this.link = '';
                this.facebook = '';
                this.instagram = '';
                this.twitter = '';
                this.whatsapp = '';
              });
            this.waiting = false;
          })
          .catch((error) => {
            this.waiting = false;
            console.log(error);
          });
      } else {
        this.$q.notify({
          message: "Por favor, preencha os campos corretamente.",
        });
      }
    },
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
    showForm() {
      if (this.step === 0) {
        this.lastStep = 0;
        this.active = true;
        const a = this;
        setTimeout(() => {
          a.step = 1;
        }, 800);
        console.log("iniciando primeira edição", this.lastStep, this.step);
      }
    },
    reEdit() {
      this.lastStep = 2;
      const a = this;
      setTimeout(() => {
        a.step = 1;
      }, 1000);
      console.log("reeditando", this.lastStep, this.step);
    },
    cancelEdit() {
      console.log("cancelando", this.lastStep, this.step);
      if (this.lastStep === 0) {
        this.active = false;
        const a = this;
        setTimeout(() => {
          a.step = 0;
        }, 1000);
        this.lastStep = 1;
        console.log("cancelando primeira edição", this.lastStep);
      }
      if (this.lastStep === 2) {
        const a = this;
        setTimeout(() => {
          a.step = 2;
        }, 1000);
        console.log("cancelando reedição");
        this.lastStep = 2;
      }
    },
    expand() {
      this.state = !this.state;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

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
