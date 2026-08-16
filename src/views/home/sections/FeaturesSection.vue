<template>
    <section class="features_section" ref="featuresSection">
      <h2>Fonctionnalités</h2>
      <p>Tous les outils dont vous avez besoin pour gérer vos projets efficacement</p>

      <div class="features">
         <motion.div
          class="feature"
          v-for="(feature, index) in featuresData"
          :key="index"
          :initial="{ y: 30 }"
          :whileInView="{ y: 0 }"
          :transition="{ duration: 0.3, delay: index * 0.12, ease: 'easeInOut' }"
          :inViewOptions="{ once: true }"
        >
          <i :class="`pi ${feature.icon}`"></i>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </motion.div>
      </div>

    </section>
</template>

<script setup lang="ts">
import { motion } from "motion-v";

const featuresData = [
  {
    icon: 'pi-sitemap',
    title: 'Graphe MPM',
    description: 'Visualisez votre projet sous forme de graphe grâce à la méthode des potentiels Métra.'
  },
  {
    icon: 'pi-bolt',
    title: 'Chemin critique',
    description: 'Identifiez automatiquement le chemin critique de votre projet pour mieux repérer les tâches essentielles qui déterminent la durée de votre projet.'
  },
  {
    icon: 'pi-list',
    title: 'Gestion des tâches',
    description: 'Gérez facilement vos tâches, leurs durées et leurs dépendances dans une interface intuitive.'
  },
  {
    icon: 'pi-calendar-clock',
    title: 'Marge des tâches',
    description: 'Repérez les tâches qui peuvent être retardées sans impacter la fin de votre projet.'
  },
  {
    icon: 'pi-download',
    title: 'Export du diagramme',
    description: 'Téléchargez votre diagramme pour le partager facilement.'
  }
]
</script>

<style lang="scss">
.features_section{
  margin: 70px 0;

  .features{
      display: grid;
      gap: 10px;
  
      .feature{
        padding: 20px;
        border: 1px solid rgba(0,0,0,0.1);
        background-color: white;
        border-radius: 10px;
        transition: all 0.5s;
  
        i{
          transition: all 0.5s;
          font-size: 2rem;
        }
  
        h3{
          margin: 15px 0;
          transition: all 0.5s;
        }
  
        p{
          color: rgb(97, 97, 97);
          font-size:medium;
          line-height: 1.5;
        }
  
        &:hover{
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }

        &:nth-of-type(1){
          i{
            color: blue;
          }
        }

        &:nth-of-type(2){
          i{
            color: red;
          }
        }

        &:nth-of-type(3){
          i{
            color: green;
          }
        }

        &:nth-of-type(4){
          i{
            color: gray;
          }
        }

        &:nth-of-type(5){
          i{
            color: purple;
          }
        }
      }
  }
}


@media (min-width: 768px) {
  .features_section{
    margin: 100px 0;
    
    .features{
        gap: 20px;
        grid-template-columns: repeat(3, 1fr);

        .feature{
          padding: 30px;

          i{
            font-size: 2.5rem;
          }

          h3{
            margin: 15px 0;
          }

          p{
            line-height: 1.5;
          }
        }
    }
  }
}
</style>