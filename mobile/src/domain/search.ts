import { areaById, areasInCity, services, workers } from '@/domain/catalog';
import { localize, type Locale } from '@/domain/types';

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function searchMarketplace(query: string, locale: Locale, cityId: string) {
  const needle = normalize(query);
  const cityWorkers = workers.filter((worker) => areaById(worker.areaId)?.cityId === cityId);
  const cityAreas = areasInCity(cityId);

  if (!needle) {
    return { services, workers: cityWorkers };
  }

  const matchedServices = services.filter((service) =>
    normalize(`${localize(service.name, locale)} ${localize(service.summary, locale)}`).includes(
      needle,
    ),
  );
  const matchedServiceIds = new Set(matchedServices.map((service) => service.id));
  const matchedAreaIds = new Set(
    cityAreas
      .filter((area) => normalize(localize(area.name, locale)).includes(needle))
      .map((area) => area.id),
  );

  const matchedWorkers = cityWorkers.filter((worker) => {
    const nameMatches = normalize(localize(worker.name, locale)).includes(needle);
    const areaMatches = matchedAreaIds.has(worker.areaId);
    const serviceMatches = worker.serviceIds.some((serviceId) => matchedServiceIds.has(serviceId));

    return nameMatches || areaMatches || serviceMatches;
  });

  return { services: matchedServices, workers: matchedWorkers };
}
