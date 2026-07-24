"use client";

import React from "react";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import { Opportunity } from "@/types/opportunity";

import { formatDate, isExpired, isExpiringSoon } from "@/lib/utils";

import {
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { th } from "date-fns/locale";

interface RecentOpportunitiesTableProps {
  opportunities: Opportunity[];
  onDelete?: (id: string) => void;
}

export const RecentOpportunitiesTable: React.FC<
  RecentOpportunitiesTableProps
> = ({ opportunities, onDelete }) => {
  const getStatusBadge = (deadline: string) => {
    if (isExpired(deadline)) {
      return (
        <Badge
          variant="default"
          className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
        >
          Expired
        </Badge>
      );
    }

    if (isExpiringSoon(deadline)) {
      return (
        <Badge variant="warning" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Expiring Soon
        </Badge>
      );
    }

    return (
      <Badge variant="success" className="flex items-center gap-1">
        <CheckCircle className="w-3 h-3" />
        Active
      </Badge>
    );
  };

  if (opportunities.length === 0) {
    return (
      <Card className="p-8 bg-surface border border-border rounded-2xl text-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>

          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No Opportunities Yet
          </h3>

          <p className="text-text-secondary">
            Start adding opportunities to see them here.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden bg-surface border border-border rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/5 border-b border-border">
            <tr>
              <th
                className="
                px-4
                py-3
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-text-secondary
                "
              >
                Opportunity
              </th>

              <th
                className="
                hidden
                sm:table-cell
                px-4
                py-3
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-text-secondary
                "
              >
                Category
              </th>

              <th
                className="
                hidden
                md:table-cell
                px-4
                py-3
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-text-secondary
                "
              >
                Location
              </th>

              <th
                className="
                hidden
                lg:table-cell
                px-4
                py-3
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-text-secondary
                "
              >
                Deadline
              </th>

              <th
                className="
                px-4
                py-3
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-text-secondary
                "
              >
                Status
              </th>

              <th
                className="
                px-4
                py-3
                text-right
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-text-secondary
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {opportunities.map((opp) => (
              <tr key={opp.id} className="hover:bg-primary/5 transition-colors">
                {/* Opportunity */}
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <Link
                      href={`/opportunities/${opp.id}`}
                      className="font-semibold text-text-primary hover:text-primary transition-colors"
                    >
                      {opp.title}
                    </Link>

                    <span className="text-sm text-text-secondary">
                      {opp.organization}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="hidden sm:table-cell px-4 py-4">
                  <Badge
                    variant="default"
                    className="bg-primary/10 text-primary"
                  >
                    {opp.category}
                  </Badge>
                </td>

                {/* Location */}
                <td className="hidden md:table-cell px-4 py-4 text-sm text-text-secondary">
                  {opp.location}
                </td>

                {/* Deadline */}
                <td className="hidden lg:table-cell px-4 py-4 text-sm text-text-secondary">
                  {formatDate(opp.deadline)}
                </td>

                {/* Status */}
                <td className="px-4 py-4">{getStatusBadge(opp.deadline)}</td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/opportunities/${opp.id}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:text-primary hover:bg-primary/10"
                        aria-label="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>

                    <Link href={`/edit-opportunity/${opp.id}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:text-primary hover:bg-primary/10"
                        aria-label="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>

                    {onDelete && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:text-primary hover:bg-primary/10"
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