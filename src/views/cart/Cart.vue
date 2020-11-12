<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
// import CartBottomBar from "./childComps/CartBottomBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
    // 写法2
    // ...mapGetters({
    //   length: "cartLength",
    //   list: "cartList",
    // }),
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}

.cart-nav {
  background-color: var(--color-tint);
  color: white;
  font-weight: bold;
}
</style>