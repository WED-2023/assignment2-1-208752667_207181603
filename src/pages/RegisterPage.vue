<template>
  
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset" inline>
      <b-form-group id="input-group-username" label="Username:" label-for="username">
        <b-form-input id="username" v-model="$v.form.username.$model" type="text" :state="validateState('username')" autocomplete="''"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username should consist only alphabetic characters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-firstName" label-cols-sm="" label="First Name:" label-for="firstName">
        <b-form-input id="firstName" type="text" v-model="$v.form.firstName.$model" :state="validateState('firstName')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.firstName.alpha">
          First name should consist only alphabetic characters
        </b-form-invalid-feedback>
      </b-form-group>
      
      <b-form-group
        id="input-group-lastName" label-cols-sm="" label="Last Name:" label-for="lastName">
        <b-form-input id="lastName" type="text" v-model="$v.form.lastName.$model" :state="validateState('lastName')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.lastName.alpha">
          Last name should consist only alphabetic characters
        </b-form-invalid-feedback>
      </b-form-group>
      
      <b-form-group id="input-group-country" label-cols-sm="3" label="Country:" label-for="country">
        <b-form-select id="country" v-model="$v.form.country.$model" :options="countries" :state="validateState('country')" autocomplete="''"></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-Password" label-cols-sm="3" label="Password:" label-for="password">
        <b-form-input id="password" type="password" v-model="$v.form.password.$model" :state="validateState('password')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="warning">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.length">
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.digitCharacterValidator">
          Have atleast one digit
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.specialCharacterValidator">
          Have atleast one special character
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword" label-cols-sm label="Confirm Password:" label-for="confirmedPassword">
        <b-form-input id="confirmedPassword" type="password" v-model="$v.form.confirmedPassword.$model" :state="validateState('confirmedPassword')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.confirmedPassword.sameAsPassword">
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-email" label-cols label="Email address:" label-for="email">
        <b-form-input id="email" type="email" v-model="$v.form.email.$model" :state="validateState('email')" autocomplete="''"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Last Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.email.email">
          Invalid email address
        </b-form-invalid-feedback>
      </b-form-group>
      <br>
      <div class="buttons">
        <b-button type="reset" variant="outline-primary">Reset</b-button>
        <b-button
          type="submit"
          variant="primary"
          style="width:250px;"
          class="ml-5 w-75"
          >Register</b-button
        >
      </div>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  helpers,
  email
} from "vuelidate/lib/validators";

const specialCharacterValidator = helpers.regex('specialCharacterValidator', /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/);
const digitCharacterValidator = helpers.regex('digitCharacterValidator', /^(?=.*\d)/);

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: {
        required,
        alpha
      },
      lastName: {
        required,
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        specialCharacterValidator,
        digitCharacterValidator,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      let success;
      let title = "Registration Failed";
      let message;
      try {

        const response = await this.axios.post(
          this.$root.store.server_domain + "/Register",
          {
          username: this.form.username,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          country: this.form.country,
          password: this.form.password,
          email: this.form.email
        }
        );
        success = response.data.success;
        message = response.data.message;
        if (success) {
          this.$root.store.login(this.form.username);
          title = "Welcome " + this.form.username;
        }
        } catch (err) {
          message = err.response.data.message;
          success = false;  
      };
        this.$root.toast(title, message, success);
        return success;
    },

    async onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      if(await this.Register()){
        this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
      }
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 650px;
}
.buttons {
  align-items: center;
}
</style>
