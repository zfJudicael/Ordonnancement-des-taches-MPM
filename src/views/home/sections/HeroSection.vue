<template>
    <section class="hero">
        <div class="text">
            <h1>Planifiez vos projets facilement</h1>
            
            <p>Cette plateforme vous aide à organiser et planifier vos tâches
            grâce à la méthode MPM (Méthode des Potentiels Métra).
            Visualisez votre projet, identifiez le chemin critique
            et optimisez votre planning.
            </p>
            
            <div class="buttons">
            <Button aria-label="Commencer un projet" class="start" raised
                @click="$router.push({name: 'project', query: {
                isExample: '0'
                }})"
            >
                <span>Commencer un projet</span>
                <i class="pi pi-arrow-right"></i>
            </Button>
            
            <Button label="Voir exemple" severity="secondary" variant="text" raised
                @click="$router.push({name: 'project', query: {
                isExample: '1'
                }})"
            />
            </div>
        </div>

        <div class="image">
            <img :src="StaticFiles.mpmGraph" alt="diagramme">
        </div>
    </section>
</template>

<script setup lang="ts">
import { Button } from 'primevue';
import { StaticFiles } from '@/const/staticFiles';
</script>

<style lang="css">
.hero{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;

    
    .text{
        p{
            line-height: 1.5;
        }

        .buttons{
            display: flex;
            gap: 6px;
        }
    }

    .image{
        display: flex;
        align-items: center;

        img{
            width: 100%;
        }
    }
}

@media (min-width: 768px) {
    .hero{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: 0;

        .text{
          padding: 0 10% 40px 0;
          display: flex;
          justify-content: center;
          flex-direction: column;

          p{
            line-height: 1.5;
          }

          .buttons{
            display: flex;
            gap: 6px;

            .start{
              gap: 40px;
            }
          }
        }

        .image{
          display: flex;
          align-items: center;
          img{
            width: 100%;
            height: initial;
          }
        }
    }
}
</style>