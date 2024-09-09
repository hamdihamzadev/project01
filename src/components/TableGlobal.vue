<template>
  <b-container class="bv-example-row" id="table-global" fluid>

    <!---------- TITLE AND SEARCH --------------->

    <b-row class="mb-5 d-flex justify-content-between ">
      <!----- TITLE ----->
      <b-col cols="6" md="4">
        <h1 class="title">Orders</h1>
      </b-col>
      <b-col cols="6" md="4"  >
        <!----- SEARCH INPUT ----->
        <b-form-input  id="filter-input" type="search" placeholder="Search product or ..." @input="searchprd">
        </b-form-input>
      </b-col>
    </b-row>

    <!---------- TABLE --------------->
    <b-table responsive  striped hover :items="orders" :fields="fields" sort-icon-left :per-page="perPage"
      :current-page="currentPage" class="mt-2" id="my-table">
      <template #cell(Status)="data">
        <b-form-select v-model="data.item.Status" :options="status" @change="changeStatus(data.item.id,$event)">
        </b-form-select>
      </template>
      <template #cell(Action)="data">
        <select class="form-select" aria-label="Select an action" @change="handleActionChange($event,data.item)">
          <option selected>Choose...</option>
          <option value="send">Send</option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
      </template>
    </b-table>

    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="my-table">
    </b-pagination>

    <!----------  POPUP EDIT ORDER --------------->
    <b-modal id="modalorder" ref="modalOrder" title="Edit your order">
      <b-row>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Customer:" label-for="input-1">
            <b-form-input v-model="customerEdit.Customer" id="input-1" type="text" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Phone:" label-for="input-1">
            <b-form-input v-model="customerEdit.Phone" id="input-1" type="number" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="City:" label-for="input-1">
            <b-form-input v-model="customerEdit.City" id="input-1" type="text" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Adress:" label-for="input-1">
            <b-form-input v-model="customerEdit.Adress" id="input-1" type="text" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Product:" label-for="input-1">
            <b-form-input v-model="customerEdit.Product" id="input-1" type="text" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Price:" label-for="input-1">
            <b-form-input v-model="customerEdit.Price" id="input-1" type="number" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Quantity:" label-for="input-1">
            <b-form-input v-model="customerEdit.Quantity" id="input-1" type="number" placeholder="Enter name product">
            </b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Total:" label-for="input-1">
            <b-form-input v-model="Total" id="input-1" type="number" placeholder="Enter name product" :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="12">
          <b-form-group class="mb-4" id="input-name" label="Status:" label-for="input-1">
            <b-form-input v-model="customerEdit.Status" id="input-1" type="text" :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <template #modal-footer>
        <b-button variant="secondary" @click="hideModal">Cancel</b-button>
        <b-button variant="primary" @click="editOrder()">Edit</b-button>
      </template>

    </b-modal>

  </b-container>
</template>

