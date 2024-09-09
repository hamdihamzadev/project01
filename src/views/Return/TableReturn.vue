<template>
  <div>
    <TableGlobal :orders="orders" :status="status" :fields="fields" />
  </div>
</template>

<script>
  import TableGlobal from '@/components/TableGlobal.vue'
  import {
    mapState,
    mapActions
  } from 'vuex';
  export default {
    name: 'TableReturn',
    props: ['date'],
    components: {
      TableGlobal
    },

    data() {
      return {
        status: [{
            value: 'Confirmed',
            text: 'Confirmed'
          },
          {
            value: 'Delivered',
            text: 'Delivered'
          },
          {
            value: 'Shipped',
            text: 'Shipped'
          },
          {
            value: 'Canceled',
            text: 'Canceled'
          },
          {
            value: 'New',
            text: 'New'
          },
          {
            value: 'Progress',
            text: 'Progress'
          },
          {
            value: 'Not treat',
            text: 'Not treat'
          },
          {
            value: 'Postponed',
            text: 'Postponed'
          },
        ],
        fields: [{
            key: 'Customer',
            sortable: false
          },
          {
            key: 'Phone',
            sortable: false
          },

          {
            key: 'City',
            sortable: false
          },
          {
            key: 'Adress',
            sortable: false
          },
          {
            key: 'Product',
            sortable: false
          },
          {
            key: 'Price',
            sortable: false
          },
          {
            key: 'Quantity',
            sortable: false
          },
          {
            key: 'Total',
            sortable: false
          },
          {
            key: 'Date',
            sortable: false
          },
          {
            key: 'Action',
            sortable: false
          }
        ],
        ordersReturn: ''
      }
    },


    computed: {
      // STORE ALL ORDERS
      ...mapState('allOrders', {
        allOrders: state => state.orders
      }),


      recentDate() {
        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        let year = new Date().getFullYear()

        return {
          month,
          day,
          year
        }
      },

      // ORDERS RETURN
      OrdersReturn() {
        let orders = this.allOrders
          .filter(ele => ele.statussuivi === 'Return')
          .map(ele => {
            const objOrder = new Object
            objOrder.Customer = ele.customer.name
            objOrder.Phone = `0${ele.customer.phone}`
            objOrder.City = ele.customer.city
            objOrder.Adress = ele.customer.adresse
            objOrder.productId = ele.product._id
            objOrder.Product = ele.product.name
            objOrder.Price = ele.product.price
            objOrder.Quantity = ele.quantity
            objOrder.Total = ele.total
            objOrder.Date = ele.date
            objOrder.Status = ele.statustable
            objOrder.id = ele._id
            return objOrder
          })
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
          })
        return orders
      },

      // FILTER BY DATE
      filterByMonth() {
        let orders = ''
        if (this.date) {
          orders = this.OrdersReturn.filter(ele => {
            return parseInt(ele.Date.split('-')[1], 10) === this.date.dateSelected
          })
        }
        return orders
      },

      filterByDay() {
        let orders = ''
        if (this.date) {
          orders = this.OrdersReturn.filter(ele => {
            return parseInt(ele.Date.split('-')[1], 10) === parseInt(this.date.dateSelected.split('-')[1], 10) && // month
                   parseInt(ele.Date.substring(7, 9), 10) === parseInt(this.date.dateSelected.split('-')[2], 10) // day
          })
        }
        return orders
      },

      filterByYear() {
        let orders = []
        if (this.date) {
          orders = this.OrdersReturn.filter(ele => {
            return parseInt(ele.Date.split('-')[0], 10) === this.date.dateSelected
          })
        }
        return orders
      },

      filterByToday() {
        let orders = ''
        if (!this.date) {
          orders = this.OrdersReturn
            .filter(ele => {
              return parseInt(ele.Date.split('-')[0], 10) === this.recentDate.year &&
                parseInt(ele.Date.split('-')[1], 10) === this.recentDate.month &&
                parseInt(ele.Date.substring(7, 9), 10) === this.recentDate.day
            })
        } else {
          orders = 'hamza'
        }
        return orders
      },

      //  send orders shipped 
      orders() {
        let orders = []
        if (this.date.type === 'Month') {
          orders = this.filterByMonth
        } else if (this.date.type === 'Day') {
          orders = this.filterByDay
        } else if (this.date.type === 'Year') {
          orders = this.filterByYear
        } else if (!this.date) {
          orders = this.filterByToday
        }
        return orders 

      }
    },



    methods: {
      ...mapActions('allOrders', {
        fetchOrders: 'ac_getOrders'
      })

    },

    mounted() {
      this.fetchOrders()
    }


  }
</script>