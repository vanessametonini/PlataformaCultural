<template>
  <div class="app-page">

    <div class="overlay" ref="overlay">
      <h1 class="presentation" ref="presentation" v-if="!loading">Faça Parte</h1>
      <span class="message" ref="message" v-if="message !== null">{{ message }}</span>
    </div>

    <div
      id="content"
      class="content-center column"
      :class="{ 'bg-change' : active }"
      >

      <!-- identity (seal) -->
      <logo-card class="header" :blackMode="true"/>

      <!-- color line -->
      <multicolor-line class="line mg-top8"/>

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

        <div class="whitespace"></div>

        <div class="">
          <span class="headline-2 bolder">O cadastro permitirá:</span>
        </div>

        <div class="context column">
          <span class="headline-3 bolder">mapa</span>
          <span class="body-3">
            Adicionar um pin no mapa (sua localização e informações que inserir serão vistos por todos).
            Cada cadastro permitirá que você insira um pin.
          </span>
        </div>

        <div class="context column">
          <span class="headline-3 bolder">agenda cultural</span>
          <span class="body-3">
            Inserir na agenda os eventos que você irá participar ou produzir em Campo Grande. Além de ser mais um local de divulgação
            do seu trabalho, o visitante ao acessar a plataforma, poderá visualizar os eventos que acontecerão nos próximos dias, reunidos num só lugar.
          </span>
        </div>

        <div class="context column">
          <span class="headline-3 bolder">diálogos</span>
          <span class="body-3">
            Propor ou participar de debates que acontecem online, proposto pelo Fórum Municipal de Cultura ou pelos participantes, entre produtores
            artísticos e culturais da cidade.
          </span>
        </div>

      </div>

      <div class="whitespace"></div>

      <!-- form -->
      <div class="form column">

        <span class="headline-2 bolder">Insira suas informações:</span>

        <div class="row field" style="justify-content: space-between">

          <!-- first name -->
          <q-input
            class="input"
            dense
            square
            filled
            v-model="username"
            label="Nome*"
            bottom-slots
            @blur="$v.username.$touch"
            :error="$v.username.$error"
            :error-message="usernameErrorMessage"
          />

          <!-- last name -->
          <q-input
            class="input"
            dense
            square
            filled
            v-model="lastname"
            label="Sobrenome*"
            bottom-slots
            @blur="$v.lastname.$touch"
            :error="$v.lastname.$error"
            :error-message="lastnameErrorMessage"
          />

        </div>

        <!-- email -->
        <q-input
          class="input"
          dense
          square
          filled
          v-model="email"
          label="email*"
          @blur="$v.email.$touch"
          :error="$v.email.$error"
          :error-message="emailErrorMessage"
          lazy-rules
        />

        <!-- confirm email -->
        <q-input
          class="input"
          dense
          square
          filled
          v-model="emailConfirmation"
          label="confirme o email*"
          @blur="$v.emailConfirmation.$touch"
          :error="$v.emailConfirmation.$error"
          :error-message="emailConfirmationErrorMessage"
        />

        <div class="row field" style="justify-content: space-between">

          <!-- password -->
          <q-input
            class="input"
            dense
            square
            filled
            v-model="password"
            label="senha*"
            @blur="$v.password.$touch"
            :error="$v.password.$error"
            :error-message="passwordErrorMessage"
          />

          <!-- confirm password -->
          <q-input
            class="input"
            dense
            square
            filled
            v-model="confirmPassword"
            label="confirme a senha*"
            @blur="$v.confirmPassword.$touch"
            :error="$v.confirmPassword.$error"
            :error-message="confirmPasswordErrorMessage"
          />

        </div>
        <!-- end row -->

      </div>

      <div class="whitespace"></div>

      <!-- selecionar categoria -->
      <div id="target" class="category column">

        <span class="headline-2 bolder">Identifique sua categoria</span>
        <span class="body-3">A categoria escolhida aparecerá no mapa quando você criar seu pin.
          Escolha sabiamente, não será possível mudar posteriormente.</span>

        <div class="list">
          <q-list id="item" v-for="item in options" :key="item.value">

            <q-item clickable @click="emit(item)">

              <q-item-section avatar>

                <!-- iconId -1 : index of array of icons (0 a 17) -->
                <icon-base :iconId="item.value -1" width="16" :setWhite="active" />

              </q-item-section>

              <q-item-section :id="item.value" class="body-3 bolder" :class="{ 'white' : active }"> {{ item.label }} </q-item-section>

            </q-item>

          </q-list>

        </div>

      </div>

      <!-- ações -->
      <div class="actions">

        <div class="terms row">

          <q-checkbox v-model="terms" size="32px" color="black"  true-value="item.category"/>

          <span class="body-3 altoc">Eu li e concordo com os
              <router-link class="link" :to="{ path: '/terms', hash: '#terms'}">
                <span class="body-3 bolder" :class="{ white: active}">Termos de Uso</span>
              </router-link>
              e
              <router-link class="link" :to="{ path: '/terms', hash: '#privacity'}">
                <span class="body-3 bolder" :class="{ white: active}">Privacidade.</span>
              </router-link>

          </span>

        </div>

        <div class="btn-field">

          <q-btn
            flat
            disable
            v-if="!formIsValid"
            class="btn-custom-disable"
            color="black"
          >
            <span class="span-btn">Preencha todos os campos</span>
          </q-btn>

          <q-btn
            flat
            @click="submit()"
            v-if="formIsValid"
            class="btn-custom"
            color="black"
          >
            <span class="span-btn">Cadastre-se</span>
          </q-btn>

        </div>

      </div>

      <div class="bottom-space"></div>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapState, mapActions } from 'vuex';
