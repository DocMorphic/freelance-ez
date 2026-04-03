"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";
import styles from "./Toast.module.css";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface ImportOptions {
  title: string;
  description: string;
  placeholder?: string;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  promptImport: (options: ImportOptions) => Promise<string | null>;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

let nextId = 0;

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmState, setConfirmState] = useState<{
    options: ConfirmOptions;
    resolve: (value: boolean) => void;
  } | null>(null);
  const [importState, setImportState] = useState<{
    options: ImportOptions;
    resolve: (value: string | null) => void;
    text: string;
  } | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmState({ options, resolve });
    });
  }, []);

  const promptImport = useCallback((options: ImportOptions): Promise<string | null> => {
    return new Promise((resolve) => {
      setImportState({ options, resolve, text: "" });
    });
  }, []);

  function handleConfirm(result: boolean) {
    confirmState?.resolve(result);
    setConfirmState(null);
  }

  function handleImport(result: string | null) {
    importState?.resolve(result);
    setImportState(null);
  }

  return (
    <ToastContext.Provider value={{ showToast, confirm, promptImport }}>
      {children}

      {/* Toast container */}
      {toasts.length > 0 && (
        <div className={styles.container}>
          {toasts.map((t) => (
            <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
              {t.message}
              <button
                className={styles.dismissBtn}
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirm modal */}
      {confirmState && (
        <div className={styles.overlay} onClick={() => handleConfirm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>{confirmState.options.title}</h3>
            <p>{confirmState.options.message}</p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => handleConfirm(false)}>
                {confirmState.options.cancelLabel || "Cancel"}
              </button>
              <button className={styles.modalConfirm} onClick={() => handleConfirm(true)}>
                {confirmState.options.confirmLabel || "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import modal */}
      {importState && (
        <div className={styles.overlay} onClick={() => handleImport(null)}>
          <div className={styles.importModal} onClick={(e) => e.stopPropagation()}>
            <h3>{importState.options.title}</h3>
            <p>{importState.options.description}</p>
            <textarea
              className={styles.importTextarea}
              placeholder={importState.options.placeholder || "Paste here..."}
              value={importState.text}
              onChange={(e) => setImportState((prev) => prev ? { ...prev, text: e.target.value } : null)}
              autoFocus
            />
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => handleImport(null)}>
                Cancel
              </button>
              <button
                className={styles.modalConfirm}
                style={{ background: "#635bff" }}
                onClick={() => handleImport(importState.text)}
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
