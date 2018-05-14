<template>
  <div class="category">
    <text class="category-text">{{title}}</text>
  </div>
</template>

<style scoped>
  .category {
    width: 750px;
    height: 68px;
    padding-bottom: 20px;
    background-color: transparent;
    justify-content: center;
  }
  .category-text {
    color: #000000;
    font-weight: 600;
    font-size: 28px;
  }
</style>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>