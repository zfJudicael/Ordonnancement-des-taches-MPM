<template>
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
</template>

<style lang="scss">
.features_section{
  margin: 70px 0;

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