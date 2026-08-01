export default function Dashboard() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-4 gap-5">
        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">
          Total Users
        </div>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">
          Roles
        </div>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">
          Permissions
        </div>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">
          Applications
        </div>
      </div>
    </div>
  );
}
