import { Status } from "@prisma/client";
import { Badge, Strong } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  {
    label: string;
    color: "red" | "orange" | "green";
  }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "orange" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}><Strong>{statusMap[status].label}</Strong></Badge>
  );
};

export default IssueStatusBadge;
