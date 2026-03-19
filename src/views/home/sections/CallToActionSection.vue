<template>
    <section class="call_to_action">
        <Button aria-label="Commencer un projet" size="large" class="btn"
            @click="$router.push({name: 'project', query: {
                isExample: '0'
            }})"
        >
            <span>Plannifier votre projet</span>
            <i class="pi pi-arrow-right"></i>
        </Button>
    </section>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
</script>

<style lang="scss">
.call_to_action{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-color: white;

    .btn{
        gap: 20px;
    }
}
</style>