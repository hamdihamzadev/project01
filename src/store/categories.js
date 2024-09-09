import axios from "axios"

const state = {
    categories: [],
}

const mutations = {

    m_getCategories(state, categories) {
        state.categories = categories
    },

    m_addCategory(state,category){
        state.categories.push(category)
    },

    m_deleteCategory(state,id){
        state.categories= state.categories.filter(ele=> ele._id!==id)
    },

}

const actions = {

    async ac_getCategories({
        commit
    }) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${process.env.VUE_URL}/api/category`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let categories = response.data.category
            commit('m_getCategories', categories)

        } catch (error) {
            console.log(`error get all orders is ${error}`)
        }

    },

    async ac_addCategory({commit},category){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.post(`${process.env.VUE_URL}/api/category`,category, {
                
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })

            console.log(response.data.message)
            commit('m_addCategory',category)

        }
        catch(error){
            console.log(`error add category is all  ${error}`)
        }
    },

    async ac_deleteCategory({commit},id){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.delete(`${process.env.VUE_URL}/api/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.message)
            commit('m_deleteCategory',id)

        }
        catch(error){
            console.log(`error add category is all  ${error}`)
        }
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}