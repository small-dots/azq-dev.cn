<script setup>
import { toggleDark } from "~/logics";
</script>

<template>
  <a class="select-none" title="Toggle Color Scheme" @click="toggleDark">
    <div class="dark i-ri-moon-line i-ri-sun-line " />
  </a>
</template>
