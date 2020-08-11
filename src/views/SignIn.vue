<template>
  <div class="app-page column">

    <div class="identity">
       <logo-card class="logo" :blackMode="true"/>
    </div>

    <div class="content column">

      <div class="card column">

        <span class="title title-3 bolder"> Olá novamente </span>
        <router-link class="link" to="/signUp">
          <span class="body-3">Novo Usuário? Cadastre-se</span>
        </router-link>

        <div class="error-field" v-if="errorMessage !== null">
          <span class="error-message">* {{ errorMessage }}</span>
        </div>

        <div class="input-field">

          <q-input
            class="input"
            square
            filled
            clearable
            clear-icon="close"
            color="black"
            v-model="email"
            type="email"
            label="Email"
            @blur="$v.email.$touch"
            :error="$v.email.$error"
            :error-message="emailErrorMessage"
            lazy-rules
          />

          <q-input
            class="input"
            square
            filled
            cleareble
            clear-icon="close"
            color="black"
            :type="isPwd ? 'password' : 'text'"
            label="Senha"
            v-model="password"
            @blur="$v.password.$touch"
            :error="$v.password.$error"
            :error-message="passwordErrorMessage"
            lazy-rules
            hint="Mínimo de 8 caracteres"
          >
            <template v-slot:append>
              <!-- <q-icon
                :name="isPwd ? 'visibility' : 'visibility_off'"
                size="18px"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              /> -->
              <i :class="{'far fa-eye': isPwd, 'far fa-eye-slash': !isPwd}" @click="isPwd = !isPwd"></i>
            </template>
          </q-input>

        </div>

        <div class="links column">

          <router-link class="link" to="/recover">
            <span class="body-3">Esqueceu a senha?</span>
          </router-link>

          <q-btn
            flat
            class="btn"
            color="white"
            @click="submit()"
          >
            <span class="body-3 bold">entrar</span>
          </q-btn>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex';
import { email, required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  name: 'SignInPage',
  data() {
    return {
      email: '',
      password: '',
      isPwd: true,
      errorMessage: null,
    }
  },
  validations: {
    email: {
      required,
      email,
      maxLength: maxLength(30)
    },
    password: {
      minLength: minLength(8),
      maxLength: maxLength(20)
    },
  },
  computed: {
    emailErrorMessage () {
      if (!this.$v.email.required) {
        return 'Email é requerido'
      } else if (!this.$v.email.email) {
        return 'Por favor insira um email válido'
      }
    },
    passwordErrorMessage () {
      if (!this.$v.password.minLength) {
        return 'Mínimo de 8 dígitos'
      } else if (!this.$v.password.maxLength) {
        return 'Máximo de 15 dígitos'
      }
    },
  },
  methods: {
    submit() {
      if (!this.$v.$anyError) {
        this.$store.dispatch('users/retrieveToken', { credentials: {
          email: this.email,
          password: this.password,
        }}).then((response) => {
          console.log('SIGN_IN', response);
          if (response.data.isAdmin) {
            this.$router.push({ name: 'Dashboard' });
          } else {
            this.$router.push({ name: 'Profile' });
          }
        }).catch((error) => {
          if(error.message === 'Request failed with status code 400') {
            this.errorMessage = 'Não encontramos uma conta com esse email';
          }
          if (error.message === 'Request failed with status code 401') {
            this.errorMessage = 'Email ou senha inválidos';
          }
          if (error.message === 'timeout of 5000ms exceeded') {
            this.errorMessage = 'Houve um Problema, tente novamente';
          }
          console.log('signIn/submit', error.message);
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';
@import '../styles/variables.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Helvetica';
}

.app-page {
  background-color: white;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  padding: 32px;
  position: relative;
}

.identity {
  position: absolute;
  // width: 100%;
  top: 24px;
  left: 24px;
  animation: 0.5s fadeInOpacity ease-in;

  .logo {
    margin-top: 0px;
    align-self: flex-start;
  }

  @include for-phone-only {
    align-self: center;
    margin-left: 8px;
  }
}

.content {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 380px;
  align-items: flex-start;
  animation: 0.5s fadeInOpacity ease-in;

  @include for-phone-only {
    margin-top: 32px;
  }

  @include for-tablet-portrait-only {
    margin-top: 64px;
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

.card {
  width: 100%;
  padding: 0px;
  background-color: white;
  justify-content: center;
  align-items: flex-start;
  margin-top: 32px;
  // border: 2px solid green;

   @include for-phone-only {
    width: 80%;
  }

  @include for-tablet-portrait-only {
    width: 90%;
  }
}

.title {
  // align-self: center;
  margin-bottom: -4px;
  animation: 0.4s fadeInOpacity ease-in;

  @include for-tablet-portrait-only {
    font-size: 2.2rem;
    margin-bottom: 0px;
  }

  @include for-phone-only {
    font-size: 2rem;
    margin-bottom: 0px;
  }
}

.input-field {
  width: 350px;
  margin-top: 16px;

  @include for-phone-only {
    margin-top: 32px;
  }
}

.input {
  margin-bottom: 24px;
  width: inherit;
  font-size: 1.025rem;
  margin-bottom: 24px;
  font-weight: bold;
}

.error-field {
  margin-top: 16px;
  align-self: flex-start;
}

.error-message {
  color: #bb0000;
  animation: 0.3s fadeInOpacity ease-in;
}

.links {
  align-items: center;
  width: 100%;
  margin-top: 32px;
  // border: 1px solid red;
}

.link {
  font-family: 'Helvetica';
  font-weight: bold;
  text-decoration: none !important;
  text-transform: lowercase;
  color: black;

  &:hover {
    color: gray;
  }
}

.btn {
  box-shadow: none;
  align-self: center;
  width: 150px;
  height: 40px;
  border-radius: 0px;
  background-color: black;
  margin-top: 8px;
}

.btn:hover {
  transform: scale(1.05);
  transition: all 0.2s linear;
}

.btn span {
  // text-transform: lowercase;
  font-weight: bolder;
  font-size: .875rem;
}

</style>
