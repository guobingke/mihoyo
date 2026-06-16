<template>
  <div class="view hide">
    <NuxtLayout name="mi-layout">
      <template #header>
        <LazyMiHeader :links="links" @click="linkMatchRoute" ref="miheader" />
        <MiLangSelect />
      </template>
      <template #default>
        <Page />
      </template>
      <template #product>
        <LazyPageProduct />
      </template>
      <template #about>
        <PageAbout />
      </template>
      <template #join>
        <!-- <div class="home-join"></div> -->
        <PageJoin :values-res="valuesRes" :jobs-list="jobslist" />
      </template>
      <template #news>
        <PageNews :news-res="newsRes" />
      </template>
    </NuxtLayout>
    <MiMaskVideo></MiMaskVideo>
  </div>
</template>

<script setup lang="ts">
import { getHeaderLinks, getMihoyoData } from '~/assets/js/api'
definePageMeta({
  layout: false,
});

// 所有子组件所需要的数据请求
const links = ref<string[]>([]);
const paths = ref<string[]>([]);
const miheader = ref<{ linkSelect: (index: number) => void } | null>(null);
const valuesRes = ref([]);  // join页面数据
const jobslist = ref({})
const newsRes = ref([])// news页面数据
onMounted(() => {
  // 手动媒体查询，在每一次窗口resize后都修改一次 html 的font-size
  let fontSize = (window.innerHeight + 1.77983) / 10.82
  if (fontSize >= 60) {
    document.getElementsByTagName('html')[0].style.fontSize = `${fontSize}px`
  }

  window.addEventListener('resize', ({ target }) => {
    // 窗口高度，与 html 的font-szie有函数关系： fontSize = (height+1.77983) / 10.82
    let fontSize = (target.innerHeight + 1.77983) / 10.82
    if (fontSize >= 60) {
      document.getElementsByTagName('html')[0].style.fontSize = `${fontSize}px`
    }
  })


  // const { data: res } = await useFetch("/data/mihoyo.json")
  // const { data } = await useFetch("/data/headerlinks.json"); // 生产环境
  const res = getMihoyoData()
  const data = getHeaderLinks()

  useState("localText").value = res.value.localText

  data.forEach((item) => {
    links.value.push(item.title);
    paths.value.push(item.path);
  });

  valuesRes.value = res.value.valuesRes.list
  jobslist.value = {}

  newsRes.value = res.value.newsRes.list
  routeMatchLink();
  setTimeout(() => {
    document.querySelector(".view").classList.remove("hide")
  }, 8)


});

// 点击头部导航栏链接后切换路由
function linkMatchRoute(index: number) {
  // 如果是个网络链接就开一个新窗口
  if (paths.value[index].indexOf("http") != -1) {
    window.open(paths.value[index], "_blank");
  } else {
    useRouter().push("/?page=" + paths.value[index]);
  }
}
// 根据路由改变顶部导航栏链接状态
function routeMatchLink() {
  // 当顶部栏组件创建后
  if (miheader.value != null) {
    if (useRoute().query.page == undefined) {
      miheader.value.linkSelect(0);
    } else {
      for (let i = 0; i < paths.value.length; i++) {
        if (useRoute().query.page == paths.value[i]) {
          miheader.value.linkSelect(i);
          break;
        }
      }
    }
  }
}
watch(
  () => useRoute().query,
  () => {
    routeMatchLink();
  }
);

</script>

<style lang="less" scoped>
.view {
  position: relative;
  width: 100%;
  background: #f8f9fb url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAFVJREFUSEtjfPn+238GJMDBxozMJZn949dfuB5GkOHiglyMJJtChIYhbPjHrz//83Oz0yZYRg3HlngYR4NlNFiIKFUgSkZTC9agGg0W7MEyWs1hCxcAF5pe5Ya82ZoAAAAASUVORK5CYII=) repeat center center/0.23rem 0.23rem;
}

.hide {
  visibility: hidden;
}
</style>
