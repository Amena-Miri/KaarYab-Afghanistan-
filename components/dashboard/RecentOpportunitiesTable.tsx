'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Opportunity } from '@/types/opportunity';
import { formatDate, getCategoryColor, isExpired, isExpiringSoon } from '@/lib/utils';
import { Eye, Edit, Trash2, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface RecentOpportunitiesTableProps {
  opportunities: Opportunity[];
  onDelete?: (id: string) => void;
}

export const RecentOpportunitiesTable: React.FC<RecentOpportunitiesTableProps> = ({
  opportunities,
  onDelete,
}) => {
  const getStatusBadge = (deadline: string) => {
    if (isExpired(deadline)) {
      return <Badge variant="danger">Expired</Badge>;
    }
    if (isExpiringSoon(deadline)) {
      return <Badge variant="warning" className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        Expiring Soon
      </Badge>;
    }
    return <Badge variant="success" className="flex items-center gap-1">
      <CheckCircle className="w-3 h-3" />
      Active
    </Badge>;
  };

  if (opportunities.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Opportunities Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start adding opportunities to see them here.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-dark-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Opportunity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Deadline
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
            {opportunities.map((opp) => (
              <tr 
                key={opp.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <Link 
                      href={`/opportunities/${opp.id}`}
                      className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors"
                    >
                      {opp.title}
                    </Link>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {opp.organization}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <Badge className={getCategoryColor(opp.category)}>
                    {opp.category}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">
                  {opp.location}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hidden lg:table-cell">
                  {formatDate(opp.deadline)}
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(opp.deadline)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/opportunities/${opp.id}`}>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        aria-label="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/edit-opportunity/${opp.id}`}>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        aria-label="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    {onDelete && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => onDelete(opp.id)}
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};