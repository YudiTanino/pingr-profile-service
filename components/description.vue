<template>
    <div>
        <property property="Descrição" v-bind:value="value"/>
    </div>
</template>

<script>
export default {
    props: ['value']
}
</script>