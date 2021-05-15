<template>
  <div class="app-page signUp">
    <form
      ref="content"
      class="content-center column"
    >
      <!-- identity (seal) -->
      <logo-card class="header" />

      <!-- color line -->
      <multicolor-line class="line mg-top8" />

      <!-- info -->
      <div class="info">
        <div class="column mg-top16">
          <h1 class="title-2 bolder">
            Cartografia da Cultura Campo Grande
          </h1>
          <p class="body-3 mg-top16 bolder">
            Se é seu primeiro cadastro, leia com atenção o texto abaixo! 
          </p> 
          <p class="body-3 mg-top16">
            Para nós é muito importante que você participe desta plataforma. Se você faz parte da cena cultural ou tem afinidade com o tema, 
            sinta-se à vontade para colaborar e contribuir na promoção da arte e cultura da nossa cidade. 
            A Cartografia da Cultura é um espaço que permite de dar voz e visibilidade a todos que produzem arte e cultura, sem hierarquias
            e com transparência.
          </p>
        </div>

        <div class="whitespace" />

        <h3 class="headline-2 bolder">
          O que o cadastro te permite? 
        </h3>

        <div class="context">
          <h4 class="headline-3 bolder">
            No mapa
          </h4>
          <p class="body-3">
            Adicionar um pin no mapa. O pin significa que você aparecerá no mapa da tela inicial da plataforma.
            Quando você insere um pin, a localização que você informou estará no mapa, indicado pela letra/egenda da
            categoria a qual você se identificou. Além da localização, ao clicar no pin, suas informações de contato serão exibidas.
          </p>
        </div>

        <div class="context">
          <h4 class="headline-3 bolder">
            Na agenda
          </h4>
          <p class="body-3">
            Inserir os eventos que você irá participar ou produzir em Campo Grande.
            A agenda é o local de divulgação dos eventos culturais do
            município, sejam eles online ou presencial: shows, feiras, festas, espetáculos, performances,
            exposições, exibições. E também pode divulgar encontros, reuniões, audiências públicas, chamadas públicas. 
            Você pode inserir quantos eventos quiser.
          </p>
        </div>

        <div class="context">
          <h4 class="headline-3 bolder">
            No debate
          </h4>
          <p class="body-3">
            Você pode propor um assunto a ser discutido ou participar de um debate que já acontece na plataforma através dos comentários e apoios.
            É muito importante que você, sendo um agente cultural,
            participe dos debates, dê sua opinião sobre os temas
            relacionados à cultura municipal.
          </p>
        </div>
      </div>

      <div class="whitespace" />

      <!-- form -->
      <div class="form column">
        <h3 class="headline-2 bolder">
          Insira suas informações:
        </h3>

        <div class="name">
          <!-- first name -->
          <q-input
            v-model="firstName"
            class="input"
            dense
            square
            filled
            label="Nome*"
            required
            bottom-slots
            :error="$v.firstName.$error"
            :error-message="firstNameErrorMessage"
            @blur="$v.firstName.$touch"
          />

          <!-- last name -->
          <q-input
            v-model="lastName"
            class="input"
            dense
            square
            filled
            label="Sobrenome*"
            required
            bottom-slots
            :error="$v.lastName.$error"
            :error-message="lastNameErrorMessage"
            @blur="$v.lastName.$touch"
          />
        </div>

        <!-- gender -->
        <div class="gender">
          <q-select
            v-model="gender"
            class="input"
            dense
            square
            filled
            label="Com qual gênero você se identifica?*"
            required
            :options="genderOptions"
            :error="$v.gender.$error"
            :error-message="genderErrorMessage"
            @blur="$v.gender.$touch"
          />

          <q-input
            v-model="otherGender"
            :disable="isNotOtherGender"
            class="input"
            dense
            square
            filled
            label="Outro"
            bottom-slots
          />
        </div>

        <!-- age range -->
        <q-select
          v-model="ageRange"
          class="input"
          dense
          square
          filled
          label="Qual sua faixa etária?*"
          required
          :options="ageRangeOptions"
          :error="$v.ageRange.$error"
          :error-message="ageRangeErrorMessage"
          @blur="$v.ageRange.$touch"
        />

        <!-- education -->
        <q-select
          v-model="education"
          class="input"
          dense
          square
          filled
          label="Qual o grau de educação formal?*"
          required
          :options="educationOptions"
          :error="$v.education.$error"
          :error-message="educationErrorMessage"
          @blur="$v.education.$touch"
        />

        <!-- email -->
        <q-input
          v-model="email"
          class="input"
          dense
          square
          filled
          label="email*"
          required
          :error="$v.email.$error"
          :error-message="emailErrorMessage"
          lazy-rules
          @blur="$v.email.$touch"
        />

        <!-- confirm email -->
        <q-input
          v-model="emailConfirmation"
          class="input"
          dense
          square
          filled
          label="confirme o email*"
          required
          :error="$v.emailConfirmation.$error"
          :error-message="emailConfirmationErrorMessage"
          @blur="$v.emailConfirmation.$touch"
        />

        <div class="password">
          <!-- password -->
          <q-input
            v-model="password"
            class="input"
            dense
            square
            filled
            :type="isPwd ? 'password' : 'text'"
            label="senha*"
            required
            :error="$v.password.$error"
            :error-message="passwordErrorMessage"
            @blur="$v.password.$touch"
          >
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <!-- confirm password -->
          <q-input
            v-model="confirmPassword"
            class="input"
            dense
            square
            filled
            :type="isPwd ? 'password' : 'text'"
            label="confirme a senha*"
            required
            :error="$v.confirmPassword.$error"
            :error-message="confirmPasswordErrorMessage"
            @blur="$v.confirmPassword.$touch"
          >
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <!-- end row -->
        <!-- file picker -->
        <q-file
          v-model="avatarPic"
          class="input"
          dense
          square
          filled
          bottom-slots
          label="Foto"
          counter
          max-files="1"
          accept=".jpg,.jpeg,.png,.gif"
          max-file-size="2097152"
          @input="encode64"
        >
          <template #before>
            <q-avatar size="42px">
              <img :src="avatar">
            </q-avatar>
          </template>

          <template #append>
            <q-icon
              v-if="avatarPic !== null"
              name="close"
              class="cursor-pointer"
              @click.stop="
                avatarPic = null;
                img = null;
              "
            />
            <q-icon
              name="create_new_folder"
              @click.stop
            />
          </template>
          <template #hint>
            Tamanho máximo de 2MB. Formato: JPG.
          </template>
          <!-- <template #after>
            <q-btn
              round
              dense
              flat
              icon="send"
              @click="sendImage"
            />
          </template> -->
        </q-file>
      </div>

      <div class="whitespace" />

      <!-- selecionar categoria -->
      <div
        id="target"
        class="category column"
      >
        <h3 class="headline-2 bolder">
          Identifique sua categoria*
        </h3>

        <div class="list">
          <q-list>
            <q-item
              v-for="item in options"
              :id="item.id"
              :key="item.value"
              clickable
              class="category-item"
              :active="item.id == categoryId ? true : false"
              active-class="active"
              :style="{'color': item.color}"
              @click="selectCategory(item)"
            >
              <q-item-section
                avatar
                style="align-items: center"
              >
                <span :class="`icon-${item.value}`" />
              </q-item-section>

              <q-item-section
                :id="item.value"
                class="body-3 category-text"
              >
                {{ item.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <!-- ações -->
      <div class="actions">
        <div class="terms row">
          <span class="body-3 altoc">
            Ao concluir seu cadastro, você concorda com a 
            <router-link
              class="link"
              target="_blank"
              :to="{ path: '/terms', hash: '#privacy' }"
            >
              <span class="body-3 bolder">política de privacidade</span>
            </router-link>
            e as
            <router-link
              class="link"
              target="_blank"
              :to="{ path: '/terms', hash: '#use' }
              "
            >
              <span class="body-3 bolder">condições de uso.</span>
            </router-link>
          </span>
        </div>

        <div class="btn-field">
          <!-- <q-btn
            v-if="!formIsValid"
            flat
            disable
            class="btn-custom-disable"
            color="black"
          >
            <span class="span-btn">Preencha todos os campos</span>
          </q-btn> -->

          <q-btn
            flat
            class="btn-custom"
            color="black"
            @click="submit()"
          >
            <span class="span-btn">Cadastre-se</span>
          </q-btn>
        </div>
      </div>

      <div class="bottom-space" />
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  required,
  email,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "users/getField",
  mutationType: "users/updateField",
});

