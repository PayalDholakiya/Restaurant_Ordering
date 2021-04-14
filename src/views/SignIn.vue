<template>
  <div>
    <Header />
    <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-2/5 space-y-8 border-2 p-11 ">
        <div>
          <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Sign in
          </h2>
          <p class="mt-2 text-sm text-center text-gray-600"></p>
        </div>
        <form @submit.prevent="Login" class="mt-8 space-y-6" method="POST">
          <div class="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                v-model="email"
                autocomplete="email"
                required
                class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                name="password"
                type="password"
                v-model="password"
                autocomplete="current-password"
                required
                class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label for="remember_me" class="block ml-2 text-sm text-gray-900">
                Remember me
              </label>
              <label for="remember_me" class="block ml-2 text-sm text-gray-900">
                forgot password??
              </label>
            </div>
            <div class="text-sm"></div>
          </div>
          <div>
            <button
              type="submit"
              class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 pl-3">
                <svg
                  class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
        <span
          >Need an Account?Click here to<router-link to="/sign-up">
            <div>
              <router-link to="/sign-up"
                ><span class="underline">Create New</span></router-link
              >
            </div></router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Header from '../components/Header'
export default {
  name: 'login',
  components: {
    Header,
  },

  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async Login() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
        alert('Login successfully.')
        this.$router.push('/cart')
      } catch {
        alert('Invalid email or password.')
      }
      this.email = ''
      this.password = ''
    },
  },
}
</script>
<style></style>
