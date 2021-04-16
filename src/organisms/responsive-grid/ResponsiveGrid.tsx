import { Grid, GridProps, ResponsiveContext } from "grommet";
import React from "react";

type GridOption = string[][] | string[];

type AreaOption = { name?: string; start?: number[]; end?: number[] }[];

interface GridOptions<T> {
  small?: T;
  medium?: T;
  large?: T;
  xlarge?: T;
}

interface ResponsiveProps
  extends Omit<GridProps, "areas" | "columns" | "rows"> {
  children: React.ReactChild | React.ReactElement[];
  rows: GridOptions<GridOption> | string;
  columns: GridOptions<GridOption> | string;
  areas?: GridOptions<AreaOption>;
}

// Example
// -----------------------------------------
// const columns: GridOptions<GridOption> = {
//   small: ["auto"],
//   medium: ["auto", "auto"],
//   large: ["auto", "auto", "auto"],
//   xlarge: ["auto", "auto", "auto"],
// };
//
// const rows: GridOptions<GridOption> = {
//   small: ["xsmall", "xsmall", "xsmall"],
//   medium: ["xsmall", "xsmall"],
//   large: ["xsmall"],
//   xlarge: ["xsmall"],
// };
//
// const fixedGridAreas: GridOptions<AreaOption> = {
//   small: [
//     { name: "header", start: [0, 0], end: [0, 0] },
//     { name: "test", start: [0, 1], end: [0, 1] },
//     { name: "test1", start: [0, 2], end: [0, 2] },
//   ],
//   medium: [
//     { name: "header", start: [0, 0], end: [1, 0] },
//     { name: "test", start: [0, 1], end: [0, 1] },
//     { name: "test1", start: [1, 1], end: [1, 1] },
//   ],
//   large: [
//     { name: "header", start: [0, 0], end: [0, 0] },
//     { name: "test", start: [1, 0], end: [1, 0] },
//     { name: "test1", start: [2, 0], end: [2, 0] },
//   ],
//   xlarge: [
//     { name: "header", start: [0, 0], end: [0, 0] },
//     { name: "test", start: [1, 0], end: [1, 0] },
//     { name: "test1", start: [2, 0], end: [2, 0] },
//   ],
// };

const ResponsiveGrid: React.FC<ResponsiveProps> = ({
  children,
  columns,
  rows,
  areas,
  gap,
  ...props
}) => (
  <ResponsiveContext.Consumer>
    {(size) => {
      // console.log(`Grid size: ${size}`);
      let columnsVal = columns;
      if (typeof columns !== "string") {
        if (columns[size as keyof GridOptions<GridOption>]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          columnsVal = columns[size as keyof GridOptions<GridOption>];
        }
      }

      let rowsVal = rows;
      if (typeof rows !== "string") {
        if (rows[size as keyof GridOptions<GridOption>]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          rowsVal = rows[size as keyof GridOptions<GridOption>];
        }
      }

      let areasVal = areas;
      if (areas && !Array.isArray(areas)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        areasVal = areas[size as keyof GridOptions<AreaOption>];
      }

      return (
        <Grid
          {...props}
          gap={gap || (size === "small" ? "medium" : size)}
          areas={(!areasVal ? undefined : areasVal) as GridProps["areas"]}
          rows={(!rowsVal ? size : rowsVal) as GridProps["rows"]}
          columns={(!columnsVal ? size : columnsVal) as GridProps["columns"]}
        >
          {children}
        </Grid>
      );
    }}
  </ResponsiveContext.Consumer>
);

export default ResponsiveGrid;
