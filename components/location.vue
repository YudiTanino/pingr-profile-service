<template>
    <div>
        <property property="Localização" v-bind:value="value"/>
    </div>
</template>

<script>
export default {
    props: ['value']
}
</script>

