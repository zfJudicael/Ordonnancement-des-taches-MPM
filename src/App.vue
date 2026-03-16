<template>
  <main>
    <RouterView/>
    
    <ConfirmDialog></ConfirmDialog>
    <Toast position="bottom-right"></Toast>
  </main>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
</script>