import iconBase from '../components/iconBase.vue';
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';
import { gsap, TweenMax, Expo } from 'gsap';

gsap.registerPlugin(TweenMax, Expo);

export default {
  name: 'SignUp',
  components: {
    iconBase,
  },
  data() {
    return {
      loading: false,
      message: null,
      username: '',
      lastname: '',
      email: '',
      emailConfirmation: '',
      password: '',
      confirmPassword: '',
      selected: null, // --- selected category?
      lastSelected: 0,
      active: false,
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
    }
  },
  computed: {
    ...mapGetters({
      options: 'categories/loadCategories',
    }),
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
  },
  methods: {
    emit(el) {
      this.selected = el;
      this.active = true;
      // let teste = document.getElementById(`svg${el.value}`);
      // let val2 = teste.getElementsByTagName('g');
      // console.log(val2);
      if (el.value !== this.lastSelected) {
        document.getElementById('content').style.backgroundColor = this.selected.color;
        document.getElementById(`${this.lastSelected}`).style.color = '#fff';
        document.getElementById(`${el.value}`).style.color = '#000';
        this.lastSelected = this.selected.value;
      } else {
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
      if (!this.$v.$anyError) {
        this.loading = true;
        this.$store.dispatch('users/signUp', { credentials: {
          firstName: this.username,
          lastName: this.lastname,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          isValid: true,
          isAdmin: false,
          categoryId: this.selected.value,
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
      }
    },
  },
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';
@import '../styles/mixins.scss';

* {
  font-family: 'Helvetica';
  box-sizing: border-box;
}

.white {
  color: #ffffff;
}

.bg-change {
  transition: .6s ease-in;
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0.8;
	}
	100% {
		opacity: 1;
	}
}

.app-page {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

.overlay {
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100vh;
  background: #fff;
  top: 0%;
}

.overlay h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  color: black;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 14px;
  text-transform: uppercase;
  overflow: hidden;
}

.overlay span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  color: black;
  font-family: 'Helvetica';
  font-size: 1.2rem;
  letter-spacing: 8px;
  font-weight: 900;
  text-transform: uppercase;
  overflow: hidden;
}

.content-center {
  background-color: #f5f5f5;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 650px;
  margin: 32px;
  padding: 32px;
  // clip-path: circle(30px at 90% 40px);
  z-index: 0;
  align-items: flex-start;

  @include for-phone-only {
    width: 100%;
    margin: 0px;
    padding: 32px;
  }

  @include for-tablet-portrait-only {
    width: 650px;
    margin-top: 16px;
    padding: 32px;
  }
}

.clip-path {
  // background-color: pink;
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
  align-items: center;
  margin-left: -8px;

  @include for-phone-only {
    margin-left: 0px;
  }
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

// .body, .line, .form {
//   width: 600px;
// }

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
  font-family: 'Courier New', Courier, monospace;
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
  font-family: 'Helvetica-Normal';
  font-size: 1.02rem;
  min-width: 49%;
  max-height: 50px;
  margin-top: 16px;

  @include for-phone-only {
    width: 100%;
  }
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
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

</style>
