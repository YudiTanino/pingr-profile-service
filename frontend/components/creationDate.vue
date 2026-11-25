<template>
    <div>
        <property property="Criado em" v-bind:value="dateText"/>
    </div>
</template>

<script>
export default {
    props: ['value'],
    computed: {
        dateText(){
            return this.value.day + "/" +  this.value.month + "/" + this.value.year
        }
    }
}
</script>



value.date.day / value.date.day 