<template>
  <div class="app-page column">
    <div class="identity">
      <logo-card class="logo" />
    </div>

    <div class="content column">
      <div class="card column">
        <span class="title title-3 bolder"> Olá novamente </span>
        <router-link class="link" to="/signUp">
          <span class="body-3">Novo Usuário? Cadastre-se</span>
        </router-link>

        <div v-if="errorMessage !== null" class="error-field">
          <span class="error-message">* {{ errorMessage }}</span>
        </div>

        <div class="input-field">
          <q-input
            v-model="email"
            class="input"
            square
            filled
            color="black"
            type="email"
            label="Email"
            :error="$v.email.$error"
            :error-message="emailErrorMessage"
            lazy-rules
            @blur="$v.email.$touch"
          />

          <q-input
            v-model="password"
            class="input"
            square
            filled
            :type="isPwd ? 'password' : 'text'"
            label="Senha"
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
        </div>

        <div class="links column">
          <router-link class="link" to="/recover">
            <span class="body-3">Esqueceu a senha?</span>
          </router-link>

          <q-btn flat class="btn" color="white" @click="submit()">
            <span class="body-3 bold">entrar</span>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  email,
  required,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "SignInPage",
  data() {
    return {
      waiting: false,
      email: "",
      password: "",
      isPwd: false,
      errorMessage: null,
    };
  },
  validations: {
    email: {
      required,
      email,
      maxLength: maxLength(30),
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(20),
    },
  },
  computed: {
    emailErrorMessage() {
      if (!this.$v.email.required) {
        return "Preencha seu email";
      } else if (!this.$v.email.email) {
        return "Por favor insira um email válido";
      }

      return "";
    },
    passwordErrorMessage() {
      if (!this.$v.email.required) {
        return "Informe sua senha";
      } else if (!this.$v.password.minLength) {
        return "Mínimo de 8 dígitos";
      } else if (!this.$v.password.maxLength) {
        return "Máximo de 15 dígitos";
      }

      return "";
    },
  },
  methods: {
    async submit() {
      if (!this.$v.$anyError) {
        if (this.waiting) return;
        this.waiting = true;
        await this.$store
          .dispatch("users/retrieveToken", {
            credentials: {
              email: this.email,
              password: this.password,
            },
          })
          .then((response) => {
            if (response.data.user.confirmToken !== null) {
              this.$q.notify({
                message: "É necessário confirmar o email",
                color: "Black",
              });
            } else {
              this.$router.push({ name: "Profile" });
            }
            this.waiting = false;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 400") {
              this.$q.notify({
                message: "Não encontramos uma conta com esse email",
                color: "Black",
              });
            }
            if (error.message === "Request failed with status code 401") {
              this.$q.notify({
                message: "Email ou senha inválidos",
                color: "Black",
              });
            }
            if (error.message === "timeout of 5000ms exceeded") {
              this.$q.notify({
                message: "Houve um Problema, tente novamente",
                color: "Black",
              });
            }
            console.log("signIn/submit", error.message);
            this.waiting = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";
@import "../styles/variables.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  font-size: 0.875rem;
}
</style>
