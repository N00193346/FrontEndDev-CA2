<template>
  <v-container class="my-5">
    <v-card>
      <v-card-title class="mb-1">
        <h1>Register</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="formR">
          <v-text-field
            label="Name"
            v-model="form.name"
            prepend-icon="mdi-account"
            :rules="inputRules"
          ></v-text-field>
          <div class="errorText">{{ errors.name }}</div>

          <v-text-field
            type="Email"
            label="Email"
            v-model="form.email"
            prepend-icon="mdi-email"
            :rules="inputRules"
          ></v-text-field>
          <div class="errorText">{{ errors.email }}</div>

          <v-text-field
            type="Password"
            label="Password"
            v-model="form.password"
            prepend-icon="mdi-lock"
            :rules="inputRules"
          ></v-text-field>
          <div class="errorText">{{ errors.password }}</div>

          <v-btn flat class="secondary mt-3" @click="registerUser()"
            >Create
          </v-btn>
          <v-btn flat class="accent ml-3 mt-3" @click="clear()">Clear</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      errors: {},
      token: "",
      inputRules: [(v) => v.length > 0 || "Cannot be empty"],
    };
  },
  computed: {
    ...mapState(["loggedIn"]),
  },

  methods: {
    ...mapActions(["registerLogin"]),
    clear() {
      this.$refs.formR.resetValidation(),
        (this.form.name = ""),
        (this.form.email = ""),
        (this.form.password = "");
    },
    registerUser() {
      if (this.$refs.formR.validate()) {
        axios
          .post(`https://college-api-mo.herokuapp.com/api/register`, {
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
          })
          .then((response) => {
            console.log(response.data);
            this.registerLogin(response);
            this.$router.push({ name: "home" });
            this.displayRegisterSB();
          })
          .catch((error) => {
            console.log(error);
            this.errors = error.response.data;
          });
      }
    },
    displayRegisterSB() {
      this.$store.dispatch("displaySnackBar", {
        show: true,
        color: "secondary",
        message: "You are now registered and signed in",
        timeout: "4000",
      });
    },
  },
};
</script>
<style scoped>
.errorText {
  color: red;
}
</style>
