<template>
    <UCard class="mt-10">
        <UTable :columns="columns" :rows="getUndoneServices">
            <template #id-data="{ index }">
                <span>{{ index + 1 }}</span>
            </template>
            <template #quantity-data="{ row }">
                <span>$ {{ row.quantity }}</span>
            </template>
            <template #actions-data="{ row }">
                <div class="flex flex-col gap-1">
                    <UButton @click="onDoneService(row)" type="button" color="green" size="sm"
                        class="w-full text-center flex items-center justify-center">
                        Marcar como pagado
                    </UButton>
                    <UButton @click="removeService(row)" type="button" color="red" size="sm"
                        class="w-full text-center flex items-center justify-center">
                        Remover
                    </UButton>
                </div>
            </template>
        </UTable>
        <template #footer>
            Total a pagar $ {{ total }}
        </template>
    </UCard>
</template>

<script setup lang="ts">

const columns = [{
    key: 'id',
    label: 'ID'
}, {
    key: 'name',
    label: 'Servicio'
}, {
    key: 'quantity',
    label: 'Cantidad a pagar'
}, {
    key: 'date',
    label: 'Fecha'
}, {
    key: 'actions'
}]
</script>