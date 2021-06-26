import Vue from 'vue';

export default {
    async login({ commit }, { email, password }) {
        console.log(this);
        commit('PROCESSING');
        const response = await Vue.prototype.$axios.post('api/login', { email, password });
        commit('PROCESSED');

        return response;
    }
}