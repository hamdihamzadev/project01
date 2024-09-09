import axios from "axios"

const state = {
    customers: [],
}

const mutations = {

    m_getCustomers(state, customers) {
        state.customers = customers
    },

    m_editCustomer(state,{customer,id}){
        state.customers=state.customers.map(ele => ele.id === id ? {...customer,id} : ele )
    },

    m_deleteCustomer(state,id){
        state.customers=state.customers.filter(ele => ele.id!==id  )
    }
  

}

const actions = {

    async ac_getCustomers({
        commit
    }) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${process.env.VUE_URL}/api/customers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let customers = response.data.Allcustomers
            commit('m_getCustomers',customers)

        } catch (error) {
            console.log(`error get all orders is ${error}`)
        }
    },

    async ac_EditCustomer({commit},{customer,id}){
        try{
            const token=localStorage.getItem('token')
            const response = await axios.put(`${process.env.VUE_URL}/api/customers/${id}`,customer, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                commit('m_editCustomer',{customer,id})
            console.log(response.data.message)
        }
        catch(error){
            console.log(`error get edit customer is ${error}`)
        }
    },

    async ac_deleteCustomer({commit},id) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.delete(`${process.env.VUE_URL}/api/customers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            commit('m_deleteCustomer',id)
            console.log(response.data.message)
        } catch (error) {
            console.log('error the delete customer is :', error)
        }
    },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}