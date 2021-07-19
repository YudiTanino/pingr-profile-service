<template>
    <div>
        <span>{{description}}</span>
    </div>
</template>

<script>
export default {
    computed: {
        description() {
            return this.$store.state.profile.user.description
        }
    },
}
</script>