import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: [],
    items: [
      {
        id: 1,
        name: 'vanilla-slice',
        image: require('../assets/7.jpg'),
        price: 200,
        done: false,
      },
      {
        id: 2,
        name: 'choco cup-cake',
        image: require('../assets/3.jpg'),
        price: 200,
        done: false,
      },
      {
        id: 3,
        name: 'lemon Raspberry',
        image: require('../assets/9.jpg'),
        price: 200,
        done: false,
      },
      {
        id: 4,
        name: 'lemon Raspberry',
        image: require('../assets/4.jpg'),
        price: 500,
        done: false,
      },
      {
        id: 5,
        name: 'multisplice',
        image: require('../assets/5.jpg'),
        price: 200,
        done: false,
      },
      {
        id: 6,
        name: 'Bubbly Champagne Cupcakes',
        image: require('../assets/10.jpg'),
        price: 200,
        done: false,
      },
      {
        id: 7,
        name: 'Caramel Apple',
        image: require('../assets/7.jpg'),
        price: 200,
        done: false,
      },
      {
        id: 8,
        name: 'Coconut Snowball',
        image: require('../assets/8.jpg'),
        price: 200,
        done: false,
      },
      {
        id: 9,
        name: 'blueberry',
        image: require('../assets/j.jpeg'),
        price: 200,
        done: false,
      },
    ],
    user: null,
  },
  getters: {
    items: (state) => {
      return state.items
    },
    totalItems: (state) => {
      return state.total
    },
    totalPrice: (state) => {
      var sum = 0
      state.total.filter((e) => {
        if (e.Price) {
          sum += e.Price
          console.log(sum)
        }
      })
      return sum
    },
    getUser: (state) => {
      return state.user
    },
  },
  mutations: {
    add(state, ItemId) {
      const x = state.items.find((item) => {
        return item.id == ItemId
      })
      x.done = true
      const add = {
        id: ItemId,
        name: x.name,
        Price: x.price,
        Image: x.image,
      }
      state.total.push(add)
      this.$toastr('Item added in cart.')
      this.$toastr.defaultTimeout = 2000
    },
    addUser(state, data) {
      state.user = data
    },
  },
  actions: {
    add({ commit }, ItemId) {
      setTimeout(() => {
        commit('add', ItemId)
      })
    },
    addUser({ commit }, data) {
      commit('addUser', data)
    },
  },
  modules: {},
})
