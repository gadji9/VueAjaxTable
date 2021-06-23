<template>
  <div class="row">

  <div class="col-lg-12 p-0 d-flex justify-content-between">
  <div>
      <button @click="adding = !adding" class="btn btn-primary">Добавить </button>
    </div>
    <div>  
      <button @click="serching = !serching" class="btn btn-primary ">Поиск контакта</button>  
    </div>
  </div>
  <div v-if="adding" class="p-0">
    <input v-model="id" placeholder="id" class="my-3 form-control" type="text"/>
    <input v-model="firstname" placeholder="name" class="my-3 form-control" type="text">
    <input v-model="lastname" placeholder="lastname" class="my-3 form-control" type="text">
    <input v-model="email" placeholder="email" class="my-3 form-control" type="text">
    <input v-mask="{mask:'(999)999-9999'}" v-model="phone" placeholder="phone" class="my-3 form-control" type="text"/>
    <input v-model="desc" placeholder="description" class="my-3 form-control" type="text">
    <div class="d-flex justify-content-end">
      <button @click="SendForm" :disabled="CheckForm" class="btn btn-primary">Добавить</button>
    </div>
  </div>
  <div v-if="serching" class="d-flex p-0">
    <input @keyup.enter="SerchByData" v-model="inputdata" class="form-control" type="text">  
    <button @click="SerchByData" class="btn btn-primary">Искать</button>
  </div>
    <table class="table table-bordered border-primary">
      <thead>
        <tr>
          <th @click="SortById">id <img v-if="!higherForId" src="../assets/icons8-вверх-48.png" alt=""> <img v-else src="../assets/icons8-вниз-48.png" alt=""> </th>
          <th @click="SortByFirstName">firstname <img v-if="!higherForFirstName" src="../assets/icons8-вверх-48.png" alt=""> <img v-else src="../assets/icons8-вниз-48.png" alt=""> </th>
          <th @click="SortByLastName">lastname <img v-if="!higherForLastName" src="../assets/icons8-вверх-48.png" alt=""> <img v-else src="../assets/icons8-вниз-48.png" alt=""> </th>
          <th @click="SortByEmail">email <img v-if="!higherForEmail" src="../assets/icons8-вверх-48.png" alt=""> <img v-else src="../assets/icons8-вниз-48.png" alt=""> </th>
          <th @click="SortByPhone">phone <img v-if="!higherForPhone" src="../assets/icons8-вверх-48.png" alt=""> <img v-else src="../assets/icons8-вниз-48.png" alt=""> </th>
          <th @click="SortByDesc">description <img v-if="!higherForDesc" src="../assets/icons8-вверх-48.png" alt=""> <img v-else src="../assets/icons8-вниз-48.png" alt=""> </th>
        </tr>
      </thead>
      <tbody v-if="!isloading">
        <tr v-for="(inf,index) in PeoplesCounter" :key="index"  @click="Selected(inf.id)">
          <td class="cell">{{inf.id}}  </td>
          <td class="cell">{{inf.firstName}}  </td>
          <td class="cell">{{inf.lastName}}  </td>
          <td class="cell">{{inf.email}}  </td>
          <td class="cell">{{inf.phone}}  </td>
          <td class="pt-3"><button @click="UnReduce" class="text-shower"> ... </button><div :data-id = "'reduced' + index" :ref = "'reduced' + index" :class="isreduced">{{inf.description}}  </div></td>
        </tr>
      </tbody>
    </table>
    <VselectedPerson v-if="isselectedPerson" :findPerson=" FindPerson " />
    <div v-if="PageShows" class="pagination col-lg-12 d-flex justify-content-center">
          <div class="page"
          v-for="page in pages" :key="page"
          @click="curPage = page"
          :class="{'selected-page' : page===curPage}"
          >
          {{page}}
          
          </div>
      </div>
  </div>
</template>

