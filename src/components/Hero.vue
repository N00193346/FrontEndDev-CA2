<template>
<div>
   <v-container fluid>
    <v-row justify="space-around">
      <v-col cols="5">
        <v-img
          :src="heroImage.name"
          aspect-ratio="1.7"
        ></v-img>
      </v-col>
    </v-row>
   </v-container>
</div>
</template>

<script>
    export default {
        name: 'Hero',
        props: {
           heroImage: Object
        }
    }
</script>
<style scoped>

</style>