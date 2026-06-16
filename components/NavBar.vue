<template>
  <div class="navBar" :style="navStyle">
    <nav
      class="nav-item"
      v-for="(item, index) in items"
      :class="index === selected ? 'nav-item-border' : ''"
      :key="index"
      @click="
        navChange(index);
        change(index);
      "
    >
      <slot name="img" :item="item">
        <img :src="item" alt="miHoYo" />
      </slot>
    </nav>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({
//   keepalive: true,
// });
const props = withDefaults(defineProps<{
  delay?: number;
  items?: string[];
  navStyle?: Record<string, string>;
}>(), {
  delay: 3420,
  items: () => [
    // "/f2mi.png",
    "https://webstatic.mihoyo.com/upload/op-public/2021/10/11/320a35c423a3d8ca043d7ee14a8c7925_602536019813937911.png",
    "https://webstatic.mihoyo.com/upload/op-public/2021/10/03/4080f2eb748823d8c38507c3d7b69b36_936817768851375073.png",
    "https://webstatic.mihoyo.com/upload/op-public/2021/10/03/a103c80cb895bfdfb7496f4233b63158_8329011972047580487.png",
    "https://webstatic.mihoyo.com/upload/op-public/2021/10/09/def1f2abcfc2af0bbe2e5900a60a5ee1_5699547505742166353.png",
    "https://webstatic.mihoyo.com/upload/op-public/2021/10/09/870472d6104dbbe7ea18b27c13763ccb_5300916022261002498.png",
    // "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b02b7f48-0227-438f-8c3a-3a5f94afa017/fcdce578-09ac-431b-be76-99157cca3f83.png",
    "https://webstatic.mihoyo.com/upload/op-public/2022/05/27/3896559583929f643fbe39ec1d6ca1c9_1026345827445617861.png",
    "https://webstatic.mihoyo.com/upload/op-public/2021/10/09/c218c585aac4aad0a30ab9a6e0e0794c_3908343860724847173.png",
    "https://webstatic.mihoyo.com/upload/op-public/2021/10/12/7bca19669fd95c1a961a26dc009c342e_7821980510293425191.png",
  ],
  navStyle: () => ({ top: "8.9rem", left: "50%" }),
});

const emit = defineEmits<{ (e: "navchange", index: number): void }>();

// selected 当前选中的图标位置，获得边框。默认是第一个图标
const selected = ref<number>(0);
// timeOut 用于保存创建的定时器的id，用户点击某个图标后取消定时器。
let timeOut: ReturnType<typeof setTimeout> | null = null;
const route = useRoute();
const isShowVideo = useState<string | false>("isShowVideo");

function changeForm(): void {
  // 通过递归调用定时器，修改selected中的图标数字，当用户点击后某个图标后 去除定时器
  timeOut = setTimeout(() => {
    selected.value = selected.value + 1 == props.items.length ? 0 : selected.value + 1;
    changeForm();
  }, props.delay);
}
function navChange(index: number): void {
  // 发送事件，给父组件传递当前index值
  emit("navchange", index);
}
function change(index: number): void {
  // 用户点击后，将 selected 设置为 index
  selected.value = index;
  pause(10000);
}
/**
 * 设置轮播图暂停一段时间
 * @param {number|boolean} time 需要暂停的时间，单位为毫秒(ms)
 */
function pause(time: number | boolean): void {
  // 并清除当前的定时器，终止轮播
  if (timeOut) clearTimeout(timeOut);
  // 用户点击10秒后如果没有操作就重新开始轮播
  if (time == false) {
    changeForm();
  } else if (typeof time == "number") {
    timeOut = setTimeout(() => {
      changeForm();
    }, time);
  }
}

watch(
  () => route.query,
  (newRoute) => {
    if (newRoute.page != "product") {
      pause(true);
    } else {
      pause(false);
    }
  },
  { deep: true }
);
watch(isShowVideo, (n) => {
  // 如果视频正在播放，则停止导航图轮播
  if (n != false) {
    pause(true);
  } else {
    pause(false);
  }
});

onMounted(() => {
  changeForm();
});

defineExpose({
  change,
  pause,
});
</script>

<style scoped>
.navBar {
  position: absolute;
  /* top: 620px; */
  /* left: 50%; */
  z-index: 9;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 13.7rem;
  height: 1rem;
  transform: translateX(-81.8%);
}

.nav-item {
  display: flex;
  box-sizing: content-box;
  justify-content: center;
  align-items: center;
  width: 0.74rem;
  height: 0.74rem;
  padding: 2px;
  margin-right: 0.1rem;
  border: 2px solid transparent;
  border-radius: 0.06rem;
  transition: border 300ms;
  cursor: pointer;
}

.nav-item:hover {
  border-color: #3778e5;
}

.nav-item-border {
  border-color: #3778e5;
}

.nav-item img {
  width: 100%;
  height: 100%;
  border-radius: 0.04rem;
  filter: blur(0.32px);
}
</style>
