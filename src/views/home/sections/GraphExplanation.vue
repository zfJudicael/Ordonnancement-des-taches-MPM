<template>
    <section class="graph_explanation">
        <h2>Comprendre le diagramme MPM</h2>

        <p>Le diagramme MPM (Méthode des Potentiels Métra) permet de représenter les tâches d’un projet et leurs dépendances sous forme de graphe.</p>

        <img :src="StaticFiles.mpmGraphCaptioned" alt="Diagramme" class="diagram" :draggable="false">

        <Accordion value="0">
            <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
                <AccordionHeader>{{ tab.title }}</AccordionHeader>
                <AccordionContent>
                    <p style="margin: 0;">{{ tab.content }}</p>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </section>
</template>

<script setup lang="ts">
import { StaticFiles } from '@/const/staticFiles';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { ref } from 'vue';

const tabs = ref([
    { 
        title: 'Une tâche', 
        content: 'Une activité à réaliser dans le projet, avec une durée et éventuellement des dépendances.', 
        value: '0' 
    },
    { 
        title: 'Date de début au plus tôt', 
        content: 'Le moment le plus tôt où une tâche peut commencer, en respectant les dépendances.', 
        value: '1' 
    },
    { 
        title: 'Date de début au plus tard', 
        content: 'Le moment le plus tard où une tâche peut commencer sans retarder le projet.', 
        value: '2' 
    },
    { 
        title: 'Marge de retard', 
        content: 'Le temps pendant lequel une tâche peut être retardée sans retarder la fin du projet. (marge = 0 : tâche critique, marge > 0 : tâche flexible)', 
        value: '3' 
    },
    { 
        title: 'Chemin critique', 
        content: 'La suite de tâches qui détermine la durée totale du projet.', 
        value: '4' 
    },
    { 
        title: 'Durée minimale du projet', 
        content: 'Le temps minimum nécessaire pour terminer le projet.', 
        value: '5' 
    }
]);
</script>

<style lang="scss">
.graph_explanation{
    margin: 70px 0;

    .diagram{
        display: block;
        margin: 20px auto;
        width: 100%;
    }
}

@media (min-width: 768px) {
    .graph_explanation{
        margin: 100px 0;
        
        .diagram{
            margin: 40px auto;
            width: 80%;
        }
    }
}
</style>