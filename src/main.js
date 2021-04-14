import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toastr from 'vue-toastr'
import swal from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import Vuelidate from 'vuelidate'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(toastr)
Vue.use(swal)

const config = {
  apiKey: 'AIzaSyCFXDjbJoffsT8kN3-zsB8OZpOYEaJII7Q',
  authDomain: 'restaurant-web-75e08.firebaseapp.com',
  projectId: 'restaurant-web-75e08',
  storageBucket: 'restaurant-web-75e08.appspot.com',
  messagingSenderId: '836795250404',
  appId: '1:836795250404:web:18bfd0bde34cb331bddef1',
  measurementId: 'G-4H1Q95GNSK',
}

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })
export default firestore

new Vue({
  router,
  store,
  render: function(h) {
    return h(App)
  },
}).$mount('#app')
