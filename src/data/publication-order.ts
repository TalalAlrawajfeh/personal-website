type DatedEntry = {
  data: { year?: number; order?: number; title: string };
};

export function newestFirst(a: DatedEntry, b: DatedEntry): number {
  return (
    (b.data.year ?? 0) - (a.data.year ?? 0) ||
    (a.data.order ?? 99) - (b.data.order ?? 99) ||
    a.data.title.localeCompare(b.data.title)
  );
}
