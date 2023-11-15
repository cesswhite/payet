<template>
    <UCard class="mt-10">
        <template #header>
            <div class="flex justify-between">
                <h1>Pagos terminados y/o pagados</h1>
            </div>
        </template>
        <UTable :columns="columns" :rows="getDoneServices">
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
                        Marcar como no pagado
                    </UButton>
                </div>
            </template>
        </UTable>
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