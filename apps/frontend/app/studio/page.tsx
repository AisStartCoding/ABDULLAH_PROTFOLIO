"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { ensureCsrf, studioFetch, type StudioSession } from "@/lib/studio-api";

type FieldType = "text" | "textarea" | "number" | "boolean" | "json";

type Field = {
  key: string;
  label: string;
  type?: FieldType;
  required?: boolean;
};

type Resource = {
  label: string;
  endpoint: string;
  fields: Field[];
  titleKey: string;
};

type StudioRecord = Record<string, unknown> & { id?: number };

const resources: Resource[] = [
  {
    label: "Site Settings",
    endpoint: "/api/studio/site-settings",
    titleKey: "name",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "role", label: "Role", required: true },
      { key: "email", label: "Email", required: true },
      { key: "location", label: "Location" },
      { key: "open_status", label: "Open Status" },
      { key: "seo_title", label: "SEO Title" },
      { key: "seo_description", label: "SEO Description", type: "textarea" }
    ]
  },
  {
    label: "Hero",
    endpoint: "/api/studio/hero",
    titleKey: "headline",
    fields: [
      { key: "headline", label: "Headline", required: true },
      { key: "subtext", label: "Subtext", type: "textarea", required: true },
      { key: "primary_button", label: "Primary Button" },
      { key: "secondary_button", label: "Secondary Button" },
      { key: "architecture_button", label: "Architecture Button" },
      { key: "contact_button", label: "Contact Button" },
      { key: "terminal_title", label: "Proof Panel Title" },
      { key: "terminal_lines", label: "Proof Lines JSON Array", type: "json" }
    ]
  },
  {
    label: "Metrics",
    endpoint: "/api/studio/metrics",
    titleKey: "label",
    fields: [
      { key: "value", label: "Value", required: true },
      { key: "label", label: "Label", required: true },
      { key: "description", label: "Description" },
      { key: "order", label: "Order", type: "number" }
    ]
  },
  {
    label: "Skill Categories",
    endpoint: "/api/studio/skill-categories",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" }
    ]
  },
  {
    label: "Skills",
    endpoint: "/api/studio/skills",
    titleKey: "name",
    fields: [
      { key: "category", label: "Category ID", type: "number", required: true },
      { key: "name", label: "Name", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" }
    ]
  },
  {
    label: "Experience",
    endpoint: "/api/studio/experiences",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "company", label: "Company", required: true },
      { key: "date", label: "Date" },
      { key: "location", label: "Location" },
      { key: "order", label: "Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" }
    ]
  },
  {
    label: "Experience Bullets",
    endpoint: "/api/studio/experience-bullets",
    titleKey: "text",
    fields: [
      { key: "experience", label: "Experience ID", type: "number", required: true },
      { key: "text", label: "Text", type: "textarea", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" }
    ]
  },
  {
    label: "Projects",
    endpoint: "/api/studio/projects",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "status", label: "Status" },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "architecture_notes", label: "Architecture Notes", type: "textarea" },
      { key: "detail_url", label: "Detail URL" },
      { key: "order", label: "Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" }
    ]
  },
  {
    label: "Project Tags",
    endpoint: "/api/studio/project-tags",
    titleKey: "name",
    fields: [
      { key: "project", label: "Project ID", type: "number", required: true },
      { key: "name", label: "Name", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" }
    ]
  },
  {
    label: "Pipeline Steps",
    endpoint: "/api/studio/pipeline-steps",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "description", label: "Description" },
      { key: "command", label: "Command" },
      { key: "order", label: "Order", type: "number" }
    ]
  },
  {
    label: "Architecture",
    endpoint: "/api/studio/architecture-blueprints",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "accent", label: "Accent Color" },
      { key: "order", label: "Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" }
    ]
  },
  {
    label: "Architecture Modules",
    endpoint: "/api/studio/architecture-modules",
    titleKey: "name",
    fields: [
      { key: "blueprint", label: "Blueprint ID", type: "number", required: true },
      { key: "name", label: "Name", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" }
    ]
  },
  {
    label: "API Groups",
    endpoint: "/api/studio/architecture-api-groups",
    titleKey: "path",
    fields: [
      { key: "blueprint", label: "Blueprint ID", type: "number", required: true },
      { key: "path", label: "Path", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" }
    ]
  },
  {
    label: "Relationships",
    endpoint: "/api/studio/architecture-relationships",
    titleKey: "source",
    fields: [
      { key: "blueprint", label: "Blueprint ID", type: "number", required: true },
      { key: "source", label: "Source", required: true },
      { key: "target", label: "Target", required: true },
      { key: "label", label: "Label" },
      { key: "order", label: "Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" }
    ]
  },
  {
    label: "Tech Stack",
    endpoint: "/api/studio/tech-stack",
    titleKey: "name",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "category", label: "Category" },
      { key: "icon", label: "Icon Key" },
      { key: "order", label: "Order", type: "number" }
    ]
  },
  {
    label: "Theme",
    endpoint: "/api/studio/theme",
    titleKey: "primary",
    fields: [
      { key: "primary", label: "Primary" },
      { key: "secondary", label: "Secondary" },
      { key: "violet", label: "Violet" },
      { key: "background", label: "Background" }
    ]
  },
  {
    label: "Animation",
    endpoint: "/api/studio/animation",
    titleKey: "id",
    fields: [
      { key: "intensity", label: "Intensity", type: "number" },
      { key: "speed", label: "Speed", type: "number" },
      { key: "enable_3d", label: "Enable 3D", type: "boolean" },
      { key: "enable_particles", label: "Enable Particles", type: "boolean" }
    ]
  },
  {
    label: "Social Links",
    endpoint: "/api/studio/social-links",
    titleKey: "label",
    fields: [
      { key: "label", label: "Label", required: true },
      { key: "url", label: "URL", required: true },
      { key: "order", label: "Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" }
    ]
  },
  {
    label: "Contact Messages",
    endpoint: "/api/studio/contact-messages",
    titleKey: "subject",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "email", label: "Email", required: true },
      { key: "subject", label: "Subject", required: true },
      { key: "message", label: "Message", type: "textarea", required: true },
      { key: "is_read", label: "Read", type: "boolean" }
    ]
  }
];

