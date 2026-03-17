<template>
    <section class="graph_explanation">
        <h2>Comprendre le diagramme MPM</h2>

        <p>Le diagramme MPM (Méthode des Potentiels Métra) permet de représenter les tâches d’un projet et leurs dépendances sous forme de graphe.</p>

        <img :src="StaticFiles.mpmGraphCaptioned" alt="Diagramme" class="diagram" :draggable="false">

    </section>
</template>

<script setup lang="ts">
import { StaticFiles } from '@/const/staticFiles';
</script>

<style lang="scss">
.graph_explanation{
    .diagram{
        display: block;
        margin: 20px auto;
        width: 100%;
    }
}

@media (min-width: 768px) {
    .graph_explanation{
        .diagram{
            width: 80%;
        }
    }
}
</style>