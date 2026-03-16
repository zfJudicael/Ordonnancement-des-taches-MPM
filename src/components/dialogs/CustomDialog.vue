<template>
    <Dialog v-model:visible="isVisible" modal close-on-escape :header="$props.header" :style="{ width: '30rem' }">
        <form @submit.prevent="$emit('submit')">
            
            <slot />

            <Divider />
            
            <div style="display: flex; gap: 5px; justify-content: end;">
                <Button type="submit" icon="pi pi-check" severity="info" raised label="Confirmer"/>
                <Button icon="pi pi-times" severity="danger" @click="isVisible = false" raised label="Annuler"/>
            </div>
        </form>
    </Dialog>
</template>

<script setup lang="ts">
import { Dialog } from 'primevue';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

const isVisible = defineModel('isVisible', { type: Boolean, required: true })

defineEmits(["submit"])

defineProps<{
    header: string
}>()
</script>