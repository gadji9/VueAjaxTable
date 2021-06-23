<template>
  <div class="mb-5 mt-4">
    <div class="row" >
      <div class="col-lg-12">
        <div class="form-check p-0 form-switch d-flex flex-column align-items-center">
          <span class="fw-bold fs-5">Большой объем данных</span>
          <input
            v-model="isswitched"
            class="switch form-check-input m-0"
            type="checkbox"
            id="flexSwitchCheckDefault"
            :disabled="isloading"
        
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    isloading:{
      type:Boolean
    }
  },
  data(){
    return{
      isswitched: false,
    }
  },
  watch:{
    isswitched(val){
      this.$emit('switched',val)
    }
  },
};
</script>

<style>
.switch {
  width: 100px !important;
  height: 40px;
}
</style>
