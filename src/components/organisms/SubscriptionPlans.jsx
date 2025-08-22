import React, { useState } from "react";
import SubscriptionCard from "@/components/molecules/SubscriptionCard";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";

const SubscriptionPlans = () => {
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("Pro"); // Mock current plan

  const plans = [
    {
      tier: "Basic",
      price: 29,
      features: [
        "Up to 3 data sources",
        "Basic ML insights",
        "Monthly reports",
        "Email support",
        "Basic heat map visualization"
      ]
    },
    {
      tier: "Pro",
      price: 99,
      features: [
        "Up to 10 data sources",
        "Advanced ML insights",
        "Real-time analytics",
        "Priority support",
        "Advanced heat maps",
        "Custom reporting",
        "API access"
      ],
      isPopular: true
    },
    {
tier: "Enterprise",
      price: 299,
      features: [
        "Unlimited data sources",
        "Quantum wave function analysis",
        "White-label solution",
        "Dedicated support",
        "Advanced visualizations",
        "Custom integrations",
        "Team collaboration",
        "Advanced security"
      ]
    },
    {
      tier: "Snap",
      price: 499,
      features: [
        "Everything in Enterprise",
        "Dedicated cloud-based ML analysis",
        "Custom dataset processing",
        "Real-time AI insights",
        "Advanced predictive modeling",
        "Dedicated ML infrastructure",
        "Priority ML support",
        "Custom algorithm development",
        "Advanced data visualization",
        "Enterprise-grade security"
      ]
    }
  ];

  const handleSubscribe = async (tier) => {
    if (tier === currentPlan) return;

    setLoading(true);
    try {
      // Simulate Stripe checkout process
      toast.info(`Redirecting to Stripe checkout for ${tier} plan...`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success
      setCurrentPlan(tier);
      toast.success(`Successfully subscribed to ${tier} plan!`);
    } catch (error) {
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text font-display mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Unlock powerful marketing insights with our ML-powered analytics platform. 
          Upgrade anytime to access more data sources and advanced features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <SubscriptionCard
            key={plan.tier}
            tier={plan.tier}
            price={plan.price}
            features={plan.features}
            isCurrentPlan={plan.tier === currentPlan}
            isPopular={plan.isPopular}
            onSubscribe={() => handleSubscribe(plan.tier)}
          />
        ))}
      </div>

      <div className="bg-surface rounded-xl p-6 shadow-custom border border-gray-100/50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need a Custom Solution?
          </h3>
          <p className="text-gray-600 mb-4">
            Contact our sales team for enterprise pricing and custom integrations.
          </p>
          <button 
            className="text-primary hover:text-secondary font-medium transition-colors duration-200"
            onClick={() => toast.info("Contact form would open here")}
          >
            Contact Sales →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;