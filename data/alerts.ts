export type AlertSeverity = "Critical" | "High" | "Medium" | "Low";

export interface AlertRecord {
  id: string;
  name: string;
  severity: AlertSeverity;
  owner: string;
  status: string;
  source: string;
  time: string;
}

export interface AlertDetail extends AlertRecord {
  narrative: string;
  confidence: number;
  detectionRules: string[];
  entities: {
    kind: "principal" | "network" | "workflow" | "tenant";
    value: string;
    displayLabel?: string;
    pivotPath?: string;
  }[];
  timeline: {
    type: string;
    timestamp: string;
    actor: string;
    description: string;
  }[];
}

export const alertsQueue: AlertRecord[] = [
  {
    id: "ALT-4821",
    name: "Impossible travel",
    severity: "Critical",
    owner: "A. Gomez",
    status: "Investigating",
    source: "Identity",
    time: "2 min ago",
  },
  {
    id: "ALT-4867",
    name: "Ransomware beacon",
    severity: "High",
    owner: "N. Patel",
    status: "Blocked",
    source: "EDR",
    time: "8 min ago",
  },
  {
    id: "ALT-4902",
    name: "Unusual logins",
    severity: "Medium",
    owner: "J. Silva",
    status: "Monitoring",
    source: "IAM",
    time: "16 min ago",
  },
  {
    id: "ALT-4928",
    name: "Container breakout",
    severity: "Critical",
    owner: "R. Bell",
    status: "Escalated",
    source: "Kubernetes",
    time: "22 min ago",
  },
  {
    id: "ALT-4971",
    name: "Suspicious e-mail",
    severity: "High",
    owner: "E. Ray",
    status: "Resolved",
    source: "Mail",
    time: "31 min ago",
  },
];

