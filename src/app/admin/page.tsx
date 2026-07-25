"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { getProjects, addProject, updateProject, deleteProject } from "@/lib/projects";
import { getProfile, updateProfile } from "@/lib/profile";
import { uploadToCloudinary } from "@/lib/upload";
import { Project, Profile, StackCategory, Stack } from "@/lib/types";

const defaultProfile: Profile = {
  name: "", title: "", bio: "", presentation: "", avatarUrl: "",
  email: "", phone: "", github: "", linkedin: "", twitter: "", location: "",
  stacks: [],
};

const CATEGORIES = [
  { id: "mobile", label: "Mobile App", icon: "📱" },
  { id: "web", label: "Website", icon: "🌐" },
  { id: "ui", label: "UI Design", icon: "🎨" },
  { id: "other", label: "Other", icon: "💡" },
];

export default function AdminPage() {
  const { user, loading: authLoading, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"projects" | "profile" | "stacks">("projects");

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const [form, setForm] = useState({
    title: "", description: "", content: "", imageUrl: "", videoUrl: "",
    tags: "", link: "", github: "", featured: false, category: "mobile",
  });

  useEffect(() => {
    if (user) {
      (async () => {
        setLoading(true);
        try {
          const [projectsData, profileData] = await Promise.all([getProjects(), getProfile()]);
          setProjects(projectsData);
          if (profileData) setProfile({ ...defaultProfile, ...profileData });
        } catch (err) { console.error(err); }
        setLoading(false);
      })();
    }
  }, [user]);

  const loadProjects = async () => {
    setLoading(true);
    try { setProjects(await getProjects()); } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try { await login(email, password); } catch { setError("Identifiants incorrects"); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setUploadProgress("Upload de l'image...");
    try {
      const url = await uploadToCloudinary(file);
      setForm((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) { console.error(err); alert("Erreur upload"); }
    setUploading(false); setUploadProgress("");
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setUploadProgress("Upload de la video...");
    try {
      const url = await uploadToCloudinary(file);
      setForm((prev) => ({ ...prev, videoUrl: url }));
    } catch (err) { console.error(err); alert("Erreur upload"); }
    setUploading(false); setUploadProgress("");
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setUploadProgress("Upload de l'avatar...");
    try {
      const url = await uploadToCloudinary(file);
      setProfile((prev) => ({ ...prev, avatarUrl: url }));
    } catch (err) { console.error(err); alert("Erreur upload"); }
    setUploading(false); setUploadProgress("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) return;
    const data = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
    try {
      if (editingProject) await updateProject(editingProject.id, data);
      else await addProject(data);
      setShowForm(false); setEditingProject(null); resetForm(); loadProjects();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title, description: project.description, content: project.content,
      imageUrl: project.imageUrl, videoUrl: project.videoUrl || "",
      tags: project.tags.join(", "), link: project.link || "", github: project.github || "",
      featured: project.featured, category: project.category || "mobile",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer ce projet ?")) { await deleteProject(id); loadProjects(); }
  };

  const handleSaveProfile = async () => {
    setProfileSaving(true);
    try { await updateProfile(profile); setProfileSaved(true); setTimeout(() => setProfileSaved(false), 3000); }
    catch (err) { console.error(err); alert("Erreur sauvegarde"); }
    setProfileSaving(false);
  };

  const resetForm = () => {
    setForm({ title: "", description: "", content: "", imageUrl: "", videoUrl: "", tags: "", link: "", github: "", featured: false, category: "mobile" });
  };

  // Stacks management
  const addStackCategory = () => {
    setProfile((prev) => ({
      ...prev,
      stacks: [...(prev.stacks || []), { title: "Nouvelle categorie", icon: "📦", skills: [] }],
    }));
  };

  const updateStackCategory = (catIndex: number, field: keyof StackCategory, value: string) => {
    setProfile((prev) => ({
      ...prev,
      stacks: prev.stacks.map((cat, i) => i === catIndex ? { ...cat, [field]: value } : cat),
    }));
  };

  const removeStackCategory = (catIndex: number) => {
    setProfile((prev) => ({ ...prev, stacks: prev.stacks.filter((_, i) => i !== catIndex) }));
  };

  const addSkill = (catIndex: number) => {
    setProfile((prev) => ({
      ...prev,
      stacks: prev.stacks.map((cat, i) => i === catIndex
        ? { ...cat, skills: [...cat.skills, { name: "Nouvelle competence", level: 80, icon: "⭐" }] }
        : cat),
    }));
  };

  const updateSkill = (catIndex: number, skillIndex: number, field: keyof Stack, value: string | number) => {
    setProfile((prev) => ({
      ...prev,
      stacks: prev.stacks.map((cat, i) => i === catIndex
        ? { ...cat, skills: cat.skills.map((s, j) => j === skillIndex ? { ...s, [field]: value } : s) }
        : cat),
    }));
  };

  const removeSkill = (catIndex: number, skillIndex: number) => {
    setProfile((prev) => ({
      ...prev,
      stacks: prev.stacks.map((cat, i) => i === catIndex
        ? { ...cat, skills: cat.skills.filter((_, j) => j !== skillIndex) }
        : cat),
    }));
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 transition-colors text-sm";

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-[#080810]"><div className="text-gray-400">Loading...</div></div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080810]">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">Admin</h1>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} required />
          <button type="submit" className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080810]">
      <header className="border-b border-white/5 bg-[#080810]/90 backdrop-blur-xl px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-white">Admin</h1>
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-white/5">
              {(["projects", "stacks", "profile"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}>
                  {t === "projects" ? "Projets" : t === "stacks" ? "Stacks" : "Profil"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
            <button onClick={logout} className="text-sm text-gray-400 hover:text-white transition-colors">Logout</button>
          </div>
        </div>
      </header>

      <div className="sm:hidden flex items-center gap-1 p-2 mx-6 mt-4 rounded-xl bg-white/5">
        {(["projects", "stacks", "profile"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? "bg-white text-black" : "text-gray-400"}`}>
            {t === "projects" ? "Projets" : t === "stacks" ? "Stacks" : "Profil"}
          </button>
        ))}
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {uploadProgress && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl text-white text-sm flex items-center gap-3">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {uploadProgress}
          </div>
        )}

        {/* PROJECTS TAB */}
        {tab === "projects" && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Projets</h2>
              <button onClick={() => { setEditingProject(null); resetForm(); setShowForm(true); }}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors">+ Ajouter</button>
            </div>

            {showForm && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0c0c14] border border-white/5 rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">{editingProject ? "Modifier" : "Nouveau projet"}</h3>
                    <button onClick={() => setShowForm(false)} className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm mb-2 font-medium text-gray-300">Titre *</label>
                        <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} required />
                      </div>
                      <div>
                        <label className="block text-sm mb-2 font-medium text-gray-300">Categorie *</label>
                        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                          className={inputClass + " appearance-none"}>
                          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                        </select>
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer w-full">
                          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" />
                          <span className="text-sm text-gray-300">Featured</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-2 font-medium text-gray-300">Description *</label>
                      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass + " min-h-[80px]"} required />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 font-medium text-gray-300">Contenu *</label>
                      <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={inputClass + " min-h-[120px]"} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2 font-medium text-gray-300">Image</label>
                        <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <button type="button" onClick={() => imageInputRef.current?.click()} disabled={uploading}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-sm disabled:opacity-50">
                          {form.imageUrl ? "Image selectionnee ✓" : "Choisir une image"}
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm mb-2 font-medium text-gray-300">Video</label>
                        <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                        <button type="button" onClick={() => videoInputRef.current?.click()} disabled={uploading}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-sm disabled:opacity-50">
                          {form.videoUrl ? "Video selectionnee ✓" : "Choisir une video"}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2 font-medium text-gray-300">Tags (virgules)</label>
                      <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        className={inputClass} placeholder="React Native, Firebase, TypeScript" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2 font-medium text-gray-300">Lien</label>
                        <input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className={inputClass} placeholder="https://..." />
                      </div>
                      <div>
                        <label className="block text-sm mb-2 font-medium text-gray-300">GitHub</label>
                        <input type="url" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} className={inputClass} placeholder="https://github.com/..." />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button type="submit" disabled={uploading} className="px-8 py-3 rounded-xl bg-white text-black font-semibold disabled:opacity-50">
                        {uploading ? "Upload..." : editingProject ? "Mettre a jour" : "Creer"}
                      </button>
                      <button type="button" onClick={() => { setShowForm(false); setEditingProject(null); }}
                        className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors">Annuler</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-16 text-gray-500">Loading...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20 rounded-2xl bg-white/[0.02] border border-white/5"><p className="text-gray-500">Aucun projet</p></div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                    {project.imageUrl && (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                        <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                          {CATEGORIES.find((c) => c.id === project.category)?.icon} {CATEGORIES.find((c) => c.id === project.category)?.label || project.category}
                        </span>
                        {project.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400">Featured</span>}
                      </div>
                      <h3 className="font-bold text-white truncate">{project.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(project)} className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="p-2.5 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* STACKS TAB */}
        {tab === "stacks" && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Mes Stacks</h2>
              <div className="flex gap-3">
                <button onClick={addStackCategory}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">+ Categorie</button>
                <button onClick={handleSaveProfile} disabled={profileSaving}
                  className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-sm disabled:opacity-50">
                  {profileSaving ? "Saving..." : profileSaved ? "Saved!" : "Save"}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {(profile.stacks || []).map((cat, catIndex) => (
                <div key={catIndex} className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <input type="text" value={cat.icon} onChange={(e) => updateStackCategory(catIndex, "icon", e.target.value)}
                      className="w-14 text-center px-2 py-2 rounded-xl bg-white/5 border border-white/10 text-2xl" />
                    <input type="text" value={cat.title} onChange={(e) => updateStackCategory(catIndex, "title", e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold" />
                    <button onClick={() => removeStackCategory(catIndex)}
                      className="p-2 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cat.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center gap-3">
                        <input type="text" value={skill.icon} onChange={(e) => updateSkill(catIndex, skillIndex, "icon", e.target.value)}
                          className="w-12 text-center px-2 py-2 rounded-lg bg-white/5 border border-white/10 text-lg" />
                        <input type="text" value={skill.name} onChange={(e) => updateSkill(catIndex, skillIndex, "name", e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm" />
                        <input type="number" value={skill.level} onChange={(e) => updateSkill(catIndex, skillIndex, "level", parseInt(e.target.value) || 0)}
                          className="w-20 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm text-center" min="0" max="100" />
                        <span className="text-gray-500 text-sm">%</span>
                        <button onClick={() => removeSkill(catIndex, skillIndex)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => addSkill(catIndex)}
                    className="mt-4 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                    + Ajouter une competence
                  </button>
                </div>
              ))}

              {(!profile.stacks || profile.stacks.length === 0) && (
                <div className="text-center py-20 rounded-2xl bg-white/[0.02] border border-white/5">
                      <p className="text-gray-500">Aucune stack. Cliquez sur &quot;+ Categorie&quot; pour commencer.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* PROFILE TAB */}
        {tab === "profile" && (
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Mon profil</h2>
              <button onClick={handleSaveProfile} disabled={profileSaving}
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-sm disabled:opacity-50">
                {profileSaving ? "Saving..." : profileSaved ? "Saved!" : "Save"}
              </button>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
                <h3 className="font-bold text-white mb-5">Avatar</h3>
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                    {profile.avatarUrl ? <Image src={profile.avatarUrl} alt="Avatar" fill className="object-cover" /> :
                      <div className="w-full h-full bg-gradient-to-br from-accent/30 to-pink-500/20 flex items-center justify-center"><span className="text-2xl font-bold text-accent">{(profile.name || "U").charAt(0)}</span></div>}
                  </div>
                  <div>
                    <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                    <button onClick={() => avatarInputRef.current?.click()} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-sm">Choisir un avatar</button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
                <h3 className="font-bold text-white mb-5">Informations</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm mb-2 text-gray-400">Nom</label><input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={inputClass} /></div>
                    <div><label className="block text-sm mb-2 text-gray-400">Titre</label><input type="text" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} className={inputClass} placeholder="Mobile Developer & UI/UX Designer" /></div>
                  </div>
                  <div><label className="block text-sm mb-2 text-gray-400">Presentation</label><textarea value={profile.presentation} onChange={(e) => setProfile({ ...profile, presentation: e.target.value })} className={inputClass + " min-h-[100px]"} /></div>
                  <div><label className="block text-sm mb-2 text-gray-400">Bio</label><textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className={inputClass + " min-h-[100px]"} /></div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
                <h3 className="font-bold text-white mb-5">Contact</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm mb-2 text-gray-400">Email</label><input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className={inputClass} /></div>
                    <div><label className="block text-sm mb-2 text-gray-400">Telephone</label><input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className={inputClass} /></div>
                  </div>
                  <div><label className="block text-sm mb-2 text-gray-400">Localisation</label><input type="text" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className={inputClass} /></div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
                <h3 className="font-bold text-white mb-5">Reseaux</h3>
                <div className="space-y-4">
                  <div><label className="block text-sm mb-2 text-gray-400">GitHub</label><input type="url" value={profile.github} onChange={(e) => setProfile({ ...profile, github: e.target.value })} className={inputClass} placeholder="https://github.com/..." /></div>
                  <div><label className="block text-sm mb-2 text-gray-400">LinkedIn</label><input type="url" value={profile.linkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} className={inputClass} placeholder="https://linkedin.com/in/..." /></div>
                  <div><label className="block text-sm mb-2 text-gray-400">Twitter / X</label><input type="url" value={profile.twitter} onChange={(e) => setProfile({ ...profile, twitter: e.target.value })} className={inputClass} placeholder="https://x.com/..." /></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
