<template>
    <div>
        <username />
        <name />
        <creationDate v-if="isPublic" />
        <birthdate v-if="isPublic" />
        <description />
        <location v-if="isPublic" />
    </div>
</template>
