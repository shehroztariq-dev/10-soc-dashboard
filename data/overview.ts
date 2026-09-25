export const kpiStats = [
  { label: "MTTD", value: "12.4 min", change: -8.2, target: "<15 min" },
  { label: "MTTR", value: "3.2 hrs", change: 12.1, target: "<4 hrs" },
  { label: "Active Incidents", value: "17", change: -6.4, target: "Down 8%" },
  { label: "False Positive Rate", value: "24%", change: -3.8, target: "<30%" },
];

export const alertsBySeverity = [
  { severity: "Critical", count: 3 },
  { severity: "High", count: 12 },
  { severity: "Medium", count: 47 },
  { severity: "Low", count: 128 },
];

export const topAlerts = [
  {
    id: "ALT-4821",
    severity: "Critical",
    name: "C2 Beacon Detected",
    source: "10.2.14.88",
    time: "2 min ago",
    asset: "finance-wkst-42",
  },
  {
    id: "ALT-4867",
    severity: "High",
    name: "Privilege Escalation Attempt",
    source: "203.0.113.44",
    time: "8 min ago",
    asset: "dc-prod-01",
  },
  {
    id: "ALT-4902",
    severity: "Critical",
    name: "Suspicious PowerShell Execution",
    source: "10.9.0.18",
    time: "14 min ago",
    asset: "ops-lab-09",
  },
  {
    id: "ALT-4928",
    severity: "High",
    name: "Phishing Reported by User",
    source: "mail-tenant-01",
    time: "21 min ago",
    asset: "user: j.fernandez",
  },
  {
    id: "ALT-4971",
    severity: "Medium",
    name: "Failed SSO Login Burst",
    source: "198.51.100.27",
    time: "31 min ago",
    asset: "vpn-gateway",
  },
];
