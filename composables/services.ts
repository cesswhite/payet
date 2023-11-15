import { useStorage } from "@vueuse/core";
import type { Service } from "~/types";

export const services = useStorage<Service[]>("services", []);

export const addService = (service: Service) => {
  services.value.push(service);
};

export const removeService = (service: Service) => {
  services.value = services.value.filter((s) => s !== service);
};

export const onDoneService = (service: Service) => {
  const index = services.value.findIndex((s) => s === service);

  if (index !== -1) {
    services.value[index].done = !services.value[index].done;
  }
};

export const total = computed(() => {
  return getUndoneServices.value.reduce((total, service) => {
    const quantityValue =
      typeof service.quantity === "string"
        ? parseFloat(service.quantity)
        : service.quantity;
    if (!isNaN(quantityValue) && typeof quantityValue === "number") {
      return total + quantityValue;
    } else {
      console.error("Invalid quantity:", service.quantity);
      return total;
    }
  }, 0);
});

export const getUndoneServices = computed(() => {
  return services.value.filter((service) => !service.done);
});

export const getDoneServices = computed(() => {
  return services.value.filter((service) => service.done);
});
