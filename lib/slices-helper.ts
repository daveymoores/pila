import type { SliceLike } from "@prismicio/react";

export function asSlices<T extends { slice_type?: string }>(
  slices: T[] | null | undefined,
): readonly SliceLike<string>[] {
  return (slices ?? []) as unknown as readonly SliceLike<string>[];
}
