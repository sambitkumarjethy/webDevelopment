import { useState } from "react";
import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCamera,
  FaUser,
  FaTimes,
} from "react-icons/fa";
import Modal from "../common/Modal";
import api from "../../api/axios";

const STEPS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Security" },
  { id: 3, label: "Roles" },
];

// Swap for a GET /api/roles fetch once that's wired up
const AVAILABLE_ROLES = [
  { id: "admin", name: "Admin", description: "Full access to all masters" },
  { id: "editor", name: "Editor", description: "Can create and edit records" },
  { id: "viewer", name: "Viewer", description: "Read-only access" },
];

const MAX_AVATAR_MB = 2;

const initialForm = {
  username: "",
  name: "",
  email: "",
  authSource: "local",
  password: "",
  confirmPassword: "",
  ldapDn: "",
  roleIds: [],
  avatarFile: null,
  avatarPreview: "",
};

function UserAddModal({ isOpen, onClose, onCreated }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const reset = () => {
    if (form.avatarPreview) URL.revokeObjectURL(form.avatarPreview);
    setStep(1);
    setForm(initialForm);
    setErrors({});
    setSubmitError("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleRole = (roleId) => {
    setForm((prev) => ({
      ...prev,
      roleIds: prev.roleIds.includes(roleId)
        ? prev.roleIds.filter((id) => id !== roleId)
        : [...prev.roleIds, roleId],
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, avatar: "Please choose an image file" }));
      return;
    }
    if (file.size > MAX_AVATAR_MB * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        avatar: `Image must be under ${MAX_AVATAR_MB}MB`,
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, avatar: undefined }));
    setForm((prev) => {
      if (prev.avatarPreview) URL.revokeObjectURL(prev.avatarPreview);
      return {
        ...prev,
        avatarFile: file,
        avatarPreview: URL.createObjectURL(file),
      };
    });
  };

  const removeAvatar = () => {
    setForm((prev) => {
      if (prev.avatarPreview) URL.revokeObjectURL(prev.avatarPreview);
      return { ...prev, avatarFile: null, avatarPreview: "" };
    });
  };

  const validateStep = (current) => {
    const next = {};
    if (current === 1) {
      if (!form.username.trim()) next.username = "Username is required";
      if (!form.name.trim()) next.name = "Name is required";
      if (!/^\S+@\S+\.\S+$/.test(form.email))
        next.email = "Enter a valid email";
    }
    if (current === 2) {
      if (form.authSource === "local") {
        if (form.password.length < 8) next.password = "Minimum 8 characters";
        if (form.password !== form.confirmPassword)
          next.confirmPassword = "Passwords do not match";
      } else if (!form.ldapDn.trim()) {
        next.ldapDn = "LDAP distinguished name is required";
      }
    }
    if (current === 3) {
      if (form.roleIds.length === 0) next.roleIds = "Assign at least one role";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () =>
    validateStep(step) && setStep((s) => Math.min(s + 1, STEPS.length));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = new FormData();
      payload.append("username", form.username);
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("authSource", form.authSource);
      if (form.authSource === "local") {
        payload.append("password", form.password);
      } else {
        payload.append("ldapDn", form.ldapDn);
      }
      form.roleIds.forEach((id) => payload.append("roleIds[]", id));
      if (form.avatarFile) payload.append("avatar", form.avatarFile);

      console.log({ form, payload });

      for (const [key, value] of payload.entries()) {
        console.log(key, value);
      }

      const { data } = await api.post("/users", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      //const { data } = await api.post("/users", payload);
      onCreated?.(data);
      handleClose();
    } catch (err) {
      setSubmitError(
        err?.response?.data?.error || "Failed to create user. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add user">
      {/* Step indicator */}
      <div className="mb-6 flex items-center">
        {STEPS.map((s, idx) => (
          <div key={s.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium transition-colors ${
                  step > s.id
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : step === s.id
                      ? "border-emerald-600 text-emerald-600"
                      : "border-slate-300 text-slate-400 dark:border-slate-600"
                }`}
              >
                {step > s.id ? <FaCheck size={10} /> : s.id}
              </div>
              <span
                className={`text-xs ${
                  step >= s.id
                    ? "text-slate-700 dark:text-slate-200"
                    : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`mx-2 h-px flex-1 ${
                  step > s.id
                    ? "bg-emerald-600"
                    : "bg-slate-200 dark:bg-slate-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          {/* Profile picture */}
          <div className="mb-2 flex justify-center">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-900">
                {form.avatarPreview ? (
                  <img
                    src={form.avatarPreview}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaUser className="text-slate-400" size={28} />
                )}
              </div>

              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow hover:bg-emerald-700"
                title="Upload photo"
              >
                <FaCamera size={12} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />

              {form.avatarPreview && (
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-500 text-white shadow hover:bg-slate-600"
                  title="Remove photo"
                >
                  <FaTimes size={10} />
                </button>
              )}
            </div>
          </div>
          {errors.avatar && (
            <p className="-mt-2 text-center text-xs text-red-500">
              {errors.avatar}
            </p>
          )}

          <Field
            label="Username"
            value={form.username}
            onChange={(v) => update("username", v)}
            error={errors.username}
          />
          <Field
            label="Full name"
            value={form.name}
            onChange={(v) => update("name", v)}
            error={errors.name}
          />
          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-600 dark:text-slate-400">
              Authentication source
            </label>
            <div className="flex gap-3">
              {["local", "ldap"].map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => update("authSource", src)}
                  className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${
                    form.authSource === src
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-600/10 dark:text-emerald-400"
                      : "border-slate-300 text-slate-500 hover:border-slate-400 dark:border-slate-600"
                  }`}
                >
                  {src === "local" ? "Local account" : "LDAP directory"}
                </button>
              ))}
            </div>
          </div>

          {form.authSource === "local" ? (
            <>
              <Field
                label="Password"
                type="password"
                value={form.password}
                onChange={(v) => update("password", v)}
                error={errors.password}
              />
              <Field
                label="Confirm password"
                type="password"
                value={form.confirmPassword}
                onChange={(v) => update("confirmPassword", v)}
                error={errors.confirmPassword}
              />
            </>
          ) : (
            <Field
              label="LDAP distinguished name"
              placeholder="uid=jdoe,ou=people,dc=company,dc=com"
              value={form.ldapDn}
              onChange={(v) => update("ldapDn", v)}
              error={errors.ldapDn}
            />
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-600 dark:text-slate-400">
              Assign roles
            </label>
            <div className="space-y-2">
              {AVAILABLE_ROLES.map((role) => (
                <label
                  key={role.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors ${
                    form.roleIds.includes(role.id)
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-600/10"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.roleIds.includes(role.id)}
                    onChange={() => toggleRole(role.id)}
                    className="mt-1 accent-emerald-600"
                  />
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-200">
                      {role.name}
                    </p>
                    <p className="text-xs text-slate-500">{role.description}</p>
                  </div>
                </label>
              ))}
            </div>
            {errors.roleIds && (
              <p className="mt-1 text-xs text-red-500">{errors.roleIds}</p>
            )}
          </div>

          <div className="space-y-1 border-t border-slate-200 pt-4 text-sm dark:border-slate-700">
            <p className="mb-2 text-slate-400">Review</p>
            <Review label="Username" value={form.username} />
            <Review label="Name" value={form.name} />
            <Review label="Email" value={form.email} />
            <Review
              label="Auth source"
              value={
                form.authSource === "local" ? "Local account" : "LDAP directory"
              }
            />
            <Review
              label="Photo"
              value={form.avatarFile ? form.avatarFile.name : "Not set"}
            />
          </div>

          {submitError && <p className="text-sm text-red-500">{submitError}</p>}
        </div>
      )}

      <div className="mt-6 flex justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 1}
          className="flex items-center gap-1.5 px-4 py-2 text-sm text-slate-500 hover:text-slate-700 disabled:opacity-0 dark:text-slate-400"
        >
          <FaChevronLeft size={12} /> Back
        </button>

        {step < STEPS.length ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Continue <FaChevronRight size={12} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create user"}
          </button>
        )}
      </div>
    </Modal>
  );
}

function Field({ label, value, onChange, error, type = "text", placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:bg-slate-900 dark:text-white ${
          error ? "border-red-500" : "border-slate-300 dark:border-slate-600"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Review({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-700 dark:text-slate-200">{value || "—"}</span>
    </div>
  );
}

export default UserAddModal;