export default function StudioPage() {
  const router = useRouter();
  const [session, setSession] = useState<StudioSession | null>(null);
  const [active, setActive] = useState(resources[0]);
  const [records, setRecords] = useState<StudioRecord[]>([]);
  const [selectedId, setSelectedId] = useState<number | "new">("new");
  const [form, setForm] = useState<StudioRecord>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const selected = useMemo(() => records.find((record) => record.id === selectedId), [records, selectedId]);

  useEffect(() => {
    async function boot() {
      await ensureCsrf();
      const current = await studioFetch<StudioSession>("/api/studio/session");
      if (!current.authenticated) {
        router.push("/studio/login");
        return;
      }
      setSession(current);
    }

    boot().catch(() => router.push("/studio/login"));
  }, [router]);

  useEffect(() => {
    if (!session) return;
    loadRecords(active).catch((loadError: Error) => setError(loadError.message));
  }, [active, session]);

  useEffect(() => {
    setForm(selected ? { ...selected } : defaultRecord(active));
  }, [selected, active]);

  async function loadRecords(resource: Resource) {
    setError("");
    setMessage("");
    const data = await studioFetch<StudioRecord[]>(resource.endpoint);
    setRecords(data);
    const firstId = data[0]?.id;
    setSelectedId(firstId ?? "new");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const payload = buildPayload(active, form);
      const path = selectedId === "new" ? active.endpoint : `${active.endpoint}/${selectedId}`;
      const method = selectedId === "new" ? "POST" : "PUT";
      const saved = await studioFetch<StudioRecord>(path, { method, body: JSON.stringify(payload) });
      setMessage("Saved.");
      await loadRecords(active);
      setSelectedId(saved.id ?? "new");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Save failed.");
    }
  }

  async function removeRecord() {
    if (selectedId === "new") return;
    if (!confirm("Delete this record?")) return;
    setError("");
    await studioFetch(`${active.endpoint}/${selectedId}`, { method: "DELETE" });
    setMessage("Deleted.");
    await loadRecords(active);
  }

  async function logout() {
    await studioFetch("/api/studio/logout", { method: "POST", body: "{}" });
    router.push("/studio/login");
  }

  if (!session) {
    return <main className="flex min-h-screen items-center justify-center text-sm text-slate-600">Loading studio...</main>;
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white/80 p-4 shadow-sm md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Private Studio</p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-950">Portfolio manager</h1>
            <p className="mt-1 text-sm text-slate-600">Signed in as {session.username}. Manage all public portfolio content here.</p>
          </div>
          <button onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-lg border border-slate-200 bg-white/84 p-3 shadow-sm">
            <div className="mb-3 flex items-center justify-between px-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Content</span>
              <button onClick={() => loadRecords(active)} className="rounded-md p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-700" aria-label="Refresh">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-1">
              {resources.map((resource) => (
                <button
                  key={resource.endpoint}
                  onClick={() => setActive(resource)}
                  className={`rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                    active.endpoint === resource.endpoint ? "bg-blue-600 text-white shadow-glow" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {resource.label}
                </button>
              ))}
            </div>
          </aside>

          <section className="grid gap-5 xl:grid-cols-[320px_1fr]">
            <div className="rounded-lg border border-slate-200 bg-white/84 p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-950">{active.label}</h2>
                <button onClick={() => setSelectedId("new")} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700">
                  <Plus className="h-3.5 w-3.5" /> New
                </button>
              </div>
              <div className="grid max-h-[62vh] gap-2 overflow-auto pr-1">
                {records.map((record) => (
                  <button
                    key={record.id}
                    onClick={() => setSelectedId(record.id ?? "new")}
                    className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                      selectedId === record.id ? "border-blue-300 bg-blue-50 text-blue-800" : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
                    }`}
                  >
                    <span className="block truncate font-medium">{recordTitle(active, record)}</span>
                    <span className="text-xs text-slate-500">ID {record.id}</span>
                  </button>
                ))}
                {!records.length ? <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-500">No records yet.</p> : null}
              </div>
            </div>

            <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{selectedId === "new" ? `New ${active.label}` : recordTitle(active, form)}</h2>
                  <p className="text-sm text-slate-500">Edit fields and save to update the public site API.</p>
                </div>
                <div className="flex gap-2">
                  {selectedId !== "new" ? (
                    <button type="button" onClick={removeRecord} className="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  ) : null}
                  <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    <Save className="h-4 w-4" /> Save
                  </button>
                </div>
              </div>

              {message ? <p className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p> : null}
              {error ? <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

              <div className="grid gap-4 md:grid-cols-2">
                {active.fields.map((field) => (
                  <FieldEditor
                    key={field.key}
                    field={field}
                    value={form[field.key]}
                    onChange={(value) => setForm((current) => ({ ...current, [field.key]: value }))}
                  />
                ))}
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

function FieldEditor({ field, value, onChange }: { field: Field; value: unknown; onChange: (value: unknown) => void }) {
  const base = "mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100";

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700">
        <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600" />
        {field.label}
      </label>
    );
  }

  if (field.type === "textarea" || field.type === "json") {
    return (
      <label className="block text-sm font-medium text-slate-700 md:col-span-2">
        {field.label}
        <textarea
          required={field.required}
          value={stringValue(value, field)}
          onChange={(event) => onChange(field.type === "json" ? event.target.value : event.target.value)}
          rows={field.type === "json" ? 5 : 4}
          className={base}
        />
      </label>
    );
  }

  return (
    <label className="block text-sm font-medium text-slate-700">
      {field.label}
      <input
        required={field.required}
        type={field.type === "number" ? "number" : "text"}
        step={field.type === "number" ? "any" : undefined}
        value={stringValue(value, field)}
        onChange={(event) => onChange(field.type === "number" ? event.target.value : event.target.value)}
        className={base}
      />
    </label>
  );
}

function buildPayload(resource: Resource, form: StudioRecord) {
  const payload: StudioRecord = {};

  resource.fields.forEach((field) => {
    const value = form[field.key];

    if (field.type === "number") {
      payload[field.key] = value === "" || value === undefined ? 0 : Number(value);
      return;
    }

    if (field.type === "boolean") {
      payload[field.key] = Boolean(value);
      return;
    }

    if (field.type === "json") {
      payload[field.key] = typeof value === "string" && value.trim() ? JSON.parse(value) : [];
      return;
    }

    payload[field.key] = value ?? "";
  });

  return payload;
}

function defaultRecord(resource: Resource): StudioRecord {
  const record: StudioRecord = {};
  resource.fields.forEach((field) => {
    record[field.key] = field.type === "boolean" ? true : field.type === "number" ? 0 : field.type === "json" ? "[]" : "";
  });
  return record;
}

function recordTitle(resource: Resource, record: StudioRecord) {
  const raw = record[resource.titleKey];
  if (typeof raw === "string" && raw.trim()) {
    return raw.length > 70 ? `${raw.slice(0, 70)}...` : raw;
  }
  if (typeof raw === "number") {
    return `${resource.label} ${raw}`;
  }
  return `${resource.label} record`;
}

function stringValue(value: unknown, field: Field) {
  if (field.type === "json") {
    return typeof value === "string" ? value : JSON.stringify(value ?? [], null, 2);
  }
  if (typeof value === "number" || typeof value === "string") {
    return String(value);
  }
  return "";
}
