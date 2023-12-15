<script lang="ts" setup>
import { useFetch } from "@vueuse/core";
import { computed } from "vue";
import slugify from "slugify";

const { data: menus, isFetching } = useFetch(
  "https://qr-api.furkanbenli33.workers.dev/menus"
);

const images = ["bize-ulasin.jpg"];

const getParsedMenus = computed(() => {
  return menus.value && typeof menus.value === "string"
    ? JSON.parse(menus.value)
    : [];
});
</script>

<template>
  <VRow>
    <div
      class="mt-10"
      style="
        width: 100%;
        height: 100%;
        border: solid 2px black;
        border-radius: 20px;
        box-shadow: 0px 8px 8px #ea906c;
      "
    >
      <VImg
        style="width: 100%; height: 100%; border-radius: 17px"
        :src="`/contact-image/${images}`"
      ></VImg>
    </div>
    <VCol cols="12">
      <VRow style="width: 100%" class="mt-13 ml-1" align="center">
        <VCol cols="12" class="d-flex justify-space-between">
          <VBtn
            target="_blank"
            icon
            href="tel:05382238288"
            size="x-large"
            variant="tonal"
            color="#FFA500"
          >
            <VIcon icon="mdi-phone" />
          </VBtn>
          <VBtn
            target="_blank"
            icon
            href="https://www.instagram.com/hardalburger/"
            size="x-large"
            variant="tonal"
            color="#FF6600"
          >
            <VIcon icon="mdi-instagram" />
          </VBtn>
          <VBtn
            target="_blank"
            icon
            href="https://www.facebook.com/people/Hardal/100039949007340/"
            size="x-large"
            variant="tonal"
            color="#FF4500"
          >
            <VIcon icon="mdi-facebook" />
          </VBtn>

          <VBtn
            target="_blank"
            icon
            href="https://twitter.com/hardalburger"
            size="x-large"
            variant="tonal"
            color="#FF3300"
          >
            <VIcon icon="mdi-twitter" />
          </VBtn>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
