<template>
  <div class="app-page">
    <form
      ref="content"
      class="content-center column bg-change"
    >
      <!-- identity (seal) -->
      <logo-card class="header" />

      <!-- color line -->
      <multicolor-line class="line mg-top8" />

      <!-- info -->
      <div class="info">
        <div class="column mg-top16">
          <span class="title-2 bolder">Cartografia da Cultura - Campo Grande</span>
          <span class="body-3 mg-top16">
            Para o Fórum Municipal de Cultura é muito importante que você, sendo classe artística, produtor cultural,
            instituição ou responsável por estabelecimento, que promova arte e cultura na cidade, participe desta plataforma.
            A cartografia da cultura é uma maneira de dar voz e visibilidade a todos que produzem arte e cultura, sem hierarquias
            e com transparência.
          </span>
        </div>

        <div class="whitespace" />

        <h3 class="headline-2 bolder">
          O cadastro permitirá:
        </h3>

        <div class="context column">
          <h4 class="headline-3 bolder">
            No mapa
          </h4>
          <p class="body-3">
            Adicionar um pin no mapa. O pin significa que a sua
            localização aparecerá no mapa, indicado pela legenda da
            categoria a qual se identifica. Além da localização, ao
            clicar no pin, suas informações de contato serão exibidas.
          </p>
        </div>

        <div class="context column">
          <h4 class="headline-3 bolder">
            Na agenda
          </h4>
          <p class="body-3">
            Inserir os eventos que você irá participar ou produzir em Campo Grande.
            A agenda é o local de divulgação dos eventos culturais do
            município (shows, feiras, festas, espetáculos, performances,
            exposições, exibições, etc.) que você queira divulgar, além
            de reuniões, audiências públicas, chamadas.
          </p>
        </div>

        <div class="context column">
          <h4 class="headline-3 bolder">
            No debate
          </h4>
          <p class="body-3">
            Propor um assunto a ser debatido ou participar de um debate que acontece na plataforma através dos comentários e apoios.
            É muito importante que você, sendo um agente cultural,
            participe dos debates, dê sua opinião sobre os temas
            relacionados à cultura municipal.
            A plataforma permite dar voz e visibilidade a todos que
            produzem arte e cultura em Campo Grande, sem hierarquias e
            com transparência.
          </p>
        </div>
      </div>

      <div class="whitespace" />

      <!-- form -->
      <div class="form column">
        <h3 class="headline-2 bolder">
          Insira suas informações:
        </h3>

        <div
          class="row field"
          style="justify-content: space-between"
        >
          <!-- first name -->
          <q-input
            v-model="username"
            class="input"
            dense
            square
            filled
            label="Nome*"
            bottom-slots
            :error="$v.username.$error"
            :error-message="usernameErrorMessage"
            @blur="$v.username.$touch"
          />

          <!-- last name -->
          <q-input
            v-model="lastname"
            class="input"
            dense
            square
            filled
            label="Sobrenome*"
            bottom-slots
            :error="$v.lastname.$error"
            :error-message="lastnameErrorMessage"
            @blur="$v.lastname.$touch"
          />
        </div>

        <!-- gender -->
        <div
          class="row field gender"
          style="justify-content: space-between"
        >
          <q-select
            v-model="gender"
            class="input"
            dense
            square
            filled
            :options="genderOptions"
            label="Com qual gênero você se identifica?"
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
          :options="ageRangeOptions"
          label="Qual sua faixa etária?"
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
          :options="educationOptions"
          label="Qual o grau de educação formal?"
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
          :error="$v.emailConfirmation.$error"
          :error-message="emailConfirmationErrorMessage"
          @blur="$v.emailConfirmation.$touch"
        />

        <div
          class="row field"
          style="justify-content: space-between"
        >
          <!-- password -->
          <q-input
            v-model="password"
            class="input"
            dense
            square
            filled
            :type="isPwd ? 'password' : 'text'"
            label="senha*"
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
          v-model="model"
          class="input"
          dense
          square
          filled
          bottom-slots
          label="Foto"
          counter
          max-files="1"
          accept=".jpg,.jpeg,.png,.gif"
          max-file-size=2097152
          :error-message="avatarErrorMessage"
          :error="$v.model.$error"
          @blur="$v.model.$touch"
          @input="encode64"
        >
          <template #before>
            <q-avatar size="42px">
              <img :src="avatar">
            </q-avatar>
          </template>

          <template #append>
            <q-icon
              v-if="model !== null"
              name="close"
              class="cursor-pointer"
              @click.stop="model = null; img = null"
            />
            <q-icon
              name="create_new_folder"
              @click.stop
            />
          </template>
          <template #hint>
            Tamanho máximo de 2MB
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
          Identifique sua categoria
        </h3>
        <span class="body-3">A categoria escolhida aparecerá no mapa quando você criar seu pin.
          Escolha sabiamente, não será possível mudar posteriormente.</span>

        <div class="list">
          <q-list
            v-for="item in options"
            id="item"
            :key="item.value"
          >
            <q-item
              clickable
              @click="selectCategory(item)"
            >
              <q-item-section avatar>
                <!-- iconId -1 : index of array of icons (0 a 17) -->
                <icon-base
                  :icon-id="item.value -1"
                  width="16"
                  :set-white="!!selected"
                />
              </q-item-section>

              <q-item-section
                :id="item.value"
                class="body-3 bolder"
                :class="{ 'white' : selected }"
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
          <q-checkbox
            v-model="terms"
            size="32px"
            color="black"
            true-value="item.category"
          />

          <span class="body-3 altoc">Ao clicar em concluir cadastro, você concorda com a <br>
            <router-link
              class="link"
              :to="{ path: '/terms', hash: '#privacy'}"
            >
              <span
                class="body-3 bolder"
                :class="{ white: selected}"
              >política de privacidade</span>
            </router-link>
            e as
            <router-link
              class="link"
              :to="{ path: '/terms', hash: '#use'}"
            >
              <span
                class="body-3 bolder"
                :class="{ white: selected}"
              >condições de uso.</span>
            </router-link>
          </span>
        </div>

        <div class="btn-field">
          <q-btn
            v-if="!formIsValid"
            flat
            disable
            class="btn-custom-disable"
            color="black"
          >
            <span class="span-btn">Preencha todos os campos</span>
          </q-btn>

          <q-btn
            v-if="formIsValid"
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
/* eslint-disable */
import { mapGetters } from 'vuex';
import iconBase from '../components/iconBase.vue';
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';
import { gsap, TweenMax, Expo } from 'gsap';
const fs = require('fs');

