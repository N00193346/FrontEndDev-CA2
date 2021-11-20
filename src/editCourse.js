import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex({
  state: {
 form : {
      title: "",
      code: "",
      description: "",
      points: "",
      level: "",
 }
  },
  getters: {},
  mutations: {
    SET_FORM(state, title,code,description,points,level) {
      state.form.title = title;
      state.form.code = code;
      state.form.description = description;
      state.form.points = points;
      state.form.level = level;
    },
  },
  actions: {
    getCourse(context, courseId) {
      let token = localStorage.getItem('token')
        axios
        .get(`https://college-api-mo.herokuapp.com/api/courses/${courseId}`,
        {
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(response => {
            console.log(response)
            context.commit("SET_FORM", this.reponse.title, this.reponse.code, this.reponse.description,
            this.reponse.points, this.reponse.level
            );
        })
        .catch(error => {
          console.log(error)
          })
    },
    // login(context, credentials) {
    //   axios
    //     .post(`https://college-api-mo.herokuapp.com/api/login`, {
    //       email: credentials.email,
    //       password: credentials.password,
    //     })
    //     .then((response) => {
    //       context.commit("SET_LOGGED_IN_STATUS", true);
    //       localStorage.setItem("token", response.data.token);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       console.log(error.response.data.message);
    //     });
    // },
    // logout(context) {
    //   localStorage.removeItem("token");
    //   context.commit("SET_LOGGED_IN_STATUS", false);
    // },
  },
});
