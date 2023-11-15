<template>
  <UContainer class="py-10">
    <UCard>
      <template #header>
        <div class="flex flex-col gap-2 md:flex-row justify-between">
          <h1>Payet | Administrador de finanzas</h1>
          <div class="flex items-center gap-2">
            Tema:
            <ColorScheme>
              <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
            </ColorScheme>
          </div>
        </div>
      </template>
      <ServicesAdd />
    </UCard>
    <UtilsServices />
    <UtilsServicesDone />
  </UContainer>
</template>

<script setup lang="ts">
useHead({
  title: 'Payet | Administrador de finanzas',
  meta: [
    { name: 'description', content: 'Administrador de finanzas' }
  ]
})
</script>
