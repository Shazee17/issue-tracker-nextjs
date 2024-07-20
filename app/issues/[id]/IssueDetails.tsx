import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Heading, Blockquote, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
    issue: Issue
}

const IssueDetails = ({issue}: Props) => {
  return (
    <>
      <Heading className="mb-2">{issue.title}</Heading>

      <div className="flex flex-row space-x-5 mb-5">
        <IssueStatusBadge status={issue.status} />
        <Text size="2" weight="medium">
          {issue.createdAt.toDateString()}
        </Text>
      </div>

      <Blockquote className="prose max-w-full bg-slate-100 p-5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Blockquote>
    </>
  );
};

export default IssueDetails;
