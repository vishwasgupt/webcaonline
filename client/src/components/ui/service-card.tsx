import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="service-card cursor-pointer h-full" data-testid={`card-service-${service.id}`}>
      <CardContent className="p-6 text-center h-full flex flex-col">
        <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <i className={`${service.icon} text-primary text-2xl`} data-testid={`icon-${service.id}`}></i>
        </div>
        <h3 className="font-semibold text-card-foreground mb-2 text-sm" data-testid={`title-${service.id}`}>
          {service.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-2 flex-1" data-testid={`description-${service.id}`}>
          {service.description}
        </p>
        <p className="text-xs font-medium text-primary mb-4" data-testid={`price-${service.id}`}>
          ₹{service.price}
        </p>
        <Link href={`/service/${service.id}`} data-testid={`button-apply-${service.id}`}>
          <Button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors text-xs">
            Apply Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
