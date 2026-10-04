import services from "@/data/services.json";
import { PROFILE } from "@/app/constants";

export type ServiceOption = {
  value: string;
  label: string;
};

function deriveServiceValue(link: string, name: string): string {
  return new URL(link, PROFILE.websiteCanonicalUrl).searchParams.get("type") ?? name.toLowerCase();
}

export function getServiceOptions(): ServiceOption[] {
  return services.map((service) => ({
    value: deriveServiceValue(service.link, service.name),
    label: service.name,
  }));
}

export function getServiceLabelMap(): Map<string, string> {
  return new Map(getServiceOptions().map((option) => [option.value, option.label]));
}
