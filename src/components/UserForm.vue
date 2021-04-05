<template>
  <div class="box">
    <div class="input-content">
      <h4 class="title-3 bolder">Edite seu perfil</h4>

      <div class="row justify-between mg-top8">
        <div class="column">
          <span class="subheading-2">Nome</span>
          <q-input
            v-model="firstName"
            class="input"
            dense
            input-class="text-black"
            color="black"
          />
        </div>

        <div class="column">
          <span class="subheading-2">Sobrenome</span>
          <q-input
            v-model="lastName"
            class="input"
            dense
            input-class="text-black"
            color="black"
          />
        </div>
      </div>

      <div class="row justify-between mg-top8">
        <div class="column mg-top8">
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
        >
          <template #selected>
            <span class="caption bold">{{ $store.getters['categories/getCategoryById'](categoryId).label }}</span>
          </template>
        </q-select>
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Avatar</span>
        <q-file
          v-model="model"
          class="input"
          dense
          square
          counter
          use-chips
          max-files="1"
          @input="encode64"
        >
          <template #before>
            <q-avatar size="30px">
              <img :src="model === null?`${$store.getters['services/getImagePath']}${avatar}`: img64">
            </q-avatar>
          </template>
          <template #append>
            <q-icon
              v-if="model !== null"
              name="close"
              class="cursor-pointer"
              @click.stop="model = null"
            />
            <q-icon
              name="create_new_folder"
              @click.stop
            />
          </template>
          <template #hint>
            Tamanho máximo de 5MB
          </template>
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

    <div
      class="mg-top32"
      align="right"
    >
      <q-btn
        class="mg-right8"
        flat
        color="black"
        @click="cancelCreate()"
      >
        <span class="caption">Cancelar</span>
      </q-btn>

      <q-btn
        outline
        color="black"
        @click="confirmCreate()"
      >
        <span class="caption">Finalizar</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { createHelpers } from 'vuex-map-fields';

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
      model: null,
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
  computed: {
    ...mapFields({
      firstName: 'userForm.firstName',
      ageRange:'userForm.ageRange',
      avatar:'userForm.avatarId',
      categoryId: 'userForm.categoryId',
      education:'userForm.education',
      email:'userForm.email',
      firstName:'userForm.firstName',
      gender:'userForm.gender',
      lastName:'userForm.lastName',
      otherGender:'userForm.otherGender',
    }),
    ...mapGetters({
      categories: 'categories/loadCategories',
      user: 'users/getCurrentUser',
    }),
  },
  methods: {
     async encode64(){
      if (this.model !== null){
        await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(this.model);
        reader.onload = () => {
          this.img64 = reader.result
        };
        reader.onerror = error => reject(error);
      });
    }
     
    },
    cancelCreate() { // cancela criação do evento ou edição de shortEvent
      this.category = {
        label: '',
        value: '',
        color: '#b8cad4',
      }
      
    },
    confirmCreate() { // confirma criação de evento ou ediçao de shortEvent
      this.$store.dispatch('images/uploadArray', { files: this.files })
        .then((filenames) => {
          this.images = JSON.stringify(filenames);
          this.$store.dispatch('events/createNewEvent');
        })
        .catch ((error) => {
            console.log(error);
        });
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';


.box {
  padding: 16px;
}

.input {
  width: 100%;
  // height: 40px;
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
