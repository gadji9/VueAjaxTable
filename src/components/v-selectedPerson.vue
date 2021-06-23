<template>
    <div>
        <table class="table table-bordered border-primary">
        <tbody>
            <tr>
                <th>
                    Выбран пользователь:
                </th>
                <td>
                    <b> {{findPerson.firstName}} {{findPerson.lastName}} </b>
                </td>
            </tr>
            <tr>
                <th>
                    Описание:
                </th>
                <td class="p-0">
                <div>
                    <textarea class="form-control" style="width:100%; resize:none" rows="4" :value="findPerson.description" >
                    
                    </textarea>
                </div>
                    
                </td>
            </tr>
            <tr>
                <th>
                    Адрес проживания:
                </th>
                <td>
                    {{findPerson.address.streetAddress}}
                </td>   
            </tr>
            <tr>
                <th>
                    Провинция/Штат:
                </th>
                <td>
                    {{findPerson.address.state}}
                </td>
            </tr>
            <tr>
                <th>
                    Индекс:
                </th>
                <td>
                    {{findPerson.address.zip}}
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props:{
            findPerson:{
                type: Object
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>