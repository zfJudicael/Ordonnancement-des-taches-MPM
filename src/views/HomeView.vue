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
          <button>Commencer un projet</button>
          <button>Voir exemple</button>
        </div>
      </div>

      <div class="image">
        <img src="/src/assets/images/01.jpeg" alt="diagramme">
      </div>
    </section>


    <section class="features">
      <h2>Les fonctionnalités?</h2>
      <div class="feature">
        <h3>Créer vos tâches</h3>
        <p>Ajoutez les tâches de votre projet et définissez leurs dépendances.</p>
      </div>

      <div class="feature">
        <h3>Visualiser le diagramme</h3>
        <p>Votre projet est automatiquement transformé en diagramme clair.</p>
      </div>

      <div class="feature">
        <h3>Identifier le chemin critique</h3>
        <p>Repérez les tâches essentielles qui déterminent la durée du projet.</p>
      </div>

      <div class="feature">
        <h3>Exporter votre diagramme</h3>
        <p>Téléchargez votre planification en image.</p>
      </div>

    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.home_view{
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 40px;

  .hero{
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .text{
      padding: 20px 40px;
      display: flex;
      justify-content: center;
      flex-direction: column;

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
        // height: initial;
      }
    }
  }

  .features{
    display: grid;
    gap: 40px;
    grid-template-columns: repeat(2, 1fr);

    .feature{
      padding: 30px;
      border: 0.5px solid gray;

      h3{
        margin: 0;
      }
    }
  }
}
</style>