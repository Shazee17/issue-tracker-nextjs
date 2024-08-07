import prisma from '@/prisma/client'
import { Flex, Table } from '@radix-ui/themes'
import IssueStatusBadge from '../components/IssueStatusBadge'
import Link from '../components/Link'
import IssueActions from './IssueActions'
import NextLink from "next/link"
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '../components/Pagination'
import { Metadata } from 'next'

interface Props {
  searchParams : {
    status: Status,
    orderBy: keyof Issue,
    page: string
  }
}

const IssuesPage = async ({ searchParams} : Props) => {
  const columns: { 
    label: string;
    value: keyof Issue;
    className? : string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
  ]

  // Check if status is valid, otherwise set to undefined
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const where = { status };


  const orderBy = columns
  .map(column => column.value)
  .includes(searchParams.orderBy)
   ? { [searchParams.orderBy]:'asc' } : undefined;


   const page = parseInt(searchParams.page) || 1;
   const pageSize = 9;


  // Fetch issues based on the status
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({
    where
  })

  return (
    <Flex direction="column" gap="3">
      <IssueActions/>

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{ query: { ...searchParams, orderBy: column.value } }}>
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination 
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  )
}

export const dynamic = 'force-dynamic';



export const metadata: Metadata = {
  title: 'Issues',
  description: 'Browse and manage all issues in the issue Tracker'
}

export default IssuesPage
