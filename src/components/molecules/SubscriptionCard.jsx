import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SubscriptionCard = ({ 
  tier, 
  price, 
  features, 
  isCurrentPlan = false, 
  isPopular = false,
  onSubscribe,
  className 
}) => {
  return (
    <Card className={cn(
      "relative transition-all duration-300 hover:scale-105",
      isPopular && "ring-2 ring-primary shadow-premium",
      className
    )}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="primary" className="px-3 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center">
        <div className="space-y-2">
          <CardTitle className="text-xl font-bold">{tier}</CardTitle>
          <div className="space-y-1">
            <div className="text-3xl font-bold gradient-text">${price}</div>
            <div className="text-sm text-gray-500">per month</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <ApperIcon name="Check" className="text-success flex-shrink-0" size={16} />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={isCurrentPlan ? "secondary" : (isPopular ? "primary" : "secondary")}
          className="w-full"
          onClick={onSubscribe}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? "Current Plan" : `Choose ${tier}`}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;