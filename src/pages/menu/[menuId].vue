<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useFetch } from "@vueuse/core";
import slugify from "slugify";

const route = useRoute();

const { data: foods, isFetching } = useFetch<{ name: string; image: string }[]>(
  "https://qr-api.furkanbenli33.workers.dev/foods"
);

const { data: menus, isFetching: isFoodsFetching } = useFetch<
  { name: string; image: string }[]
>("https://qr-api.furkanbenli33.workers.dev/menus");

const getMenuProperties = computed(() => {
  return menus.value && typeof menus.value === "string"
    ? JSON.parse(menus.value).find(
        (menu: { id: string; name: string }) =>
          menu.id === (route.params as { menuId: string }).menuId ||
          slugify(menu.name, {
            lower: true,
          }) === (route.params as { menuId: string }).menuId
      )
    : null;
});

const getFilteredFoods = computed(() => {
  if (!getMenuProperties.value) return [];

  return foods.value && typeof foods.value === "string"
    ? JSON.parse(foods.value).filter(
        (i: { menu: string }) => i.menu === getMenuProperties.value.id
      )
    : [];
});
</script>

<template>
  <VRow>
    <span v-if="isFetching || isFoodsFetching" class="mx-3 text-disabled">
      Yükleniyor...
    </span>

    <template v-else-if="getMenuProperties">
      <VCol cols="12">
        <VCardTitle class="font-weight-bold px-0">
          {{ getMenuProperties.name }}
        </VCardTitle>

        <p v-if="getMenuProperties.description" class="text-disabled">
          {{ getMenuProperties.description }}
        </p>
      </VCol>

      <span
        v-if="getFilteredFoods.length === 0"
        class="mx-3 mt-4 text-disabled"
      >
        Bu menüye henüz herhangi bir yiyecek eklenmemiş.
      </span>

      <VCol
        v-for="food in getFilteredFoods"
        :key="food.name"
        cols="6"
        md="4"
        lg="3"
      >
        <VCard v-if="food" flat>
          <VImg
            :src="food.image"
            cover
            :height="$vuetify.display.smAndDown ? 175 : 250"
          >
            <VChip
              color="error"
              prepend-icon="mdi-currency-try"
              variant="flat"
              class="ma-4"
            >
              {{ food.price }} TL
            </VChip>
          </VImg>

          <VCardText class="px-0">
            <h3 class="font-weight-bold text-h6">
              {{ food.name }}
            </h3>

            <span
              v-if="food.description"
              class="text-disabled d-block text-sm mt-2"
            >
              {{ food.description }}
            </span>
          </VCardText>
        </VCard>
      </VCol>
    </template>
  </VRow>
</template>