export default {
  name: "SignUp",
  data() {
    return {
      waiting: false,
      avatarPic: null,
      img: require("../assets/default.png"),
      loading: false,
      message: null,
      isPwd: true,
      genderOptions: ["Feminino", "Masculino", "Outros"],
      ageRangeOptions: [
        "Menos de 20 anos",
        "Entre 20 e 30 anos",
        "Entre 30 e 40 anos",
        "Entre 40 e 50 anos",
        "Entre 50 e 60 anos",
        "Mais de 60 anos",
      ],
      educationOptions: [
        "Fundamental completo",
        "Ensino médio completo",
        "Superior incompleto",
        "Superior completo",
        "Pós-graduado",
      ],
      selected: null,
    };
  },
  validations: {
    firstName: {
      required,
      minLength: minLength(2),
    },
    lastName: {
      required,
      minLength: minLength(2),
    },
    email: {
      required,
      email
    },
    emailConfirmation: {
      required,
      sameAsPassword: sameAs("email"),
    },
    password: {
      required,
      minLength: minLength(8)
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
    gender: {
      required,
    },
    ageRange: {
      required,
    },
    education: {
      required,
    },
    avatarPic : {
    },
  },
  computed: {
    ...mapFields({
      firstName: "signUpForm.firstName",
      lastName: "signUpForm.lastName",
      email: "signUpForm.email",
      emailConfirmation: "signUpForm.emailConfirmation",
      password: "signUpForm.password",
      confirmPassword: "signUpForm.confirmPassword",
      categoryId: "signUpForm.categoryId",
      gender: "signUpForm.gender",
      otherGender: "signUpForm.otherGender",
      ageRange: "signUpForm.ageRange",
      education: "signUpForm.education",
      avatarId: "signUpForm.avatarId",
    }),
    ...mapGetters({
      options: "categories/loadCategories",
    }),
    avatar: {
      get() {
        if (this.img === null)
          return this.$store.getters["services/getDefaultImage"];
        return this.img;
      },
      set(url) {
        this.img = url;
      },
    },
    formIsValid() {
      if (this.$v.$anyError || this.selected === null) {
        return false;
      }
      return true;
    },
    firstNameErrorMessage() {
      if (!this.$v.firstName.required) {
        return "Preenchimento obrigatório";
      }
      if (!this.$v.firstName.minLength) {
        return "Mínimo de dois dígitos";
      }
      return "Preenchimento inválido"
    },
    lastNameErrorMessage() {
      if (!this.$v.lastName.required) {
        return "Preenchimento obrigatório";
      }
      if (!this.$v.lastName.minLength) {
        return "Mínimo de dois dígitos";
      }
      return "Preenchimento inválido"
    },
    emailErrorMessage() {
      if (!this.$v.email.required) {
        return "Email é requerido";
      }
      if (!this.$v.email.email) {
        return "Por favor insira um email válido";
      }
      return "Preenchimento inválido"
    },
    emailConfirmationErrorMessage() {
      if (!this.$v.emailConfirmation.required) {
        return "Confirmação de email é obrigatória";
      } else if (!this.$v.emailConfirmation.sameAsEmail) {
        return "Email não confere";
      }
      return "Preenchimento inválido"
    },
    passwordErrorMessage() {
      if (!this.$v.password.required) {
        return "Senha é obrigatória";
      }
      if (!this.$v.password.minLength) {
        return "Mínimo de 8 dígitos";
      }

      return "Preenchimento inválido"
    },
    confirmPasswordErrorMessage() {
      if (!this.$v.confirmPassword.required) {
        return "Confirmação de senha é obrigatória";
      } else if (!this.$v.confirmPassword.sameAsPassword) {
        return "Senha não confere";
      }
      return "Preenchimento inválido"
    },
    genderErrorMessage() {
      if (!this.$v.gender.required) {
        return "Informe seu gênero";
      }
      return "Preenchimento inválido"
    },
    ageRangeErrorMessage() {
      if (!this.$v.ageRange.required) {
        return "Informe sua faixa etária";
      }
      return "Preenchimento inválido"
    },
    educationErrorMessage() {
      if (!this.$v.education.required) {
        return "Informe seu grau de escolaridade";
      }
      return "Preenchimento inválido"
    },
    isNotOtherGender() {
      return this.gender != this.genderOptions[2];
    }
  },
  updated() {
    if (this.isNotOtherGender == true) {
      this.otherGender = "";
    }
  },
  methods: {
    async encode64() {
      await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(this.avatarPic);
        reader.onload = () => {
          this.avatar = reader.result;
        };
        reader.onerror = (error) => reject(error);
      });
    },
    selectCategory({id, color}) {
      this.categoryId = id;
      this.selected = true;
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$anyError && this.selected) {
        if (this.waiting) {
          this.$q.notify({
            message: "Por favor, aguarde.",
            position: 'top-right',
          });
        }
        this.waiting = true;
        this.loading = true;
        this.$store
          .dispatch("users/signUp", { file: this.avatarPic })
          .then(() => {

            this.firstName = ""
            this.lastName = ""
            this.email = ""
            this.emailConfirmation = ""
            this.password = ""
            this.confirmPassword = ""
            this.categoryId = ""
            this.gender = ""
            this.otherGender = ""
            this.ageRange = ""
            this.education = ""
            this.avatarId = ""

            this.$router.push({ name: "SignIn" });
            this.waiting = false;
          })
          .catch(() => this.waiting = false);
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
@import "../styles/mixins.scss";
@import '../styles/categories.scss';

.content-center {
  @include centered-column;
}

.form {
  width: 100%;
}

.link {
  color: black;
  text-decoration: none;
  font-size: 16px;
}

.info {
  .headline-3 {
    line-height: 2rem;
    margin: 0 0 10px;
  }

  .context {
    padding-left: 8px;
  }

  p {
    margin-bottom: 8px;
  }
}

.headline-2 {
  margin: 0
}
.input {
  height: 56px;
  margin-bottom: 8px;
}

.name,
.gender,
.password {
  display: flex;
  justify-content: space-between;
  .input {
    min-width: 49%;
  }
}

.gender {
  height: 60px;
}

.terms {
  margin-top: 16px;
}

.btn-custom {
  box-shadow: none;
  background-color: black;
  border-radius: 0px;
  height: 40px;
  width: 180px;
  margin-top: 16px;
  transition: all 0.2s linear;

  @include for-phone-only {
    width: 100%;
  }

  &:hover {
    transform: scale(1.05);
  }

  .span-btn {
    font-weight: bold;
    font-size: 1em;
    letter-spacing: 0.5px;
    color: white;
  }
}

.category-item {
  transition: background-color 0.6s ease-in;
  padding-right: 16px;
  font-weight: bolder;
  border-radius: 3px;

  &.active {
    background-color: currentColor;

    span[class^="icon-"],
    .category-text {
      color: white;
    }

  }

  span[class^="icon-"],
  .category-text {
    color: black;
  }

  span[class^="icon-"] {
    font-size: 2em;
  }
}

.whitespace {
  height: 30px;

  @include for-phone-only {
    height: 16px;
  }

  @include for-tablet-portrait-only {
    height: 25px;
  }
}

.bottom-space {
  height: 60px;

  @include for-phone-only {
    height: 24px;
  }

  @include for-tablet-portrait-only {
    height: 32px;
  }
}
</style>
