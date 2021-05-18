<template>
  <div class="content-center">
    <logo-card class="logo-size" />
    <div class="card">
      <h2 class="title">
        É novo por aqui?
      </h2>
      <router-link
        class="btn signup"
        to="/signUp"
      >
        cadastre-se!
      </router-link>
      <div class="or">
        <hr>
        <span>ou</span>
      </div>
      <div
        v-if="errorMessage !== null"
        class="error-field"
      >
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
          :type="isPwd ? 'text' : 'password'"
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
        <router-link
          class="link"
          to="/recover"
        >
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
</template>

<script>
import {
  email,
  required,
  minLength,
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
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  computed: {
    emailErrorMessage() {
      if (!this.$v.email.required) {
        return "Preencha um email";
      } else if (!this.$v.email.email) {
        return "Por favor insira um email válido";
      }
      return "Oops algo errado aconteceu!";
    },
    passwordErrorMessage() {
      if (!this.$v.email.required) {
        return "Informe sua senha";
      }
      if (!this.$v.password.minLength) {
        return "Mínimo de 8 dígitos";
      }
      return "Oops algo errado aconteceu!";
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        if (this.waiting) {
          this.$q.notify({
            message: "Por favor, aguarde.",
            position: 'top-right',
          });
          return;
        }
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
                position: 'top-right',
              });
            } else {
              this.$router.push({ name: "Profile" });
            }
            this.email = "";
            this.password = "";
            this.waiting = false;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 400") {
              this.$q.notify({
                message: "Não encontramos uma conta com esse email",
                color: "Black",
                position: 'top-right',
              });
            }
            if (error.message === "Request failed with status code 401") {
              this.$q.notify({
                message: "Email ou senha inválidos",
                color: "Black",
                position: 'top-right',
              });
            }
            if (error.message === "timeout of 5000ms exceeded") {
              this.$q.notify({
                message: "Houve um Problema, tente novamente",
                color: "Black",
                position: 'top-right',
              });
            }
            this.waiting = false;
          });
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
@import '../styles/variables.scss';

.logo-size {
  @include for-phone-only {
    height: 120px;
    width: 120px;
  }
}

.content-center {
  @include centered-column;
  background-color: white;
  flex-direction: column;
  max-width: inherit;

  @include for-tablet-landscape-up {
    margin-top: 0;
  }
}

.card {
  align-self: center;
  background-color: white;
  max-width: 360px;
  padding: 0px;
  width: 100%;

  @include for-big-desktop-up {
    margin-top: 32px;
  }
}

.title {
  font-size: 2rem;
  margin: 16px 0 0;
}

.input {
  margin-bottom: 16px;
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
  margin-top: 16px;
}

.link {
  font-weight: bold;
  text-decoration: none !important;
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

  &.signup {
    color: white;
    display: block;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    margin-bottom: 32px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    width: 100%;
  }
}

.or {

  hr {
    border: 0;
    border-top: 1px solid #333;
    display: block;
  }

  span {
    background-color: white;
    display: block;
    font-style: italic;
    margin: 0 auto;
    position: relative;
    top: -18px;
    text-align: center;
    width: 50px;
  }
}

.btn:hover {
  transform: scale(1.05);
  transition: all 0.2s linear;
}

.btn span {
  font-weight: bolder;
  font-size: 0.875rem;
}
</style>
