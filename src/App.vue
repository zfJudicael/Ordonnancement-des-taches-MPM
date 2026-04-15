<template>
  <main>
    <RouterView/>
    
    <ConfirmDialog></ConfirmDialog>
    <Toast position="bottom-right"></Toast>
    <Analytics />
  </main>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import { Analytics } from '@vercel/analytics/vue';
</script>