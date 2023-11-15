<template>
    <UForm :validate="validate" :state="state" class="flex flex-col md:flex-row gap-2 w-full" @submit="onSubmit">

        <UFormGroup label="Nombre del servicio" type="text" name="name">
            <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="A pagar" name="quantity">
            <UInput v-model="state.quantity" type="number" icon="i-heroicons-currency-dollar-20-solid" />
        </UFormGroup>

        <UFormGroup label="Fecha" name="date">
            <UInput v-model="state.date" type="date" icon="i-heroicons-calendar-days-20-solid" />
        </UFormGroup>

        <UButton type="submit" size="xl" class="w-full md:w-auto text-center flex items-center justify-center h-8 mt-6">
            Agregar
        </UButton>
    </UForm>
</template>

<script setup lang="ts">
import type { FormError } from '#ui/types'
import type { Service } from '~/types'

const state = reactive({
    name: '',
    quantity: 0,
    date: ''
})

const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.name) errors.push({ path: 'name', message: 'Required' })
    if (!state.quantity) errors.push({ path: 'quantity', message: 'Required' })
    if (!state.date) errors.push({ path: 'date', message: 'Required' })
    return errors
}

async function onSubmit() {
    let data: Service = {
        name: state.name,
        quantity: state.quantity,
        done: false,
        date: state.date
    }

    addService(data)

    state.date = ''
    state.name = ''
    state.quantity = 0
}
</script>
