<template>
  <div class="box">
    <div class="input-content">
      <h4 class="title-3 bolder">
        Perfil
      </h4>
      <span
        class="edit-icon"
        @click="setEditMode()"
      >
        <i class="fas fa-edit" />
      </span>

      <div class="row justify-between mg-top8">
        <div class="column">
          <span class="subheading-2">Nome*</span>
          <q-input
            v-model="firstName"
            class="input"
            dense
            input-class="text-black"
            color="black"
            required
            :readonly="!editMode"
            :error="$v.firstName.$error"
            :error-message="firstNameErrorMessage"
            @blur="$v.firstName.$touch"
          />
        </div>

        <div class="column">
          <span class="subheading-2">Sobrenome*</span>
          <q-input
            v-model="lastName"
            class="input"
            dense
            input-class="text-black"
            color="black"
            required
            :readonly="!editMode"
            :error="$v.lastName.$error"
            :error-message="lastNameErrorMessage"
            @blur="$v.lastName.$touch"
          />
        </div>
      </div>

      <div class="row justify-between mg-top8">
        <div
          class="column"
          style="width: 49%"
        >
          <span class="subheading-2">Gênero</span>
          <q-select
            v-model="gender"
            option-value="id"
            option-label="label"
            map-options
            emit-value
            class="input"
            square
            dense
            :options="genderOptions"
            options-dense
            options-selected-class
            color="black"
            :readonly="!editMode"
          >
            <template #selected>
              <span class="caption bold">{{ gender }}</span>
            </template>
          </q-select>
        </div>

        <div class="column">
          <span class="subheading-2">Outro</span>
          <q-input
            v-model="otherGender"
            class="input"
            dense
            input-class="text-black"
            color="black"
            :readonly="!editMode"
          />
        </div>
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Faixa etária</span>
        <q-select
          v-model="ageRange"
          option-value="id"
          option-label="label"
          map-options
          emit-value
          class="input"
          square
          dense
          :options="ageRangeOptions"
          options-dense
          options-selected-class
          color="black"
          :readonly="!editMode"
        >
          <template #selected>
            <span class="caption bold">{{ ageRange }}</span>
          </template>
        </q-select>
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Formação</span>
        <q-select
          v-model="education"
          option-value="id"
          option-label="label"
          map-options
          emit-value
          class="input"
          square
          dense
          :options="educationOptions"
          options-dense
          options-selected-class
          color="black"
          :readonly="!editMode"
        >
          <template #selected>
            <span class="caption bold">{{ education }}</span>
          </template>
        </q-select>
      </div>

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
          :readonly="!editMode"
        >
          <template #selected>
            <span class="caption bold">{{ getCategoryLabel }}</span>
          </template>
        </q-select>
      </div>

      <div
        v-if="editMode"
        class="column mg-top8"
      >
        <span class="subheading-2">Avatar</span>
        <q-file
          v-model="file"
          class="input"
          dense
          square
          counter
          max-files="1"
          @input="encode64"
        >
          <template #before>
            <q-avatar
              v-if="file === null && !avatar"
              size="30px"
            >
              <img :src="defaultImage">
            </q-avatar>
            <q-avatar
              v-else
              size="30px"
            >
              <img :src="file === null ? getAvatar: img64">
            </q-avatar>
          </template>
          <template #append>
            <q-icon
              v-if="file !== null"
              name="close"
              class="cursor-pointer"
              @click.stop="file = null"
            />
            <q-icon
              name="create_new_folder"
              @click.stop
            />
          </template>
          <template #hint>
            Tamanho máximo de 5MB
          </template>
        </q-file>
      </div>
    </div>

    <div
      v-if="editMode"
      class="mg-top32"
      align="right" 
    >
      <q-btn
        class="mg-right8"
        flat
        color="black"
        @click="setEditMode()"
      >
        <span class="caption">Cancelar</span>
      </q-btn>

      <q-btn
        outline
        color="black"
        @click="updateUser()"
      >
        <span class="caption">Atualizar</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { createHelpers } from 'vuex-map-fields';
import { required } from "vuelidate/lib/validators";

const { mapFields } = createHelpers({
  getterType: 'users/getField',
  mutationType: 'users/updateField',
});

export default {
  name: 'UserForm',
  components: {
  },
  data() {
    return {
      waiting: false,
      editMode: false,
      defaultImage: require("../assets/default.png"),
      file: null,
      img64: '',
      genderOptions: [
        'Feminino',
        'Masculino',
        'Outros'
      ],
      ageRangeOptions: [
        'Menos de 20 anos',
        'Entre 20 e 30 anos',
        'Entre 30 e 40 anos',
        'Entre 40 e 50 anos',
        'Entre 50 e 60 anos',
        'Mais de 60 anos'
      ],
      educationOptions: [
        'Fundamental completo',
        'Ensino médio completo',
        'Superior incompleto',
        'Superior completo',
        'Pós-graduado'
      ]
    };
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    }
  },
  computed: {
    ...mapFields({
      firstName:'userForm.firstName',
      ageRange:'userForm.ageRange',
      avatar:'userForm.avatarId',
      categoryId: 'userForm.categoryId',
      education:'userForm.education',
      email:'userForm.email',
      gender:'userForm.gender',
      lastName:'userForm.lastName',
      otherGender:'userForm.otherGender',
    }),
    ...mapGetters({
      categories: 'categories/loadCategories',
      user: 'users/getCurrentUser',
    }),
    getAvatar() {
      return `${this.$store.getters['services/getImagePath']}${this.avatar}`
    },
    getCategoryLabel() {
      return this.$store.getters["categories/getCategoryById"](this.categoryId).label
    },
    firstNameErrorMessage() {
      if (!this.$v.firstName.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    lastNameErrorMessage() {
      if (!this.$v.lastName.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
  },
  methods: {
     async encode64(){
      if (this.file !== null){
        await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          this.img64 = reader.result
        };
        reader.onerror = error => reject(error);
        });
      }
    },
    setEditMode() {
      this.editMode = !this.editMode;
    },
    updateUser() {
      this.waiting = true;
      this.$v.$touch();

      if (!this.$v.$anyError) {
        this.$q.notify({
          message: "Por favor, aguarde.",
          position: 'top-right',
          timeout: 1500
        });

        //se tiver imagens
        if (this.file) {
          this.$store
            .dispatch("images/uploadAvatar", { file: this.file, userId: this.user.id })
            .then((fileId) => {
              this.avatar = fileId;
              this.$store.dispatch("users/editUser");
              this.editMode = false;
            })
            .catch((error) => {
            this.waiting = false;
          });
        }
        //se não tiver imagens
        else {
          this.$store.dispatch("users/editUser");
          this.editMode = false;
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
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.input-content {
  position: relative;
}

.edit-icon {
  position: absolute;
  top: 0;
  left: 505px;
  cursor: pointer;
}

.input {
  width: 100%;
  min-width: 49%;
  // height: 40px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: -8px;
}

span {
  color: black;
}
</style>
