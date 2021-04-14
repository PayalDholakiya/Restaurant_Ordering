<template>
  <div>
    <Header />
    <div v-if="data" class="m-10 font-mono text-2xl">
      <div
        class="items-center justify-between gap-5 m-5 bg-white shadow-xl lg:flex hover:shadow-2xl"
        v-for="(order, index) in totalItems"
      >
        <img class="w-20 h-16 m-2 " src="../assets/7.jpg" />
        <div>
          <p>{{ order.name }}</p>
        </div>
        <div class="flex justify-between">
          <p class="pr-10">${{ order.Price }}</p>
          <svg
            @click="remove(index)"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 mt-1 mr-2 cursor-pointer "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>
      <div class="flex flex-row-reverse pr-14 ">Total: ${{ Price }}</div>
      <div>
        <button
          @click="orderconfirm"
          class="p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          OrderNow
        </button>
      </div>
    </div>
    <div v-if="show" class="m-20 font-mono text-xl">
      <form class="inline-block border-2 p-11">
        <div class="mb-6 md:flex md:items-center">
          <div class="md:w-1/3">
            <label
              class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
            >
              Full Name:
            </label>
          </div>
          <div>
            <input
              v-model="user.name"
              class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              :class="{ 'is-invalid': submitted && $v.user.name.$error }"
            />
            <div
              v-if="submitted && $v.user.name.$error"
              class="invalid-feedback"
            >
              <span class="text-red-500" v-if="!$v.user.name.required">
                Name is required</span
              >
            </div>
          </div>
        </div>
        <div class="mb-6 md:flex md:items-center">
          <div class="md:w-1/3">
            <label
              class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
            >
              Address :
            </label>
          </div>
          <div>
            <input
              v-model="user.address"
              :class="{ 'is-invalid': submitted && $v.user.address.$error }"
              class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
            />
            <div
              v-if="submitted && $v.user.address.$error"
              class="invalid-feedback"
            >
              <span class="text-red-500" v-if="!$v.user.address.required">
                Address is required</span
              >
            </div>
          </div>
        </div>
        <div class="mb-6 md:flex md:items-center">
          <div class="md:w-1/3">
            <label
              class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
            >
              Phone :
            </label>
          </div>
          <div>
            <input
              v-model="user.phone"
              class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              :class="{ 'is-invalid': submitted && $v.user.phone.$error }"
            />
            <div
              v-if="submitted && $v.user.phone.$error"
              class="invalid-feedback"
            >
              <span class="text-red-500" v-if="!$v.user.phone.required">
                Phone number is required</span
              >
              <span class="text-red-500" v-if="!$v.user.phone.integer"
                >Only accept integer value</span
              >
            </div>
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button
              @click="Submit"
              class="px-4 py-2 font-bold text-white bg-purple-500 rounded shadow hover:bg-purple-400 focus:shadow-outline focus:outline-none"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
import { mapActions, mapGetters } from 'vuex'
import Header from '../components/Header'
import Order from '../views/Order'
import { required, integer } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      data: true,
      show: false,
      order: false,
      hide: false,
      orderData: null,
      user: {
        name: '',
        address: '',
        phone: '',
      },
      submitted: false,
    }
  },
  validations() {
    return {
      user: {
        name: { required },
        address: { required },
        phone: {
          required,
          integer,
        },
      },
    }
  },

  components: {
    Header,
    Order,
  },
  computed: {
    ...mapGetters({
      totalItems: 'totalItems',
      Price: 'totalPrice',
    }),
  },
  methods: {
    ...mapActions(['addUser']),

    orderconfirm() {
      let currentUser = firebase.auth().currentUser
      if (currentUser == null) {
        this.$router.push('/sign-in')
      } else {
        console.log(currentUser)
        this.show = true
        this.data = false
      }
    },
    Submit() {
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.order = true
      this.show = false

      var user = {
        ...this.user,
        order: {
          items: this.totalItems.length,
          total: this.Price,
          item: [
            {
              item: this.totalItems,
            },
          ],
        },
      }

      firebase
        .database()
        .ref('users')
        .push(user)
        .then((data) => {
          console.log(user)
        })
      this.$router.push('/')
      this.$toastr.Add({
        msg: 'Your Order Placed successfully.',
        timeout: 2000,
        classNames: ['animated', 'zoomInUp', 'injectedStyle'],
        style: {
          backgroundColor: 'Green',
        },
      })
      // var counter = localStorage.getItem('counter')
      // counter++
      // localStorage.setItem('orderdata:' + counter, JSON.stringify(user))
      // this.orderData = JSON.parse(localStorage.getItem('orderdata:' + counter))
      // localStorage.setItem('counter', counter)
      // const orders = []
      // const obj = data.val()
      // orders.push(this.user)
      // console.log(orders)
    },
    remove(index) {
      this.$swal({
        text: 'Are you sure?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Delete it!',
      }).then((order) => {
        if (order.isConfirmed) {
          this.totalItems.splice(index, 1)

          this.$toastr('Item deleted successfully.')
          this.$toastr.defaultTimeout = 400
        }
      })
    },
  },
}
</script>
