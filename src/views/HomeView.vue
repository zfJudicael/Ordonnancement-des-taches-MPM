<template>
  <div class="home_view">
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
        <img src="/src/assets/images/01.jpeg" alt="diagramme">
      </div>
    </section>


    <section class="features_section">
      <h2>Fonctionnalités</h2>
      <p>Tous les outils dont vous avez besoin pour gérer vos projets efficacement</p>

      <div class="features">
        <div class="feature">
          <i class="pi pi-sitemap"></i>
          <h3>Graphe MPM</h3>
          <p>Visualisez votre projet sous forme de graphe grâce à la méthode des potentiels Métra.</p>
        </div>

        
        <div class="feature">
          <i class="pi pi-bolt"></i>
          <h3>Chemin critique</h3>
          <p>Identifiez automatiquement le chemin critique de votre projet pour mieux repérer les tâches essentielles qui déterminent la durée de votre projet.</p>
        </div>
        
        <div class="feature">
          <i class="pi pi-list"></i>
          <h3>Gestion des tâches</h3>
          <p>Gérez facilement vos tâches, leurs durées et leurs dépendances dans une interface intuitive.</p>
        </div>

        <div class="feature">
          <i class="pi pi-calendar-clock"></i>
          <h3>Marge des tâches</h3>
          <p>Réperez les tâches qui peuvent être retardées sans impacter la fin du projet.</p>
        </div>
  
        <div class="feature">
          <i class="pi pi-download"></i>
          <h3>Exportat du diagramme</h3>
          <p>Téléchargez votre diagramme  pour le partager facilement.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'primevue';
</script>

<style lang="scss">
.home_view{
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 20px;

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

  .features{
    display: grid;
    gap: 10px;

    .feature{
      padding: 10px;
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

        i{
          color: blue;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .home_view{
    padding: 40px;

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

      .features{
        display: grid;
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