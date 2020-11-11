import {
    debounce
} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,

        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 50);
        this.itemImgListener = () => {
            refresh();
        };
        this.$bus.$on("itemImgLoad", this.itemImgListener);
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    components: {
        BackTop
    },
    methods: {
        // 组件监听
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        listenShowBackTop(position) {
            // 1.判断是否显示回到顶部
            this.isShowBackTop = -position.y > 1000;
        },
    }
}