gsap.registerPlugin(TweenMax, Expo);

export default {
  name: 'SignUp',
  components: {
    iconBase,
  },
  data() {
    return {
      model: null,
      img: null,
      loading: false,
      message: null,
      isPwd: true,
      username: '',
      lastname: '',
      email: '',
      emailConfirmation: '',
      gender: '',
      otherGender: '',
      ageRange: '',
      education: '',
      password: '',
      confirmPassword: '',
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
      ],
      selected: null, // --- selected category?
      lastSelected: 0,
      terms: false, // ----- accept terms?
    };
  },
  mounted() {
    const { overlay, presentation } = this.$refs;
    window.scrollTo(0,0);

    TweenMax.to(presentation, 2, {
      opacity: 0,
      y: -60,
      ease: Expo.easeInOut,
    });

    TweenMax.to(overlay, 2, {
      delay: 1,
      top: '-100%',
      ease: Expo.easeInOut,
    });

  },
  updated () {
    if(this.isNotOtherGender == true) {
      this.otherGender = '';
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
      validChars: (value) => {
        return (/^[a-zA-Z0-9_]+$/ig).test(value)
      }
    },
    lastname: {
      required,
      validChars: (value) => {
        return (/^[a-zA-Z0-9_]+$/ig).test(value)
      }
    },
    email: {
      required,
      email,
      maxLength: maxLength(30)
    },
    emailConfirmation: {
      required,
      sameAsPassword: sameAs('email')
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(15)
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password')
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
    model: {
      required,
    }
  },
  computed: {
    ...mapGetters({
      options: 'categories/loadCategories',
    }),
    avatar: {
      get () {
        if (this.img === null)
          return this.$store.getters['services/getDefaultImage'];
        return this.img;
      },
      set (url) {
        this.img = url;
      }
    },
    formIsValid() {
      if (this.$v.$anyError || this.selected === null || this.terms === false ) {
        return false
      } else {
        return true
      }
    },
    usernameErrorMessage () {
      if (!this.$v.username.required) {
        return 'Esse campo é requerido'
      } else if (!this.$v.username.validChars) {
        return 'Este campo deve conter apenas letras, números e underline'
      } else if (!this.$v.username.minLength) {
        return 'Mínimo de três dígitos'
      }
    },
    lastnameErrorMessage () {
      if (!this.$v.lastname.required) {
        return 'Campo requerido'
      } else if (!this.$v.lastname.validChars) {
        return 'Este campo deve conter apenas letras, números e underline'
      }
    },
    emailErrorMessage () {
      if (!this.$v.email.required) {
        return 'Email é requerido'
      } else if (!this.$v.email.email) {
        return 'Por favor insira um email válido'
      }
    },
    emailConfirmationErrorMessage () {
      if (!this.$v.emailConfirmation.required) {
        return 'Confirmação de email é requerida'
      } else if (!this.$v.emailConfirmation.sameAsEmail) {
        return 'Email não confere'
      }
    },
    passwordErrorMessage () {
      if (!this.$v.password.required) {
        return 'Senha é requerida'
      } else if (!this.$v.password.minLength) {
        return 'Mínimo de 8 dígitos'
      } else if (!this.$v.password.maxLength) {
        return 'Máximo de 15 dígitos'
      }
    },
    confirmPasswordErrorMessage () {
      if (!this.$v.confirmPassword.required) {
        return 'Confirmação de senha é requerida'
      } else if (!this.$v.confirmPassword.sameAsPassword) {
        return 'Senha não confere'
      }
    },
    genderErrorMessage () {
      if (!this.$v.gender.required) {
        return 'Informe seu gênero'
      }
    },
    ageRangeErrorMessage () {
      if (!this.$v.ageRange.required) {
        return 'Informe sua faixa etária'
      }
    },
    educationErrorMessage () {
      if (!this.$v.education.required) {
        return 'Informe seu grau de escolaridade'
      }
    },
    isNotOtherGender () {
      return this.gender != this.genderOptions[2]
    },
    avatarErrorMessage () {
    if (!this.$v.education.required) {
      return 'É necessário um avatar'
    }
    },
  },
  methods: {
    async encode64(){
      await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(this.model);
        reader.onload = () => {
          this.avatar = reader.result
        };
        reader.onerror = error => reject(error);
      });
    },
    selectCategory(el) {
      const { content } = this.$refs;

      if (el.value !== this.lastSelected) {
        this.selected = el;
        content.style.backgroundColor = this.selected.color;
        this.lastSelected = this.selected.value;
      } else {
        content.style.backgroundColor = '#f5f5f5'
        this.selected = null
        this.lastSelected = 0;
      }
    },
    loadingTransition() {
      const { overlay, message } = this.$refs;

      if(overlay && message) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });

        TweenMax.to(overlay, 2, {
          delay: 0.6,
          top: '0',
          ease: Expo.easeInOut,
        });

        TweenMax.to(message, 2, {
          delay: 3,
          opacity: 1,
          ease: Expo.easeInOut,
        });
      }

      setInterval(() => {
        this.closeTransition();
      }, 5000);

    },
    closeTransition() {
      const { overlay, message } = this.$refs;

      TweenMax.to(overlay, 2, {
        delay: 1,
        top: '-100%',
        ease: Expo.easeInOut,
      });

      TweenMax.to(message, 2, {
        opacity: 0,
        y: -60,
        ease: Expo.easeInOut,
      });

    },
    submit(){
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.loading = true;
        this.$store.dispatch('images/upload', { file: this.model })
        .then((response) => {
          console.log("response: ", response);
          this.$store.dispatch('users/signUp', { credentials: {
            firstName: this.username,
            lastName: this.lastname,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            isValid: true,
            isAdmin: false,
            categoryId: this.selected.id,
            gender: this.gender,
            otherGender: this.otherGender,
            ageRange: this.ageRange,
            education: this.education,
            avatarId: response[0],
          }})
          .then((response) => {
            this.message = 'Só uns segundinhos';
            this.loadingTransition();
            this.$router.push({ name: 'SignIn' });
          })
          .catch ((error) => {
            if(error.message === 'Request failed with status code 400') {
              this.message = 'Desculpe, houve um erro. Tente Novamente mais tarde';
            }
            this.loadingTransition();
          });
        })
        .catch ((error) => {
            console.log(error);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.white {
  color: #ffffff;
}

.bg-change {
  transition: background-color .6s ease-in;
}

.content-center {
  @include centered-column;
}

.clip-path {
  clip-path: circle(100%);
  -webkit-transition: -webkit-clip-path 1s ease-out;
  transition: -webkit-clip-path 1s ease-out;
}

.line {
  margin-top: 32px;
  width: 100%;
}

.info, .form, .terms, .category, .actions {
  margin-top: 16px;
}

.btn-field, .list {
  margin-top: 8px;
}

.form {
  width: 100%;
}

.item:hover {
  color: black;
}

.terms {
  align-items: start;
}

.headline {
  margin-bottom: 8px;
}

.context {
  margin-top: 8px;
  margin-left: 8px;

  @include for-phone-only {
    margin-left: 0px;
  }
}

.terms {
  @include for-phone-only {
    flex-wrap: nowrap;
    align-items: flex-start;
    margin-left: -8px;

    .altoc {
      margin-top: 4px;
      margin-left: 8px;
    }
  }
}

.body-2 {
  text-align: justify;
}

.link {
  color: black;
  text-decoration: none;
  font-size: 16px;
}

.btn-custom {
  box-shadow: none;
  background-color: black;
  border-radius: 0px;
  height: 40px;
  width: 180px;
  margin-top: 8px;

  &:hover {
    transform: scale(50%);
  }

  @include for-phone-only {
    width: 100%;
  }
}

.btn-custom-disable {
  box-shadow: none;
  background-color: black;
  border-radius: 0px;
  height: 40px;
  margin-top: 8px;
}

.field {
  height: 60px;
}

.input {
  font-size: 1.02rem;
  min-width: 49%;
  max-height: 50px;
  margin-top: 16px;

  @include for-phone-only {
    width: 100%;
  }
}

.btn-custom:hover {
  transform: scale(1.05);
  transition: all 0.2s linear;
}

.span-btn {
  font-weight: bold;
  font-size: 1em;
  letter-spacing: 0.5px;
  color: white;
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

h3.headline-2,
p.body-3,
h4.headline-3 {
  margin-top: 0;
  margin-bottom: 0;
}

h3.headline-2 {
  line-height: 1.5em;
}

</style>
