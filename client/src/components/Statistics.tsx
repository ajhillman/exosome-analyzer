import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExosomeCompany } from "@/types";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface StatisticsProps {
  companies: ExosomeCompany[];
}

export function Statistics({ companies }: StatisticsProps) {
  const totalCompanies = companies.length;
  const compliantCompanies = companies.filter((c) => !c.hasWarningLetter && c.regulatoryScore >= 70).length;
  const warningLetterCount = companies.filter((c) => c.hasWarningLetter).length;
  const averageRegulatoryScore = companies.length > 0
    ? Math.round(companies.reduce((sum, c) => sum + c.regulatoryScore, 0) / companies.length)
    : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b border-border">
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Total Companies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{totalCompanies}</div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Compliant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100">{compliantCompanies}</div>
        </CardContent>
      </Card>

      <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-900 dark:text-red-100 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            FDA Warnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-900 dark:text-red-100">{warningLetterCount}</div>
        </CardContent>
      </Card>

      <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100 flex items-center gap-2">
            Avg Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{averageRegulatoryScore}</div>
        </CardContent>
      </Card>
    </div>
  );
}
