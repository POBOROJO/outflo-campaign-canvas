
import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

export function CampaignTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[300px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-20 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-12" />
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-9 rounded" />
              <Skeleton className="h-9 w-9 rounded" />
              <Skeleton className="h-9 w-10 rounded" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
