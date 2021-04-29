import { Grid, GridProps } from "grommet";
import React from "react";

import {
  DesktopUp,
  MobileOnly,
  TabletOnly,
} from "../../atoms/responsive-helpers/ResponsiveHelpers";

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

interface BreakpointGrid extends ResponsiveProps {
  size: "small" | "medium" | "large";
}

const BreakpointGrid: React.FC<BreakpointGrid> = ({
  gap,
  areas,
  rows,
  columns,
  size,
  children,
  ...rest
}) => (
  <Grid
    gap={gap || (size === "small" ? "medium" : size)}
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    areas={areas && !Array.isArray(areas) && areas[size] ? areas[size] : areas}
    rows={typeof rows !== "string" ? rows[size] : rows}
    columns={typeof columns !== "string" ? columns[size] : columns}
    {...rest}
  >
    {children}
  </Grid>
);

const ResponsiveGrid: React.FC<ResponsiveProps> = ({
  children,
  columns,
  rows,
  areas,
  gap,
  ...props
}) => (
  <React.Fragment>
    <MobileOnly>
      <BreakpointGrid
        columns={columns}
        rows={rows}
        areas={areas}
        gap={gap}
        size={"small"}
        {...props}
      >
        {children}
      </BreakpointGrid>
    </MobileOnly>
    <TabletOnly>
      <BreakpointGrid
        columns={columns}
        rows={rows}
        areas={areas}
        gap={gap}
        size={"medium"}
        {...props}
      >
        {children}
      </BreakpointGrid>
    </TabletOnly>
    <DesktopUp>
      <BreakpointGrid
        columns={columns}
        rows={rows}
        areas={areas}
        gap={gap}
        size={"large"}
        {...props}
      >
        {children}
      </BreakpointGrid>
    </DesktopUp>
  </React.Fragment>
);

export default ResponsiveGrid;
