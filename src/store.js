import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    form : {
      title: "",
      code: "",
      description: "",
      points: "",
      level: "",
 }
  },
  data() {
    return {
         course: {},
    }
},
  getters: {},
  mutations: {
    SET_LOGGED_IN_STATUS(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    SET_FORM(state, title,code,description,points,level) {
      state.form.title = title;
      state.form.code = code;
      state.form.description = description;
      state.form.points = points;
      state.form.level = level;
    },
  },
  actions: {
    login(context, credentials) {
      axios
        .post(`https://college-api-mo.herokuapp.com/api/login`, {
          email: credentials.email,
          password: credentials.password,
        })
        .then((response) => {
          context.commit("SET_LOGGED_IN_STATUS", true);
          localStorage.setItem("token", response.data.token);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.message);
        });
    },
    logout(context) {
      localStorage.removeItem("token");
      context.commit("SET_LOGGED_IN_STATUS", false);
    },
    getCourse(context, courseId) {
      let token = localStorage.getItem('token')
        axios
        .get(`https://college-api-mo.herokuapp.com/api/courses/${courseId}`,
        {
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(response => {
            console.log(response)
            this.course = response.data.data
            context.commit("SET_FORM", this.course.title, this.course.code, this.course.description,
            this.reponse.data.data.points, this.reponse.data.data.level
            );
        })
        .catch(error => {
          console.log(error)
          })
    },
  },
});
