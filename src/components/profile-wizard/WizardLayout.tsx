
import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";

type WizardLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const WizardLayout = ({ children, title, subtitle }: WizardLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-tropical-turquoise/20 to-tropical-coral/20 p-4">
      <Card className="max-w-4xl w-full shadow-lg border-tropical-turquoise/20 animate-fade-in">
        <div className="p-6 md:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          {children}
        </div>
      </Card>
    </div>
  );
};

export default WizardLayout;
