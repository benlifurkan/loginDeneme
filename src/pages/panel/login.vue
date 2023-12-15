<script lang="ts" setup>
import { onBeforeMount, reactive } from "vue";
import { useRouter } from "vue-router";
import { authStore } from "@/store/auth";
import { toast } from "vue-sonner";
import { axios } from "@/store/api";

const router = useRouter();

const loading = reactive({
  login: false,
  register: false,
});

const user = reactive({
  login: {
    username: "",
    email: "",
    phone: "",
    password: "",
  },
  register: {
    username: "",
    email: "",
    phone: "",
    password: "",
  },
});

onBeforeMount(() => {
  if (authStore.value.isLoggedIn) router.push("/panel");
});

const handleSubmit = async () => {
  if (
    !user.login.username ||
    !user.login.password ||
    !user.login.email ||
    !user.login.phone
  )
    return toast.error("Lütfen bilgilerinizi kontrol edin");

  loading.login = true;

  const response = await axios
    .post("/users/login", {
      username: user.login.username,
      email: user.login.email,
      phone: user.login.phone,
      password: user.login.password,
    })
    .catch(() => {});

  loading.login = false;

  if (response?.status !== 200)
    return toast.error("Kullanıcı adınız veya şifreniz hatalı");

  authStore.value.isLoggedIn = true;
  toast.success("Giriş yapıldı");
  router.push("/panel");
};

const handleRegister = async () => {
  if (
    !user.register.username ||
    !user.register.password ||
    !user.register.email
  )
    return toast.error("Lütfen bilgilerinizi kontrol edin");

  loading.register = true;

  const response = await axios
    .post("/users/register", {
      username: user.register.username,
      email: user.register.email,
      phone: user.register.phone,
      password: user.register.password,
    })
    .catch(() => {});

  loading.register = false;

  if (response?.status !== 200) return toast.error("Hesabınız oluşturulamadı");

  toast.success("Hesabınız başarıyla oluşturuldu, giriş yapabilirsiniz");
};
</script>

<template>
  <VRow class="mt-12">
    <VCol cols="12" lg="6">
      <h3 class="font-weight-bold mb-4">Giriş Yap</h3>

      <VForm width="300" @submit.prevent="handleSubmit">
        <VTextField
          v-model="user.login.email"
          label="Email"
          variant="outlined"
        />

        <VTextField
          v-model="user.login.password"
          label="Şifre"
          variant="outlined"
          type="password"
        />

        <VBtn
          type="submit"
          variant="tonal"
          color="error"
          prepend-icon="mdi-login"
          :loading="loading.login"
        >
          Giriş Yap
        </VBtn>
      </VForm>
    </VCol>

    <VCol cols="12" lg="6">
      <h3 class="font-weight-bold mb-4">Kayıt Ol</h3>

      <VForm width="300" @submit.prevent="handleRegister">
        <VTextField
          v-model="user.register.phone"
          label="Telefon Numarası"
          variant="outlined"
          type="number"
        />

        <VTextField
          v-model="user.register.email"
          label="E-mail"
          variant="outlined"
          type="mail"
        />

        <VTextField
          v-model="user.register.password"
          label="Şifre"
          variant="outlined"
          type="password"
        />

        <VBtn
          type="submit"
          variant="text"
          color="error"
          prepend-icon="mdi-login"
          :loading="loading.register"
        >
          Kayıt Ol
        </VBtn>
      </VForm>
    </VCol>
  </VRow>
</template>
