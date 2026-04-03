"use client";

import { MessageCircle } from "lucide-react";
import styles from "./WhatsAppButton.module.css";

interface WhatsAppButtonProps {
  number: string;
  message: string;
}

export default function WhatsAppButton({ number, message }: WhatsAppButtonProps) {
  const cleanNumber = number.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappBtn}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
