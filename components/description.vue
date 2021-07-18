<template>
    <div>
        <span>{{description}}</span>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            username: '<username>',
            name: '<name>',
            isPublic: true,
            creationDate: {
                day: 14,
                month: 7,
                year: 2021
            },
            birthdate: {
                day: 1,
                month: 1,
                year: 2000
            },
            description: '<description>',
            location: '<location>'
        }
    },
}
</script>