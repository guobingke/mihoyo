<template>
  <div :class="'home-' + page">
    <MiBanner ref="mibanner" @bannerchange="bannerchange" @bannertransition="bannertransition" :datasets="datasets" />
  </div>
  <NavBar ref="minavbar" @navchange="navchange" />
</template>

<script setup lang="ts">
import { getBannerInfo } from '~/assets/js/api'

const page = "product";
const datasets = ref<unknown[] | null>(null);

const mibanner = ref<{ slideTo: (index: number) => void } | null>(null);
const minavbar = ref<{ change: (index: number) => void; pause: (time: number | boolean) => void } | null>(null);

function navchange(i: number): void {
  mibanner.value?.slideTo(i);
}
function bannerchange(i: number): void {
  minavbar.value?.change(i);
}
function bannertransition(time: number): void {
  minavbar.value?.pause(time);
}

onMounted(() => {
  // const { data } = await axios.get("/data/bannerinfo.json");
  // this.datasets = data;
  datasets.value = getBannerInfo() as unknown[];
});
</script>

<style lang="less" scoped>
.home-product {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
