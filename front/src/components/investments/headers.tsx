import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export interface HeadersRowProps {
  headers: string[];
}
export default function HeadersRow({ headers }: HeadersRowProps) {
  return (
    <TableRow>
      {headers.map(header => <TableCell key={header}> {header} </TableCell>)}
    </TableRow>
  );
}
