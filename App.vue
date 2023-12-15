<script lang="ts" setup>
import { Toaster } from "vue-sonner";
import { ref, onMounted } from "vue";

const body=document.querySelector("body");

// ...
function App() {
  return (
    <div>
      <Toaster />
    </div>
  );
</script>

<template>
  <Toaster rich-colors />
</template>
