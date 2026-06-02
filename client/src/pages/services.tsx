import { useQuery } from "@tanstack/react-query";
import ServiceCard from "@/components/ui/service-card";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@shared/schema";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const categories = Array.from(new Set(services?.map(service => service.category) || []));

  const filteredServices = services?.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
  <div className="min-h-screen py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-services-title">
            Our Complete Service Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-services-description">
            Browse our comprehensive range of legal, tax, and business services designed to meet all your compliance needs.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-64" data-testid="select-category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="h-64 animate-pulse">
                <CardContent className="p-6">
                  <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 rounded mb-4"></div>
                  <div className="bg-gray-200 h-8 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredServices?.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl text-muted-foreground mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2" data-testid="text-no-services">No services found</h3>
            <p className="text-muted-foreground" data-testid="text-no-services-description">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <>
            {/* Group services by category */}
            {categories.filter(category => 
              categoryFilter === "all" || category === categoryFilter
            ).map(category => {
              const categoryServices = filteredServices?.filter(service => service.category === category);
              if (!categoryServices?.length) return null;

              return (
                <div key={category} className="mb-16">
                  <h2 className="text-2xl font-bold text-foreground mb-8" data-testid={`category-title-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryServices.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
