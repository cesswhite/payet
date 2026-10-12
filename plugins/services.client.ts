import { syncRef, useStorage } from "@vueuse/core";
import type { Service } from "~/types";

export default defineNuxtPlugin((nuxtApp) => {
  const { services } = useServices();

  nuxtApp.hook("app:mounted", () => {
    // Read the existing local records before synchronizing them into the
    // hydrated app. The server never reads or receives browser payment data.
    const storedServices = useStorage<Service[]>("services", []);
    syncRef(storedServices, services);
  });
});
