import axios from "axios"

const state = {
    orders: [],
    conversionOrders: {
        New: [],
        Confirmed: [],
        Shipped: [],
        Delivered: [],
        Return: [],
        Cancelled: []
    }
}

const mutations = {

    m_getOrders(state, orders) {
        state.orders = orders
    },

    m_postOrder(state,order){
        state.orders.push(order)
    },

    m_GetConversionOrders(state, {
        type,
        orders
    }) {
        state.conversionOrders[type] = orders
    },

    m_deleteOrder(state,id){
        state.orders=state.orders.filter(ele => ele._id!==id )
    }

}


const actions = {

    async ac_getOrders({
        commit
    }) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${process.env.VUE_URL}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const allOrders = response.data.orders
            commit('m_getOrders', allOrders)

        } catch (error) {
            console.log(`error get all orders is ${error}`)
        }
    },

    async ac_postOrder({commit},order) {
        try {
            const token = localStorage.getItem('token')
           const response= await axios.post(`${process.env.VUE_URL}/api/order`,order, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(order)
            commit('m_postOrder',order)
            console.log(response.data.message)
           
        
        } catch (error) {
            console.log(`error is : ${error}`)
        }
    },

    async ac_GetConversionOrders({
        commit
    }, type) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${process.env.VUE_URL}/api/orderConversionStatus`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const orders = response.data.conversionOrders.filter(ele => ele.status === type)
            commit('m_GetConversionOrders', {
                type,
                orders
            })

        } catch (error) {
            console.log(`error get GetConversionOrders is ${error}`)
        }
    },

    async ac_deleteOrder({commit},id){
        try{
            const token=localStorage.getItem('token')
            const response=await axios.delete(`${process.env.VUE_URL}/api/order/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.message)
            commit('m_deleteOrder',id)
        }
        catch(error){
            console.log(`error delete order is ${error}`)
        }
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}