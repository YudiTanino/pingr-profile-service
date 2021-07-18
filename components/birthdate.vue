<template>
    <div>
        <span>{{birthdate}}</span>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            birthdate: {
                day: 1,
                month: 1,
                year: 2000
            },
        }
    },
}
</script>