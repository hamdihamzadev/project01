import axios from "axios"

const state = {
    Products: []
}

const mutations = {
    m_getProducts(state, Products) {
        state.Products = Products
    },

    m_addProduct(state, product) {
        state.Products.push(product)
    },

    m_editeProduct(state,{product,id}) {
        state.Products= state.Products.map(ele => ele.id===id ? {...product,id}: ele )
    },

    m_deleteProduct(state,id){
        state.Products=state.Products.filter(ele => ele.id!==id )
    }
}

const actions = {


    async ac_getProducts({
        commit
    }) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${process.env.VUE_URL}/api/product`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const Products = response.data.products
            commit('m_getProducts', Products)

        } catch (error) {
            console.log('error is :', error)
        }
    },

    async ac_addProduct({commit},product) {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${process.env.VUE_URL}/api/product`,product, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response.data.message)
        commit('m_addProduct',product)
    },

    async ac_editeProduct({commit},{product,id}){
        try{
            const token=localStorage.getItem('token')
            const response = await axios.put(`${process.env.VUE_URL}/api/product/${id}`,product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response.data.message)
            commit('m_editeProduct',{product,id})
        }
        catch(error){
            console.log('error is :', error)
        }
    },

    async ac_deleteProduct({commit},id){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.delete(`${process.env.VUE_URL}/api/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.message)
            commit('m_deleteProduct',id)
        }
        catch(error){
            console.log('error delete prd is :', error)
        }
    }

}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}