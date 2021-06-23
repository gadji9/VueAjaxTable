import Vue from 'vue'
import Vuex from 'vuex'
import axios from'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        peoples:[]
    },
    actions:{
        GET_PEOPLES({commit},bigdatasize){
            console.log(bigdatasize)
            if(!bigdatasize)
            {
                return axios('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',{
                    method:'GET'
                }).then((res)=>{
                    commit('SET_PEOPLES',res.data)
                })
            }
            else
            {
                return axios('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',{
                    method:'GET'
                }).then((res)=>{
                    commit('SET_PEOPLES',res.data)
                })   
            }
        },
        ADD_PEOPLES({commit}, data){
            commit('ADD_PEOPLES_TO_START', data)
        }

    },
    mutations:{
        SET_PEOPLES(state,peoples){
            state.peoples = peoples
        },
        ADD_PEOPLES_TO_START(state,data){
            console.log(data)
            state.peoples.unshift(data)
        }
    },
    getters:{
        PEOPLES(state){
            return state.peoples
        }
    }
})

export default store