<template>
  <div class="recommend">
    <div
      v-for="recommend in recommends"
      :key="recommend.image"
      class="recommend-item"
    >
      <a :href="recommend.link">
        <img :src="recommend.image" alt="" />
        <div>{{ recommend.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0px 10px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>