<template>
  <div
    class="flex items-center justify-around h-20 font-mono text-3xl font-semibold bg-pink-300 shadow-xl"
  >
    <div class="flex justify-around ">
      <img class="w-10 h-10 mr-10" src="../assets/logo.jpg" />
      <ul class="flex flex-row justify-center gap-10 list-none cursor-pointer">
        <li
          class="px-4 rounded-lg hover:bg-white hover:shadow-lg hover:border-transparent"
        >
          <router-link to="/"> Home</router-link>
        </li>
      </ul>
    </div>

    <div class="flex">
      <div class="relative">
        <button
          class="px-4 font-semibold rounded-lg hover:bg-white hover:shadow-lg hover:border-transparent"
        >
          <router-link to="/cart"> Cart</router-link>
        </button>
        <span class="absolute w-6 h-6 text-base bg-white rounded-full">{{
          totalItems.length
        }}</span>
      </div>
      <button
        class="px-4 ml-8 font-semibold rounded-lg hover:bg-white hover:shadow-lg hover:border-transparent"
      >
        <router-link to="/order"> orders</router-link>
      </button>
      <button class="w-24 h-10 text-xl text-white bg-green-500 rounded-full">
        <router-link to="/sign-in"> Sign In</router-link>
      </button>
      <button
        class="w-24 h-10 ml-2 text-xl text-white bg-blue-500 rounded-full"
        @click="logout"
      >
        Sign Out</button>
      </button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters(['totalItems']),
  },
  data() {
    return {
      currentUser: firebase.auth().currentUser,
    }
  },
  methods: {
    logout() {
      if (this.currentUser) {
        firebase.auth().signOut()
        alert('logout successfully.')
        this.$router.push('/')
      }
    },
  },
}
</script>
