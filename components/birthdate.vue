<template>
    <div>
        <span>{{birthdate}}</span>
    </div>
</template>

<script>
export default {
    computed: {
        birthdate() {
            return this.$store.state.profile.user.birthdate
        }
    },
}
</script>