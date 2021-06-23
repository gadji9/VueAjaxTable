<template>
  <div id="app">
      <div v-if="isLoading" class="spinner-box">
        <div class="d-flex justify-content-center">
              <div class="spinner-border" style="width:100px; height:100px" role="status">
              </div>
          </div> 
      </div>
    <div class="container">
      <Vswitcher :isloading="isLoading" @switched="SwitchWatcher" />
      <Vtable @AddToPeoples="AddWatcher" :isloading="isLoading" :peoples_info="PEOPLES"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Vswitcher from "./components/v-switcher"
import Vtable from "./components/v-table"
export default {
  data(){
    return{
      isLoading: false
    }
  },
  name: "App",
  components: {
    Vswitcher,
    Vtable,
  },
  methods:{
    async AddWatcher(data){
      this.ADD_PEOPLES(data)
    },
    async SwitchWatcher(event){
      console.log(event)

      this.isLoading = true
      await this.GET_PEOPLES(event)
      this.isLoading = false
    },
    ...mapActions([
      'GET_PEOPLES',
      'ADD_PEOPLES'
    ])
  },
  computed:{
    ...mapGetters([
      'PEOPLES'
    ])
  },
  async mounted(){
   this.isLoading = true
   await this.GET_PEOPLES(false)
   this.isLoading = false
  }
};
</script>

<style>
.spinner-box{
position:absolute;
left:50%;
top:50%;
transform:translate(-50%,-50%)
}
</style>
