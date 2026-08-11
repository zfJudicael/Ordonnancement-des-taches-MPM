<template>
    <section class="hero">
        <div class="text">
            <h1>Planifiez vos projets avec la méthode MPM</h1>
            
            <p>Project Planner MPM vous aide à planifier et analyser vos projets grâce à la méthode des Potentiels Métra. Visualisez les tâches et leurs dépendances, identifiez le chemin critique et optimisez votre planning.</p>
            
            <div class="buttons">
                <Button aria-label="Créer un projet avec la méthode MPM" class="start" raised size="medium"
                    @click="$router.push({name: 'project', query: {
                    isExample: '0'
                    }})"
                >
                    <span>Créer un projet</span>
                    <i class="pi pi-arrow-right"></i>
                </Button>
                
                <Button label="Voir un exemple" severity="secondary" variant="text" raised size="medium"
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
            gap: 4px;
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