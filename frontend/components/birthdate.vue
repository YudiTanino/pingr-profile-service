<template>
    <div>
        <property property="Nascimento" v-bind:value="dateText"/>
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