const incidents = [
  {
    title: "Credential stuffing campaign",
    time: "09:40 UTC",
    summary: "Failed login bursts against SSO service from 14 countries. IP reputation checks increased risk to medium-high.",
    status: "Mitigating",
  },
  {
    title: "Endpoint isolation on finance segment",
    time: "08:15 UTC",
    summary: "Three devices on the finance VLAN were isolated after script execution matched a known ransomware pattern.",
    status: "Contained",
  },
  {
    title: "Privilege escalation attempt",
    time: "06:50 UTC",
    summary: "A service account attempted to add a new local admin and triggered SSO identity policy enforcement.",
    status: "Investigating",
  },
];

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Incidents</p>
        <h3 className="mt-2 text-3xl font-semibold text-slate-50">
          Timeline
        </h3>
      </section>

      <section className="space-y-5">
        {incidents.map((incident, index) => (
          <div
            key={incident.title}
            className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-5 pl-10"
          >
            <div className="absolute left-4 top-6 h-3 w-3 rounded-full bg-cyan-400" />
            {index !== incidents.length - 1 && (
              <div className="absolute left-[1.05rem] top-9 -bottom-6 w-px bg-slate-700" />
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">{incident.time}</p>
                <h4 className="mt-1 text-xl font-semibold text-slate-100">
                  {incident.title}
                </h4>
              </div>

              <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-200">
                {incident.status}
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
              {incident.summary}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
