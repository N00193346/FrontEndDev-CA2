import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    snackbarLecturer: false,
    snackbarCourse: false,
    snackbarEnrolment: false,
    course: {
      title: "",
      code: "",
      description: "",
      points: "",
      level: "",
    },
    

  },
  getters: {},
  mutations: {
    SET_LOGGED_IN_STATUS(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    // SET_COURSE(state, title, code, description, points, level) {
    //   state.course.title = title;
    //   state.course.code = code;
    //   state.course.description = description;
    //   state.course.points = points;
    //   state.course.level = level;
    // },
    SET_SNACKBAR_LECTURER_STATUS(state, snackbarLecturer){
      state.snackbarLecturer = snackbarLecturer
    },
    SET_SNACKBAR_COURSE_STATUS(state, snackbarCourse){
      state.snackbarCourse = snackbarCourse
    },
    SET_SNACKBAR_ENROLMENT_STATUS(state, snackbarEnrolment){
      state.snackbarEnrolment = snackbarEnrolment
    }
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
    displayLecturerSnackBar(context){
      context.commit("SET_SNACKBAR_LECTURER_STATUS", true);
    },
    removeLecturerSnackBar(context){
      context.commit("SET_SNACKBAR_LECTURER_STATUS", false);
    },
    displayCourseSnackBar(context){
      context.commit("SET_SNACKBAR_COURSE_STATUS", true);
    },
    removeCourseSnackBar(context){
      context.commit("SET_SNACKBAR_COURSE_STATUS", false);
    },
    displayEnrolmentSnackBar(context){
      context.commit("SET_SNACKBAR_ENROLMENT_STATUS", true);
    },
    removeEnrolmentSnackBar(context){
      context.commit("SET_SNACKBAR_ENROLMENT_STATUS", false);
    }
  },
});