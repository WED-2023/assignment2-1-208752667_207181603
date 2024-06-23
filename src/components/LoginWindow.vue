<template>
    <div class="container">
      <b-form @submit.prevent="onLogin">
        <b-form-group
          id="input-group-Username"
          label-cols-sm="3"
          label="Username:"
          label-for="Username"
        >
          <b-form-input
            id="Username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Invalid username
          </b-form-invalid-feedback>
        </b-form-group>
  
        <b-form-group
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="Password"
        >
          <b-form-input
            id="Password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Invalid password
          </b-form-invalid-feedback>
        </b-form-group>
  
        <b-button
          type="submit"
          variant="primary"
          style="width:100px;display:block; margin-top: 15px;"
          class="mx-auto w-100"
          >Login</b-button
        >
        <div class="mt-2">
          Do not have an account yet?
          <router-link to="register"> Register in here</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Login failed: {{ form.submitError }}
      </b-alert>
      <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card> -->
    </div>
  </template>
  
<script>
import {mockLogin} from "../services/auth.js"
import {required, minLength, maxLength, alpha, helpers} from "vuelidate/lib/validators";
const specialCharacterValidator = helpers.regex('specialCharacterValidator', /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/);
const digitCharacterValidator = helpers.regex('digitCharacterValidator', /^(?=.*\d)/);
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      password: {
        required,
        specialCharacterValidator,
        digitCharacterValidator,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      let success;
      try {
        // const response = await this.axios.post(
        //   this.$root.store.server_domain +"/Login",  
        //   {
        //     username: this.form.username,
        //     password: this.form.password
        //   }
        // );
        const expectedSuccess = true; // modify this to test the error handling
        let credentials = {
          username: this.form.username,
          password: this.form.password
        };
        const response = mockLogin(credentials, expectedSuccess);
        success = response.response.data.success;
        if (success) {
          this.$root.store.login(this.form.username);
        }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      };
      let message = success ? "Welcome " + this.form.username : "Login failed";
      this.$root.toast("Logging " + this.form.username, message, success);
    },

    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.Login();
    }
  }
};
</script>
  <style lang="scss" scoped>
  .container {
    max-width: 400px;
  }
  </style>