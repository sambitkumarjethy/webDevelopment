import { Link } from "react-router-dom";

function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  actionLabel,
  actionTo,
  onActionClick,
  icon: Icon,
}) {
  return (
    <div className="mb-6 rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <div>
          {/* Breadcrumb */}
          {breadcrumbs.length > 0 && (
            <nav className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              {breadcrumbs.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                  {item.path ? (
                    <Link to={item.path} className="hover:text-emerald-600">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {item.label}
                    </span>
                  )}

                  {index !== breadcrumbs.length - 1 && <span>/</span>}
                </span>
              ))}
            </nav>
          )}

          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        {/* Right */}
        {(actionLabel || Icon) && (
          <>
            {actionTo ? (
              <Link
                to={actionTo}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
              >
                {Icon && <Icon size={18} />}
                {actionLabel}
              </Link>
            ) : (
              <button
                onClick={onActionClick}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
              >
                {Icon && <Icon size={18} />}
                {actionLabel}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