<script>
  import axios from 'axios'
  import {
    mapState,
    mapActions
  } from 'vuex';
  export default {
    name: "TableGlobal",
    props: ['orders', 'fields', 'status', ],
    data() {
      return {
        customerEdit: '',
        orderUpdateApi: '',
        stockProduct: '',
        OrderDelete: '',
        statusSuivi: '',
        allstatus: '',
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
      }
    },



    computed: {

      ...mapState('allProducts', {
        allProducts: state => state.Products.map(ele => {
          const obj = new Object
          obj.id = ele._id
          obj.quantity = ele.quantity
          return obj
        })
      }),

      Total() {
        const totalOrder = this.customerEdit.Price * this.customerEdit.Quantity;
        return totalOrder
      },

      showStatus() {
        let show = ''
        this.$route.path === '/Orders/Deliverd' ? show = false : show = true
        return show
      },

      caclDate() {
        let newdate = new Date();
        let year = newdate.getFullYear().toString()
        let month = (newdate.getMonth() + 1).toString()
        let day = newdate.getDate()
        let hour = newdate.getHours().toString()
        let munite = newdate.getMinutes().toString()
        let seconde = newdate.getSeconds().toString()

        const date = `${year}-${month}-${day} ${hour}:${munite}:${seconde}`
        return date
      },

    },
    methods: {

      // ------------- MODAL ----------------

      // HIDE
      hideModal() {
        this.$bvModal.hide('modalorder')
      },

      // EDIT ORDER 
      editOrder() {
        this.updateOrder()
        this.editStockProduct()
        this.hideModal()
      },


      // ---------------- CHANGE SELECT -----------------

      // CHANGE STATUS 
      changeStatus(id, ev) {
        this.updateStatusTable(id, ev)
        this.statusSuivi = ev
      },
      // CHANGE ACTION
      handleActionChange(ev, order) {

        const value = ev.target.value
        if (value === 'delete') {
          const userConfirmed = window.confirm("Do you really want to delete this order ?");
          this.OrderDelete = order
          if (userConfirmed) {
            this.StockPrdinOrderDelete()
            this.editStockProductInDeleteOrder()
            this.deletOrder(this.OrderDelete.id)
          }
        } else if (value === 'edit') {

          this.$bvModal.show('modalorder')
          this.customerEdit = order
          this.getOrderUpdate()
          this.RecentStockProduct()
          this.updateOrder()

        } else if (value === 'send') {
          this.statusSuivi = order.Status
          this.sendConversionStatusOrders()
          this.sendOrder(order.id)

        }
      },

      // --------------- STOCK PRODUCT --------------

      // STOCK IN EDIT ORDER
      RecentStockProduct() {
        let StockFinal = ''
        const newQuantity = this.customerEdit.Quantity
        const lastQuantity = this.orderUpdateApi.quantity
        const Product = this.allProducts.find(item => item.id === this.customerEdit.productId)
        let recentStock = ''
        Product ? recentStock = Product.quantity : ''
        if (newQuantity > lastQuantity) {
          StockFinal = parseInt(recentStock) - (parseInt(newQuantity) - parseInt(lastQuantity))
        } else if (newQuantity < lastQuantity) {
          StockFinal = (parseInt(lastQuantity) - parseInt(newQuantity)) + parseInt(recentStock)
        }
        return StockFinal
      },

      // STOCK IN DELETE ORDER
      StockPrdinOrderDelete() {

        let recentStock = ''
        const Product = this.allProducts.find(item => item.id === this.OrderDelete.productId)
        if (Product) {
          recentStock = parseInt(Product.quantity) + parseInt(this.OrderDelete.Quantity)
        }

        return recentStock

      },

      // ------------------ API -------------------

      // UPDATE STATUS TABLE
      async updateStatusTable(id, value) {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.put(`${process.env.VUE_URL}/api/order/statusTable/${id}`, {
            statustable: value
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data.message)
        } catch (error) {
          console.log(`error is ${error}`)
        }
      },

      async sendOrder(id) {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.put(`${process.env.VUE_URL}/api/order/sendOrder/${id}`, {
            statussuivi: this.statusSuivi,
            statustable: 'Not treat'
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data.message)
        } catch (error) {
          console.log(`error update status suivi is : ${error}`)
        }
      },

      async sendConversionStatusOrders() {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.post(`${process.env.VUE_URL}/api/order/conversion`, {
            status: this.statusSuivi,
            date: this.caclDate
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data.message)

        } catch (error) {
          console.log(`error the conversion status order is ${error}`)
        }
      },

      ////////////////////////////////////////////////////////////////////
      async getStatusConversion() {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.get('${process.env.VUE_URL}api/orderConversionStatus', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          this.allstatus = response.data.conversionOrders.filter(ele => ele.status === 'Confirmed').length
        } catch (error) {
          console.log(`error is ${error}`);
          console.log(error.response ? error.response.data : 'No response data');
        }
      },
      ////////////////////////////////////////////////////////////////////

      // UPDATE ORDER
      async updateOrder() {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.put(`${process.env.VUE_URL}api/order/${this.customerEdit.id}`, {
            quantity: this.customerEdit.Quantity,
            total: this.Total,
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data.message)
        } catch (error) {
          console.log(`error is ${error}`)
        }
      },

      // DELETE ORDER
      async deletOrder(id) {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.delete(`${process.env.VUE_URL}api/order/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data.message)
        } catch (error) {
          console.log(`error is ${error}`)
        }
      },

      // delet con
      async deleteconversion(id) {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.delete(`${process.env.VUE_URL}api/orderConversionStatus/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data.message)
        } catch (error) {
          console.log(`error delted convesion is ${error} `)
        }
      },

      // ----------------- EDIT STOCK PRODUCT API ----------------

      // IN EDIT
      async editStockProduct() {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.put(`${process.env.VUE_URL}/api/productQuantity/${this.customerEdit.productId}`, {
              quantity: this.RecentStockProduct()
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          console.log(response.data.message)
        } catch (error) {
          console.log(`error the update is  : ${error}`)
        }
      },

      // IN DELETE
      async editStockProductInDeleteOrder() {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.put(
            `${process.env.VUE_URL}/api/productQuantity/${this.OrderDelete.productId}`, {
              quantity: this.StockPrdinOrderDelete()
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          console.log(response.data.message)
        } catch (error) {
          console.log(`error the update stock is  : ${error}`)
        }
      },



      //  ORDERS
      async getOrderUpdate() {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.get(`${process.env.VUE_URL}api/order/${this.customerEdit.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          this.orderUpdateApi = response.data.order

        } catch (error) {
          console.log('error is :', error)
        }
      },

      //------------ SEARCH PRODUCT IN TABLE ------------
      searchprd(val) {

        // GET VALUE IN INPUT
        let value = val.toLowerCase()
        // GET ALL TR - AND LOOP FOR EVERY TR
        let alltr = Array.from(this.$el.querySelector('tbody').children)
        alltr.forEach(tr => {

          let isVisible = Array.from(tr.children).some(td => {
            // CHECK EVERY TD.TEXTCONTENT
            let tdtext = td.textContent.toLowerCase();
            return tdtext.includes(value);
          });

          tr.style.display = isVisible ? '' : 'none';

        })
      },


      // SEND OK popup
      handleOk(bvModalEvent) {

        let inputPopup = this.$refs.inputPopup.$el.value
        inputPopup === '' ? (bvModalEvent.preventDefault(), this.stateInputPopup = false) : this.stateInputPopup = null

      },
      ...mapActions('allProducts', {
        fetchProducts: 'ac_getProducts'
      }),

    },

    mounted() {
      this.getStatusConversion()
      this.fetchProducts()
      this.totalRows = this.orders.length
    }
  }
</script>


<style>
  #table-global {
    background: var(--couleur-primaire-1);
    padding: 41px 26px;
    border-radius: 12px;
  }


  #filter-input {
    background: transparent;
    height: 40px;
    color: white;
    border: 1px solid #6c757d;
  }


  #table-Order th {
    border-top: none;
    background-color: var(--couleur-primaire-1);
    color: var(--couleur-primaire-3);
  }

  #tbody td {
    background-color: var(--couleur-primaire-1);
    color: var(--couleur-primaire-3);
  }

  #select-sts .valuopton :hover {
    background-color: #cb0303
  }


  .selectstatus {
    border-radius: 13.25rem;
    font-weight: 700;
    font-size: 14px;
    height: 34px;
    border-radius: 13.25rem;
    padding: 0.375rem 0.75rem 0.375rem 0.75rem;
    width: auto;
  }


  .select {
    font-size: 13px;
  }



  #modal-1___BV_modal_backdrop_ {
    background-color: #00000026;
  }


  .popup {
    display: none;
  }

  #modal-footer-sm___BV_modal_footer_ :first-child {
    background-color: #cb0303;
    border: none;
  }

  #modal-footer-sm___BV_modal_footer_ :last-child {
    background-color: #04a820;
  }


  .bg-green {
    background: rgba(33, 150, 83, 0.1);
    color: #219653;
    font-size: 13px;
  }

  .Canceled {
    background-color: #FF6347;
    font-size: 13px;
  }

  .white {
    background-color: white;
    font-size: 13px;
  }
</style>


<b-form-select :options="options">
</b-form-select>