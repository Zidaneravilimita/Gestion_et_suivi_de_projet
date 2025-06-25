<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Tableau de Bord</h1>

    <!-- Section Utilisateur -->
    <section>
      <h2 class="text-xl font-semibold">Gestion des Utilisateurs</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <UserProfileCard />
        <RoleManager />
      </div>
    </section>

    <!-- Section Projets -->
    <section>
      <h2 class="text-xl font-semibold">Gestion des Projets</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <ProjectList />
        <ProjectSummary />
      </div>
    </section>

    <!-- Section Tâches -->
    <section>
      <h2 class="text-xl font-semibold">Gestion des Tâches</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <TaskBoard />
        <TaskFilters />
      </div>
    </section>

    <!-- Section Reporting -->
    <section>
      <h2 class="text-xl font-semibold">Reporting & Visualisation</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <UserTaskOverview />
        <SimpleChart />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Ajoutez ici un style personnalisé si besoin */
</style>
