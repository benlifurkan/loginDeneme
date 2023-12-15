<script lang="ts" setup>
import { useFetch } from "@vueuse/core";
import { computed } from "vue";
import slugify from "slugify";
import { toast } from "vue-sonner";
import { s } from "unplugin-vue-router/dist/defineLoader-bde635fd";
import { time } from "console";

const { data: menus, isFetching } = useFetch(
  "https://qr-api.furkanbenli33.workers.dev/menus"
);

const images = [
  "slider-image.png",
  "8164-.jpg",
  "51-ana-yemekler.jpg",
  "dribbble_1.gif",
];

const getParsedMenus = computed(() => {
  return menus.value && typeof menus.value === "string"
    ? JSON.parse(menus.value)
    : [];
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCarousel
        cycle
        hide-delimiter-background
        show-arrows="hover"
        class="rounded-lg"
        :height="$vuetify.display.smAndDown ? 200 : 475"
        color="white"
      >
        <VCarouselItem
          v-for="image in images"
          :key="image"
          :src="`/slider/${image}`"
          cover
        />
      </VCarousel>
    </VCol>

    <VCol cols="12">
      <VCardTitle class="font-weight-bold px-0"> Öne Çıkan Menüler </VCardTitle>
    </VCol>

    <img
      v-if="isFetching"
      src="eos-icons:bubble-loading"
      class="mx-auto"
      alt="Animation"
      title="Animation"
    />
    <span v-if="isFetching" class="mx-3 text-disabled"> Yükleniyor... </span>

    <template v-else>
      <span
        v-if="getParsedMenus.slice(0, 6).length === 0"
        class="mx-3 text-disabled"
      >
        Henüz menü eklenmemiş.
      </span>

      <VCol
        v-for="menu in getParsedMenus.slice(0, 6)"
        :key="menu.id"
        cols="6"
        md="4"
        lg="2"
      >
        <VCard :to="`/menu/${slugify(menu.name, { lower: true })}`">
          <VOverlay
            :model-value="true"
            attach
            contained
            class="align-center text-white text-center justify-center"
            persistent
            :close-on-content-click="false"
          >
            <template #activator>
              <VImg :src="menu.image" cover height="250" />
            </template>

            <VCardTitle class="mt-0 font-weight-bold">
              {{ menu.name }}
            </VCardTitle>
          </VOverlay>
        </VCard>
      </VCol>

      <VCol cols="12" class="mt-10">
        <VCardTitle class="font-weight-bold px-0"> Tüm Menülerimiz </VCardTitle>
      </VCol>

      <span
        v-if="getParsedMenus.slice(6, getParsedMenus.length).length === 0"
        class="mx-3 text-disabled"
      >
        Henüz menü eklenmemiş.
      </span>

      <VCol
        v-for="menu in getParsedMenus.slice(6, getParsedMenus.length)"
        :key="menu.id"
        cols="6"
        md="4"
        lg="2"
      >
        <VCard :to="`/menu/${slugify(menu.name, { lower: true })}`">
          <VOverlay
            :model-value="true"
            attach
            contained
            class="align-center text-white text-center justify-center"
            persistent
            :close-on-content-click="false"
          >
            <template #activator>
              <VImg :src="menu.image" cover height="175" />
            </template>

            <VCardTitle class="mt-0 font-weight-bold">
              {{ menu.name }}
            </VCardTitle>
          </VOverlay>
        </VCard>
      </VCol>
    </template>
  </VRow>
</template>