export const alertDetails: Record<string, AlertDetail> = {
  "ALT-4821": {
    id: "ALT-4821",
    name: "Impossible travel",
    severity: "Critical",
    owner: "A. Gomez",
    status: "Investigating",
    source: "Identity",
    time: "2 min ago",
    narrative:
      "The identity platform observed a user authenticating from two geographically distant regions in under 12 minutes, with a high-risk sign-in on a privileged admin role. Correlated rules matched geolocation velocity and token reuse risk, causing a critical triage recommendation.",
    confidence: 0.96,
    detectionRules: [
      "geo_velocity_anomaly",
      "token_replay_check",
      "admin_role_risk",
    ],
    entities: [
      {
        kind: "principal",
        value: "a.gomez@acme.internal",
        displayLabel: "A. Gomez",
        pivotPath: "/dashboard/incidents?principal=a.gomez@acme.internal",
      },
      {
        kind: "network",
        value: "198.51.100.27",
        displayLabel: "Source IP",
        pivotPath: "/dashboard/threat-intel?ip=198.51.100.27",
      },
      {
        kind: "network",
        value: "10.2.14.88",
        displayLabel: "Destination host",
      },
      {
        kind: "tenant",
        value: "acme-prod",
        displayLabel: "Tenant",
      },
    ],
    timeline: [
      {
        type: "created",
        timestamp: "2026-09-25T09:41:12Z",
        actor: "system",
        description:
          "Alert was created after rule correlation exceeded the critical-risk threshold.",
      },
      {
        type: "occurrence",
        timestamp: "2026-09-25T09:33:08Z",
        actor: "system",
        description:
          "Two successful sign-ins were observed from separate regions within 11 minutes.",
      },
      {
        type: "acknowledged",
        timestamp: "2026-09-25T09:42:10Z",
        actor: "A. Gomez",
        description:
          "Analyst acknowledged the alert and started review of session metadata.",
      },
      {
        type: "comment",
        timestamp: "2026-09-25T09:44:41Z",
        actor: "A. Gomez",
        description:
          "User reported travel and is validating the sign-in context with the identity team.",
      },
    ],
  },
  "ALT-4867": {
    id: "ALT-4867",
    name: "Ransomware beacon",
    severity: "High",
    owner: "N. Patel",
    status: "Blocked",
    source: "EDR",
    time: "8 min ago",
    narrative:
      "Endpoint telemetry matched a known ransomware payload sequence with outbound connections to a suspicious C2 address. The endpoint was isolated before the payload completed execution, limiting lateral movement risk.",
    confidence: 0.88,
    detectionRules: [
      "beaconing_signature",
      "process_hollowing",
      "network_blocklist",
    ],
    entities: [
      {
        kind: "network",
        value: "203.0.113.44",
        displayLabel: "C2 IP",
        pivotPath: "/dashboard/threat-intel?ip=203.0.113.44",
      },
      {
        kind: "principal",
        value: "svc-ops-01",
        displayLabel: "Service account",
      },
      {
        kind: "workflow",
        value: "edr-isolation",
        displayLabel: "Workflow",
      },
    ],
    timeline: [
      {
        type: "created",
        timestamp: "2026-09-25T09:35:14Z",
        actor: "system",
        description:
          "EDR flagged a process tree match consistent with ransomware behavior.",
      },
      {
        type: "occurrence",
        timestamp: "2026-09-25T09:30:22Z",
        actor: "system",
        description:
          "Outbound beacon traffic to a known malicious domain was observed.",
      },
      {
        type: "escalated",
        timestamp: "2026-09-25T09:37:08Z",
        actor: "N. Patel",
        description:
          "Threat hunter escalated to the containment team for endpoint isolation review.",
      },
      {
        type: "resolved",
        timestamp: "2026-09-25T09:39:55Z",
        actor: "system",
        description:
          "Endpoint isolation completed and the host was placed under watch.",
      },
    ],
  },
  "ALT-4902": {
    id: "ALT-4902",
    name: "Unusual logins",
    severity: "Medium",
    owner: "J. Silva",
    status: "Monitoring",
    source: "IAM",
    time: "16 min ago",
    narrative:
      "Authentication events for a user account deviated from the baseline pattern with repeated sign-ins from a new device and risk-rated browser fingerprint. The system has not yet crossed the escalation threshold but remains under active review.",
    confidence: 0.72,
    detectionRules: [
      "idle_user_baseline",
      "device_velocity",
      "new_browser_fingerprint",
    ],
    entities: [
      {
        kind: "principal",
        value: "j.silva@acme.internal",
        displayLabel: "J. Silva",
      },
      {
        kind: "network",
        value: "10.9.0.18",
        displayLabel: "Source device",
      },
      {
        kind: "tenant",
        value: "acme-prod",
      },
    ],
    timeline: [
      {
        type: "created",
        timestamp: "2026-09-25T09:28:00Z",
        actor: "system",
        description:
          "Login anomaly rule generated an alert after 5 failed and 2 successful attempts.",
      },
      {
        type: "occurrence",
        timestamp: "2026-09-25T09:16:40Z",
        actor: "system",
        description:
          "A new browser class and geolocation mismatch were observed during sign-in.",
      },
      {
        type: "comment",
        timestamp: "2026-09-25T09:24:12Z",
        actor: "J. Silva",
        description:
          "User confirmed travel and a temporary VPN configuration change on the device.",
      },
    ],
  },
  "ALT-4928": {
    id: "ALT-4928",
    name: "Container breakout",
    severity: "Critical",
    owner: "R. Bell",
    status: "Escalated",
    source: "Kubernetes",
    time: "22 min ago",
    narrative:
      "The Kubernetes control plane reported a host escape attempt from a privileged container. Privileged syscalls and mount namespace changes triggered a high-confidence critical alert requiring containment and forensic review.",
    confidence: 0.98,
    detectionRules: [
      "privileged_container",
      "host_escapes_detected",
      "namespace_escape",
    ],
    entities: [
      {
        kind: "network",
        value: "172.16.22.9",
        displayLabel: "Node IP",
      },
      {
        kind: "workflow",
        value: "kubernetes-cluster",
        displayLabel: "Workflow",
      },
      {
        kind: "tenant",
        value: "prod-eu-west",
        displayLabel: "Tenant",
      },
    ],
    timeline: [
      {
        type: "created",
        timestamp: "2026-09-25T09:12:22Z",
        actor: "system",
        description:
          "A cluster-wide node security rule detected a privileged container escape sequence.",
      },
      {
        type: "occurrence",
        timestamp: "2026-09-25T09:06:43Z",
        actor: "system",
        description:
          "A container attempted access to the host filesystem and kernel namespace.",
      },
      {
        type: "escalated",
        timestamp: "2026-09-25T09:15:16Z",
        actor: "R. Bell",
        description:
          "The incident was escalated to the cloud response team for immediate isolation.",
      },
    ],
  },
  "ALT-4971": {
    id: "ALT-4971",
    name: "Suspicious e-mail",
    severity: "High",
    owner: "E. Ray",
    status: "Resolved",
    source: "Mail",
    time: "31 min ago",
    narrative:
      "A phishing campaign targeted an employee mailbox with a malicious attachment and callback domain. Automatic quarantine and user awareness workflow resolved the event without a confirmed compromise.",
    confidence: 0.84,
    detectionRules: [
      "mail_suspicious_attachment",
      "phish_url_reputation",
      "user_reported_suspicion",
    ],
    entities: [
      {
        kind: "principal",
        value: "e.ray@acme.internal",
        displayLabel: "E. Ray",
      },
      {
        kind: "network",
        value: "mail-tenant-01",
        displayLabel: "Mail tenant",
      },
      {
        kind: "workflow",
        value: "quarantine-policy",
        displayLabel: "Workflow",
      },
    ],
    timeline: [
      {
        type: "created",
        timestamp: "2026-09-25T08:51:40Z",
        actor: "system",
        description:
          "The phishing email was classified with malicious attachment risk.",
      },
      {
        type: "occurrence",
        timestamp: "2026-09-25T08:50:12Z",
        actor: "system",
        description:
          "User report arrived immediately after the message was opened in the browser.",
      },
      {
        type: "resolved",
        timestamp: "2026-09-25T08:58:10Z",
        actor: "E. Ray",
        description:
          "Suspicious message was quarantined and the mailbox was revalidated.",
      },
    ],
  },
};

export function getAlertById(id: string) {
  return alertDetails[id];
}
