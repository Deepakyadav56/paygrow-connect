
import React from 'react';
import { Check, X, Info } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FundComparisonProps {
  funds: Array<{
    id: string;
    name: string;
    logo: React.ReactNode | string;
    category: string;
    aum: string;
    expense: string;
    returns: {
      oneYear: string;
      threeYear: string;
      fiveYear: string;
    };
    risk: string;
    rating: number;
    minInvestment: string;
    exitLoad: string;
    taxImplications: string;
  }>;
}

const FundComparisonTable: React.FC<FundComparisonProps> = ({ funds }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-40 font-medium">Features</TableHead>
            {funds.map((fund) => (
              <TableHead key={fund.id} className="font-medium">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 mr-2 flex-shrink-0">
                    {typeof fund.logo === 'string' ? (
                      <img src={fund.logo} alt={fund.name} className="w-full h-full object-contain" />
                    ) : (
                      fund.logo
                    )}
                  </div>
                  <span className="truncate max-w-[150px]">{fund.name}</span>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium bg-gray-50">Fund Type</TableCell>
            {funds.map((fund) => (
              <TableCell key={`${fund.id}-type`}>
                {fund.category}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium bg-gray-50">AUM</TableCell>
            {funds.map((fund) => (
              <TableCell key={`${fund.id}-aum`}>
                {fund.aum}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium bg-gray-50">
              <div className="flex items-center">
                Expense Ratio
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={14} className="ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The percentage of fund assets used for expenses. Lower is better.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
            {funds.map((fund) => (
              <TableCell key={`${fund.id}-expense`}>
                {fund.expense}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium bg-gray-50">1Y Returns</TableCell>
            {funds.map((fund) => (
              <TableCell 
                key={`${fund.id}-1y`}
                className={parseFloat(fund.returns.oneYear) >= 0 ? 'text-green-600' : 'text-red-600'}
              >
                {fund.returns.oneYear}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium bg-gray-50">3Y Returns</TableCell>
            {funds.map((fund) => (
              <TableCell 
                key={`${fund.id}-3y`}
                className={parseFloat(fund.returns.threeYear) >= 0 ? 'text-green-600' : 'text-red-600'}
              >
                {fund.returns.threeYear}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium bg-gray-50">5Y Returns</TableCell>
            {funds.map((fund) => (
              <TableCell 
                key={`${fund.id}-5y`}
                className={parseFloat(fund.returns.fiveYear) >= 0 ? 'text-green-600' : 'text-red-600'}
              >
                {fund.returns.fiveYear}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium bg-gray-50">Risk</TableCell>
            {funds.map((fund) => (
              <TableCell key={`${fund.id}-risk`}>
                {fund.risk}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium bg-gray-50">Min Investment</TableCell>
            {funds.map((fund) => (
              <TableCell key={`${fund.id}-min`}>
                {fund.minInvestment}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium bg-gray-50">
              <div className="flex items-center">
                Exit Load
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={14} className="ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Fee charged when redeeming units before a specified period.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
            {funds.map((fund) => (
              <TableCell key={`${fund.id}-exit`}>
                {fund.exitLoad}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium bg-gray-50">Tax Implications</TableCell>
            {funds.map((fund) => (
              <TableCell key={`${fund.id}-tax`}>
                {fund.taxImplications}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default FundComparisonTable;
