export default function ThreatIntelPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs uppercase tracking-[0.26em] text-slate-400">
          Threat Intel
        </p>
        <h3 className="mt-2 text-3xl font-semibold text-slate-50">
          Adversary feed
        </h3>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            name: "APT-29",
            source: "MISP",
            risk: "High",
            note: "Credential phishing campaigns targeting finance admins",
          },
          {
            name: "LummaC2",
            source: "Intel Relay",
            risk: "Critical",
            note: "Malware beaconing to newly observed command-and-control IPs",
          },
          {
            name: "BazarLoader",
            source: "ThreatFox",
            risk: "Medium",
            note: "Distribution infrastructure continues to rotate ASN reputation",
          },
        ].map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-lg font-semibold text-slate-100">
                {item.name}
              </h4>
              <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-red-300">
                {item.risk}
              </span>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-400">
              {item.source}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-300">{item.note}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
