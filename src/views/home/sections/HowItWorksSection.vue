<template>
    <section class="how_it_works">
      <h2>Comment ça fonctionne ? </h2>
      <p style="color: rgb(97, 97, 97);">Trois étapes simples pour planifier votre projet</p>

      <div class="steps">
        <div v-for="step in steps" :key="step.ordre" class="step">
            <div class="order">
                <p>{{ step.ordre }}</p>
            </div>
            <h3>{{ step.title }}</h3>
            <p class="text">{{ step.text }}</p>
        </div>

      </div>
    </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const steps = reactive<{ordre: number, title: string, text: string}[]>([
    {
        ordre: 1,
        title: "Créez votre projet",
        text: "Donnez un nom à votre projet."
    },
    {
        ordre: 2,
        title: "Définissez vos tâches",
        text: "Ajoutez les tâches de votre projet avec leurs durées et dépendances."
    },
    {
        ordre: 3,
        title: "Visualisez le graphe",
        text: "Le graph MPM est généré automatiquement."
    }
])
</script>

<style lang="scss">
.how_it_works{
    text-align: center;
    margin: 70px 0;
    cursor: default;

    .steps{
        margin: 30px 0;
        .step{            
            margin: 20px;
            display: flex;
            justify-content: start;
            flex-direction: column;
            align-items: center;

            .order{
                font-size: 2rem;
                font-weight: bold;
                width: 50px;
                height: 50px;
                border-radius: 100%;
                background-color: #10B981;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                
                p{
                    margin: 0;
                }
            }

            h3{
                margin: 10px;
            }

            .text{
                margin: 0;
                color: rgb(97, 97, 97);
            }
        }
    }
}

@media (min-width: 768px) {
    .how_it_works{
        margin: 100px 0;

        .steps{
            margin: 50px 0;
            display: flex;
            justify-content: space-between;
            .step{            
                flex: 1;
                margin: 30px;

                .order{
                    width: 60px;
                    height: 60px;
                }

                h3{
                    margin: 10px;
                }
            }
        }
    }
}
</style>