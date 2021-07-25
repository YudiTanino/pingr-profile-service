<template>
    <div>
        <span>{{property}}</span>
        <span>{{value}}</span>
    </div>
</template>

<script>
export default {
 props: ['property', 'value']
}
</script>