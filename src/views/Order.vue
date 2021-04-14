<template>
  <div>
    <Header />
    <div
      class="p-5 mx-10 mt-5 text-left bg-white"
      v-for="(data, index) in orderData"
    >
      <div class="flex justify-between">
        <h1 class="font-bold ">Order Details : {{ index + 1 }}</h1>
        <svg
          @click="deleteData(index)"
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
      <p>Name : {{ orderData[index].name }}</p>
      <p>Address : {{ orderData[index].address }}</p>
      <p>Items : {{ orderData[index].items }}</p>
      <p>Total amount : ${{ orderData[index].amount }}</p>
    </div>
  </div>
</template>
<script>
import Header from '../components/Header'
import firebase from 'firebase'
export default {
  name: 'Order',
  components: {
    Header,
  },

  data() {
    return {
      orderData: [],
    }
  },
  methods: {
    add() {
      firebase
        .database()
        .ref('users')
        .once('value')
        .then((data) => {
          const obj = data.val()
          for (let key in obj) {
            this.orderData.push({
              id: key,
              name: obj[key].name,
              address: obj[key].address,
              phone: obj[key].phone,
              items: obj[key].order.items,
              amount: obj[key].order.total,
            })
          }
          console.log(this.orderData, 'data')
        })

      // var counter = localStorage.getItem('counter')
      // for (let i = 1; i <= counter; i++) {
      //   this.orderData.push(JSON.parse(localStorage.getItem('orderdata:' + i)))
      // }
    },
    deleteData(index) {
      this.$swal({
        text: 'Are you sure?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Delete it!',
      }).then((data) => {
        if (data.isConfirmed) {
          this.orderData.splice(index, 1)
          this.$toastr('Orderdata deleted.')
        }
      })
    },
  },
  created() {
    this.add()
  },
}
</script>
