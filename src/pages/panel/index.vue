<script lang="ts" setup>
import { onBeforeMount, reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { authStore } from "@/store/auth";
import { axios } from "@/store/api";
import { useFetch } from "@vueuse/core";
import { toast } from "vue-sonner";

const router = useRouter();
const isLoading = ref(false);

const {
  data: menus,
  isFetching,
  execute,
} = useFetch<string>("https://qr-api.furkanbenli33.workers.dev/menus");

const {
  data: foods,
  isFetching: fetchingFoods,
  execute: executeFoods,
} = useFetch<string>("https://qr-api.furkanbenli33.workers.dev/foods");

const details = reactive({
  menu: {
    name: "",
    image: "",
    description: "",
  },
  food: {
    menu: "",
    name: "",
    description: "",
    price: null as number | null,
    image: "",
  },
  deleteFood: {
    menu: "",
    food: "",
  },
  deleteMenu: "",
});

onBeforeMount(() => {
  if (!authStore.value.isLoggedIn) router.push("/panel/login");
});

const handleSubmit = async (type: "menu" | "food") => {
  if (type === "menu") {
    isLoading.value = true;

    const response = await axios
      .post("/menus", {
        ...details.menu,
        id: crypto.randomUUID(),
      })
      .catch(() => {});

    isLoading.value = false;

    if (response?.status !== 200) return toast.error("Menü oluşturulamadı");

    details.menu.name = "";
    details.menu.image = "";
    details.menu.description = "";

    execute();
    toast.success("Menü başarıyla eklendi!");
  } else if (type === "food") {
    isLoading.value = true;

    const response = await axios
      .post("/foods", {
        ...details.food,
        id: crypto.randomUUID(),
      })
      .catch(() => {});

    isLoading.value = false;

    if (response?.status !== 200) return toast.error("Yiyecek oluşturulamadı");

    details.food.menu = "";
    details.food.name = "";
    details.food.description = "";
    details.food.price = null;
    details.food.image = "";

    executeFoods();
    toast.success("Yiyecek başarıyla eklendi!");
  }
};

const handleDelete = async (type: "menu" | "food") => {
  if (type === "menu") {
    isLoading.value = true;

    const response = await axios
      .delete(`/menus/${details.deleteMenu}`)
      .catch(() => {});

    isLoading.value = false;

    if (response?.status !== 200) return toast.error("Menü silinemedi");

    if (details.food.menu === details.deleteMenu) details.food.menu = "";
    details.deleteMenu = "";

    execute();
    toast.success("Menü başarıyla silindi!");
  } else if (type === "food") {
    isLoading.value = true;

    const response = await axios
      .delete(`/foods/${details.deleteFood.food}`)
      .catch(() => {});

    isLoading.value = false;

    if (response?.status !== 200) return toast.error("Yiyecek silinemedi");

    details.deleteFood.menu = "";
    details.deleteFood.food = "";

    executeFoods();
    toast.success("Yiyecek başarıyla silindi!");
  }
};

const getParsedMenus = computed<{ title: string; value: string }[]>(() => {
  return menus.value && typeof menus.value === "string"
    ? JSON.parse(menus.value).map((menu: { name: string; id: string }) => ({
        title: menu.name,
        value: menu.id,
      }))
    : [];
});

const getParsedFoods = computed<{ title: string; value: string }[]>(() => {
  return foods.value && typeof foods.value === "string"
    ? JSON.parse(foods.value)
        .filter(
          (food: { menu: string }) => food.menu === details.deleteFood.menu
        )
        .map((menu: { name: string; id: string }) => ({
          title: menu.name,
          value: menu.id,
        }))
    : [];
});
</script>

<template>
  <VRow>
    <VCol cols="12" lg="6">
      <h3 class="font-weight-bold text-h5 mb-6">Menü Ekle</h3>

      <VForm @submit.prevent="handleSubmit('menu')">
        <VTextField
          v-model="details.menu.image"
          variant="outlined"
          density="compact"
          prepend-icon=""
          label="Menü Resmi"
          placeholder="https://site.com/resim.jpg"
          required
        />

        <VTextField
          v-model="details.menu.name"
          variant="outlined"
          density="compact"
          label="Menü İsmi"
          required
        />

        <VTextField
          v-model="details.menu.description"
          variant="outlined"
          density="compact"
          label="Menü Açıklaması"
          required
        />

        <VBtn
          type="submit"
          :disabled="!details.menu.name || !details.menu.image"
          color="primary"
          variant="tonal"
          prepend-icon="mdi-plus"
          :loading="isLoading"
        >
          Ekle
        </VBtn>
      </VForm>
    </VCol>

    <VCol cols="12" lg="6">
      <h3 class="font-weight-bold text-h5 mb-6">Yiyecek/İçecek Ekle</h3>

      <VForm @submit.prevent="handleSubmit('food')">
        <VSelect
          v-model="details.food.menu"
          variant="outlined"
          density="compact"
          label="Menü Seç"
          :loading="isFetching"
          :items="getParsedMenus"
          no-data-text="Menü bulunamadı"
          required
        />

        <VTextField
          v-model="details.food.image"
          variant="outlined"
          density="compact"
          prepend-icon=""
          label="Yiyecek/İçecek Resmi"
          placeholder="https://site.com/resim.jpg"
          required
        />

        <VTextField
          v-model="details.food.name"
          variant="outlined"
          density="compact"
          label="Yiyecek/İçecek İsmi"
          required
        />

        <VTextField
          v-model="details.food.description"
          variant="outlined"
          density="compact"
          label="Açıklama"
        />

        <VTextField
          v-model.number="details.food.price"
          type="number"
          variant="outlined"
          density="compact"
          label="Fiyat"
          required
        >
          <template #append-inner>
            <span class="text-caption">TL</span>
          </template>
        </VTextField>

        <VBtn
          type="submit"
          :disabled="
            !details.food.name || !details.food.image || !details.food.price
          "
          color="primary"
          variant="tonal"
          prepend-icon="mdi-plus"
          :loading="isLoading"
        >
          Ekle
        </VBtn>
      </VForm>
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="12" lg="6">
      <h3 class="font-weight-bold text-h5 mb-6">Menü Sil</h3>

      <VForm @submit.prevent="handleDelete('menu')">
        <VSelect
          v-model="details.deleteMenu"
          variant="outlined"
          density="compact"
          label="Menü Seç"
          :loading="isFetching"
          :items="getParsedMenus"
          no-data-text="Menü bulunamadı"
          clearable
          required
        />

        <VBtn
          type="submit"
          color="error"
          variant="tonal"
          prepend-icon="mdi-delete"
          :disabled="!details.deleteMenu"
          :loading="isLoading"
        >
          Sil
        </VBtn>
      </VForm>
    </VCol>

    <VCol cols="12" lg="6">
      <h3 class="font-weight-bold text-h5 mb-6">Yiyecek/İçecek Sil</h3>

      <VForm @submit.prevent="handleDelete('food')">
        <VSelect
          v-model="details.deleteFood.menu"
          variant="outlined"
          density="compact"
          label="Menü Seç"
          :loading="isFetching"
          :items="getParsedMenus"
          clearable
          no-data-text="Menü bulunamadı"
          required
          @update:model-value="details.deleteFood.food = ''"
        />

        <VSelect
          v-model="details.deleteFood.food"
          variant="outlined"
          density="compact"
          label="Yiyecek/İçecek Seç"
          :loading="fetchingFoods"
          :items="getParsedFoods"
          :disabled="!details.deleteFood.menu"
          clearable
          no-data-text="Yiyecek/İçecek bulunamadı"
          required
        />

        <VBtn
          type="submit"
          color="error"
          variant="tonal"
          prepend-icon="mdi-delete"
          :disabled="!details.deleteFood.food"
          :loading="isLoading"
        >
          Sil
        </VBtn>
      </VForm>
    </VCol>
  </VRow>
</template>
