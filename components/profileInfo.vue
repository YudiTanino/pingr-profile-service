<template>
<div class = "bigBox">
    <img class = "profileCircle" src = "https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Round&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray01&eyeType=Close&eyebrowType=AngryNatural&mouthType=Serious&skinColor=Tanned"/>
    <div class = "profileBox">
        <name v-bind:name="user.name"/>
        <username class = "username" v-bind:username="user.username"/>
        <creationDate v-if="isPublic" v-bind:value="user.creationDate"/>
        <birthdate v-if="isPublic" v-bind:value="user.birthdate"/>
        <location v-if="isPublic" v-bind:value="user.location"  />
        <description v-if="isPublic" v-bind:value="user.description"/>
        <button class="forms">Editar Infos</button>
    </div>
</div>
</template>

<script>
export default ({
    props: ["isPublic", "user"]
})
</script>

<style>
.bigBox{
    @apply flex;
}
.profileBox{
    @apply rounded-md border shadow p-2;
}
.profileCircle{
    @apply rounded-full mx-8;
}
.forms{
    @apply p-2 bg-red-500 rounded-md text-white mt-5 hover:bg-red-400;
}
</style>
