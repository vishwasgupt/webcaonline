import { Service } from "@shared/schema";

export const serviceCategories = [
  "Tax Services",
  "Business Registration", 
  "Business License",
  "Intellectual Property",
  "Financial Services",
  "Digital Services",
  "Loan Services",
  "Insurance"
] as const;

export const serviceIcons = {
  "Income Tax Return Filing": "fas fa-file-invoice",
  "GST Registration": "fas fa-percentage",
  "GST Return Filing": "fas fa-receipt", 
  "Digital Signature Certificate": "fas fa-certificate",
  "MSME Registration (Udyam)": "fas fa-industry",
  "FSSAI Food License": "fas fa-utensils",
  "Shop and Establishment License": "fas fa-store",
  "Trademark Registration": "fas fa-trademark",
  "Company Registration": "fas fa-building",
  "Accounting Services": "fas fa-calculator",
  "Home Loan": "fas fa-home",
  "Insurance Services": "fas fa-shield-alt"
} as const;

export const getServicesByCategory = (services: Service[], category: string): Service[] => {
  return services.filter(service => service.category === category);
};

export const getPopularServices = (services: Service[]): Service[] => {
  const popularServiceIds = [
    "itr-filing",
    "gst-registration", 
    "company-registration",
    "trademark-registration",
    "digital-signature",
    "msme-registration"
  ];
  
  return services.filter(service => popularServiceIds.includes(service.id));
};

export const formatPrice = (price: string): string => {
  if (price.toLowerCase().includes('free') || price.toLowerCase().includes('varies')) {
    return price;
  }
  
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    return price;
  }
  
  return `₹${numericPrice.toLocaleString('en-IN')}`;
};

export const getProcessingTimeCategory = (processingTime: string): 'fast' | 'medium' | 'slow' => {
  const time = processingTime.toLowerCase();
  
  if (time.includes('1-2') || time.includes('2-3') || time.includes('same day')) {
    return 'fast';
  } else if (time.includes('3-5') || time.includes('5-7') || time.includes('1 week')) {
    return 'medium';
  } else {
    return 'slow';
  }
};

export const searchServices = (services: Service[], searchTerm: string): Service[] => {
  if (!searchTerm.trim()) {
    return services;
  }
  
  const term = searchTerm.toLowerCase();
  
  return services.filter(service => 
    service.name.toLowerCase().includes(term) ||
    service.description.toLowerCase().includes(term) ||
    service.category.toLowerCase().includes(term) ||
    service.features.some(feature => feature.toLowerCase().includes(term)) ||
    service.requiredDocuments.some(doc => doc.toLowerCase().includes(term))
  );
};

export const getServiceUrl = (serviceId: string): string => {
  return `/service/${serviceId}`;
};

export const getApplicationUrl = (serviceId: string): string => {
  return `/service/${serviceId}/apply`;
};

export const isServiceActive = (service: Service): boolean => {
  return service.isActive === "true";
};

export const getServiceDuration = (processingTime: string): number => {
  const match = processingTime.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
};

export const sortServicesByPrice = (services: Service[], direction: 'asc' | 'desc' = 'asc'): Service[] => {
  return [...services].sort((a, b) => {
    const priceA = parseFloat(a.price) || 0;
    const priceB = parseFloat(b.price) || 0;
    
    return direction === 'asc' ? priceA - priceB : priceB - priceA;
  });
};

export const sortServicesByDuration = (services: Service[], direction: 'asc' | 'desc' = 'asc'): Service[] => {
  return [...services].sort((a, b) => {
    const durationA = getServiceDuration(a.processingTime);
    const durationB = getServiceDuration(b.processingTime);
    
    return direction === 'asc' ? durationA - durationB : durationB - durationA;
  });
};

export const getRelatedServices = (currentService: Service, allServices: Service[], limit: number = 4): Service[] => {
  return allServices
    .filter(service => 
      service.id !== currentService.id && 
      service.category === currentService.category &&
      isServiceActive(service)
    )
    .slice(0, limit);
};

export const generateApplicationNumber = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `LEP${timestamp}${random}`;
};

export const validateServiceData = (service: Partial<Service>): string[] => {
  const errors: string[] = [];
  
  if (!service.name?.trim()) {
    errors.push("Service name is required");
  }
  
  if (!service.description?.trim()) {
    errors.push("Service description is required");
  }
  
  if (!service.category?.trim()) {
    errors.push("Service category is required");
  }
  
  if (!service.price?.trim()) {
    errors.push("Service price is required");
  }
  
  if (!service.processingTime?.trim()) {
    errors.push("Processing time is required");
  }
  
  if (!service.features?.length) {
    errors.push("At least one feature is required");
  }
  
  if (!service.requiredDocuments?.length) {
    errors.push("At least one required document must be specified");
  }
  
  if (!service.steps?.length) {
    errors.push("At least one process step is required");
  }
  
  return errors;
};
