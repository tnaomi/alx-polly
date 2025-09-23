import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

export default function PollsLayout({ children }: { children: React.ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}