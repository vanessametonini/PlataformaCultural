<template>
  <div class="app-page column">
    <div class="identity">
      <logo-card class="logo" />
    </div>

    <div class="content column">
      <div class="card column">
        <span class="title title-3 bolder"> Digite seu email </span>

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
        </div>

        <div class="links column">
          <q-btn
            flat
            class="btn"
            color="white"
            @click="submit()"
          >
            <span class="body-3 bold">Recuperar</span>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "users/getField",
  mutationType: "users/updateField",
});
import { email, required } from "vuelidate/lib/validators";

export default {
  name: "RecoverPage",
  data() {
    return {
      waiting: false,
      errorMessage: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  computed: {
    ...mapFields({
      email: "emailRecover",
    }),
    emailErrorMessage() {
      if (!this.$v.email.required) {
        return "Preencha seu email";
      } else if (!this.$v.email.email) {
        return "Por favor insira um email válido";
      }
      return "";
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
        this.$store
          .dispatch("users/sendEmailRecover")
          .then(() => {
            this.email = '';
            this.waiting = false;
          })
          .catch(() => {
            this.waiting = false;
          });
      } else {
        this.$q.notify({
          message: "Por favor, preencha o campo corretamente.",
          position: 'top-right',
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
