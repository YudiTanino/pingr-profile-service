<template>
    <div>
        <span>{{creationDate}}</span>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            creationDate: {
                day: 14,
                month: 7,
                year: 2021
            },
        }
    },
}
</script>