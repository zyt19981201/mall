<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contenScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },

  created() {
    // 1.请求多个数据
    this.getMultidata();
    // 2.请求商品数据
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50);

    // this.debounce(this.$refs.scroll.refresh, 500);
    // 1.监听item中图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      // console.log(this.$refs.scroll.refresh);
      refresh();
    });
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
    // console.log("我回来啦");
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  methods: {
    // 事件监听方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contenScroll(position) {
      // 1.判断返回顶部是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.判断是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 组件监听
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    // 网络请求方法
    getMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>