<script>
import * as EmailValidator from 'email-validator';
import VselectedPerson from './v-selectedPerson.vue'
export default {
  data(){
    return{
      isselectedPerson: false,
      selectedPerson: '',
      adding: false,
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      desc:'',
      inputdata: '',
      serching: false,
      isreduced : 'reduced',
      peoplesOnPage:25,
      curPage:1,
      higherForFirstName: true,
      higherForLastName: true,
      higherForEmail: true,
      higherForPhone: true,
      higherForDesc: true,
      higherForId: true,
      founded_peoples: []
    }
  },
  methods: {
    SendForm(){
      const dataObject = {id:this.id, firstName:this.firstname, lastName:this.lastname, email:this.email, phone:this.phone, description:this.desc}
      this.$emit('AddToPeoples', dataObject)
    },
    SerchByData(){
       this.founded_peoples = this.peoples_info.filter(elem => (elem.id == this.inputdata) || (elem.firstName.toUpperCase() == this.inputdata.toUpperCase()) || (elem.lastName.toUpperCase() == this.inputdata.toUpperCase()) || (elem.email == this.inputdata) || (elem.phone == this.inputdata) || (elem.description.toUpperCase() == this.inputdata.toUpperCase()))
    },
    UnReduce(event){
      console.log(event)
      if(event.srcElement.innerText == '...'){
        this.$refs.[event.srcElement.parentElement.children[1].attributes[0].value][0].className = "nonreduced"
        event.srcElement.innerHTML = '<--'
        event.srcElement.className = "text-reducer"
        console.log()
      }
      else{
        this.$refs.[event.srcElement.parentElement.children[1].attributes[0].value][0].className = "reduced"
        event.srcElement.innerHTML = '...'
        event.srcElement.className = "text-shower"
      }
    },
    SortById(){
      if(this.higherForId) { // не стану добавлять функцию сортировки для найденных контактов с помощью кнопки "Поиск контакта" так как это бесполезно.
        this.peoples_info.sort((a,b) =>a.id - b.id)
        this.higherForId = false
      }
      else{
        this.peoples_info.sort((a,b) =>b.id - a.id)
        this.higherForId = true
      }
    },
    SortByFirstName(){
      if(this.higherForFirstName){
        this.peoples_info.sort((a,b) => a.firstName.localeCompare(b.firstName))
        this.higherForFirstName = false
      } 
      else{
        this.peoples_info.sort((a,b) => b.firstName.localeCompare(a.firstName, undefined, { sensitivity: 'accent' }))
        this.higherForFirstName = true
      }
   },
    SortByLastName(){
        if(this.higherForLastName){
          this.peoples_info.sort((a,b) => a.lastName.localeCompare(b.lastName))
          this.higherForLastName = false
        } 
        else{
          this.peoples_info.sort((a,b) => b.firstName.localeCompare(a.LastName))
          this.higherForLastName = true
        }
      },
    SortByEmail(){
        if(this.higherForEmail){
          this.peoples_info.sort((a,b) => a.email.localeCompare(b.email))
          this.higherForEmail = false
        } 
        else{
          this.peoples_info.sort((a,b) => b.email.localeCompare(a.email))
          this.higherForEmail = true
        }
    },
    SortByPhone(){
        if(this.higherForPhone){
          this.peoples_info.sort((a,b) => a.phone.localeCompare(b.phone))
          this.higherForPhone = false
        } 
        else{
          this.peoples_info.sort((a,b) => b.phone.localeCompare(a.phone))
          this.higherForPhone = true
        }

    },
    SortByDesc(){
        if(this.higherForDesc){
          this.peoples_info.sort((a,b) => a.description.localeCompare(b.description))
          this.higherForDesc = false
        } 
        else{
          this.peoples_info.sort((a,b) => b.description.localeCompare(a.description))
          this.higherForDesc = true
        }
      },
      Selected(id){
        this.isselectedPerson = true
        this.selectedPerson = id
      }
  },
  props:{
    peoples_info:{
      type:Array
    },
    isloading:{
      type: Boolean
    }
  },
  computed:{
    pages(){
      return Math.ceil(this.peoples_info.length / 25)
    },
    PeoplesCounter(){
      if(!this.serching)
      {
      let start = this.peoplesOnPage * (this.curPage-1)
      let finish =this.curPage * this.peoplesOnPage
      return this.peoples_info.slice(start,finish)
      }
      else{
        return this.founded_peoples

      }

    },
      PageShows(){
        if(this.isloading || this.serching){
          return false
        }
        else{
          return true
        }
      },
      CheckForm(){
        if(this.id && this.lastname && this.firstname && EmailValidator.validate(this.email) && this.phone && this.desc){
          return false
        }
        else{
          return true
        }
      },
      FindPerson(){
        const pers = this.peoples_info.find((elem)=> elem.id == this.selectedPerson)
        return pers
      }
  },
  components:{
    VselectedPerson,
  }
};
</script>

<style>
*{
box-sizing:border-box
}
.text-shower{
border-color:rgb(6, 155, 255);
background-color: rgb(6, 155, 255);
font-size: 10px;
max-height: 20px;
position: absolute;
left:92%;
top:55%;
}
.text-reducer{
border-color:rgb(6, 155, 255);
float:left;
position:absolute;
font-size: 10px;
width: 35px;
height: 20px;
left:88%;
top:85%;
}
.cell{
text-align:center !important;
vertical-align: middle;
}
.reduced{
  max-width:250px;
  max-height:20px;
  overflow:hidden;
  align-self:center;

}
td{
position:relative
}
th:hover{
cursor:pointer;
}
th img{
width:10px
}
.nonreduced{
width:200px
}
.pagination{
flex-wrap:wrap;
}
.page{
margin-left:10px;
padding:8px;
border:solid 1px black;
font-size:15px;

}
.page:hover{
cursor:pointer;
background-color: #aeaeae;
}
.selected-page{
  background-color: rgb(75, 71, 71);
  color:white;
}
</style>
