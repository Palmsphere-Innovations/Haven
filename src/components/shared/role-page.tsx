interface RolePageProps {
  role: string;
  title: string;
}

export function RolePage({ role, title }: RolePageProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{role}</p>
      <h1 className="mt-2 text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-sm text-gray-600">This workspace is ready for backend integration.</p>
    </section>
  );
}
