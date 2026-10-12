import type { Service } from "~/types";

export const useServices = () => {
  // Nuxt isolates this empty state per server request. Browser storage is
  // restored only after hydration by the client plugin.
  const services = useState<Service[]>("payet-services", () => []);

  const addService = (service: Service) => {
    services.value.push(service);
  };

  const removeService = (service: Service) => {
    services.value = services.value.filter((s) => s !== service);
  };

  const onDoneService = (service: Service) => {
    const index = services.value.findIndex((s) => s === service);

    if (index !== -1) {
      services.value[index].done = !services.value[index].done;
    }
  };

  const getUndoneServices = computed(() => {
    return services.value.filter((service) => !service.done);
  });

  const getDoneServices = computed(() => {
    return services.value.filter((service) => service.done);
  });

  const total = computed(() => {
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

  return { services, addService, removeService, onDoneService, total, getUndoneServices, getDoneServices };
};
