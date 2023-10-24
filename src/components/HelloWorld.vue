<script setup lang="ts">
defineProps<{ msg: string }>()

</script>

<template>
  <div class="hello-world">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
.hello-world {
  font-size: 50px;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100%;
  color: red;
  padding: 20px;
  &:hover{
    color: blue;
  }
}
</style>
