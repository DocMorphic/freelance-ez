"use client";

import { useState } from "react";
import {
    Eye,
    Trash2,
    LogOut,
    Users,
    Clock,
    CheckCircle,
    MessageSquare,
    Filter,
    Phone,
    Mail,
    RefreshCw,
    Loader2,
    ShieldCheck,
    ArrowLeft,
} from "lucide-react";
import styles from "./AdminPage.module.css";

// --- Types ---

interface Inquiry {
    id: string;
    created_at: string;
    type: "buyer" | "seller" | "general";
    status: "new" | "contacted" | "in_progress" | "closed";
    name: string;
    company?: string;
    email: string;
    phone?: string;
    country?: string;
    metal_type?: string;
    quantity?: string;
    specifications?: string;
    message?: string;
}

type FilterType = "all" | "new" | "contacted" | "in_progress" | "closed";

// --- Mock Data ---

const MOCK_INQUIRIES: Inquiry[] = [
    {
        id: "inq-001",
        created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
        type: "buyer",
        status: "new",
        name: "Sarah Mitchell",
        company: "Northwest Trading Co.",
        email: "sarah@nwtradingco.com",
        phone: "+1 (503) 555-0189",
        country: "USA",
        metal_type: "Copper Cathode",
        quantity: "25 MT",
        specifications: "Looking for Grade A copper cathode, 99.99% purity. Need consistent monthly supply starting Q2. Please share your best CIF pricing for Portland, OR.",
    },
    {
        id: "inq-002",
        created_at: new Date(Date.now() - 18 * 3600000).toISOString(),
        type: "seller",
        status: "contacted",
        name: "Carlos Mendez",
        company: "Minera del Sur",
        email: "cmendez@mineradelsur.cl",
        phone: "+56 9 8765 4321",
        country: "Chile",
        metal_type: "Copper Concentrate",
        quantity: "500 MT/month",
        specifications: "We are a mid-size copper mine in Region III. Current production is 500 MT/month of copper concentrate at 28% Cu grade. Looking for offtake agreements.",
    },
    {
        id: "inq-003",
        created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
        type: "general",
        status: "in_progress",
        name: "James Park",
        email: "jpark@globalinsights.io",
        country: "South Korea",
        message: "Hi, I'm a market analyst covering base metals in the Asia-Pacific region. I'd like to discuss a potential partnership for market data sharing. Could we schedule a call next week?",
    },
    {
        id: "inq-004",
        created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
        type: "buyer",
        status: "closed",
        name: "Annika Weber",
        company: "Rheinmetall Recycling GmbH",
        email: "a.weber@rheinrecycling.de",
        phone: "+49 211 555 0042",
        country: "Germany",
        metal_type: "Aluminium Ingots",
        quantity: "100 MT",
        specifications: "Requirement for A7-grade aluminium ingots for our recycling facility. One-time purchase, delivery to Hamburg port. Deal completed successfully.",
    },
];

// --- Props ---

interface AdminPageProps {
    companyName: string;
    onBack?: () => void;
}

// --- Component ---

export default function AdminPage({ companyName, onBack }: AdminPageProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);
    const [filter, setFilter] = useState<FilterType>("all");
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        setIsLoggingIn(true);

        // Simulated login — any credentials work in template mode
        setTimeout(() => {
            setIsLoggedIn(true);
            setIsLoggingIn(false);
        }, 600);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail("");
        setPassword("");
        setInquiries(MOCK_INQUIRIES);
        setSelectedInquiry(null);
    };

    const handleStatusChange = (id: string, status: Inquiry["status"]) => {
        setInquiries((prev) =>
            prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
        if (selectedInquiry?.id === id) {
            setSelectedInquiry({ ...selectedInquiry, status });
        }
    };

    const handleDelete = (id: string) => {
        if (!window.confirm("Delete this inquiry? This cannot be undone.")) return;
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        if (selectedInquiry?.id === id) {
            setSelectedInquiry(null);
        }
    };

    const handleRefresh = () => {
        setIsLoading(true);
        // Simulate a refresh delay
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const filteredInquiries =
        filter === "all"
            ? inquiries
            : inquiries.filter((i) => i.status === filter);

    const statusCounts = {
        all: inquiries.length,
        new: inquiries.filter((i) => i.status === "new").length,
        contacted: inquiries.filter((i) => i.status === "contacted").length,
        in_progress: inquiries.filter((i) => i.status === "in_progress").length,
        closed: inquiries.filter((i) => i.status === "closed").length,
    };

    const buyerCount = inquiries.filter((i) => i.type === "buyer").length;
    const sellerCount = inquiries.filter((i) => i.type === "seller").length;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(hours / 24);

        if (hours < 1) return "Just now";
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getStatusColor = (status: Inquiry["status"]) => {
        switch (status) {
            case "new": return styles.statusNew;
            case "contacted": return styles.statusContacted;
            case "in_progress": return styles.statusInProgress;
            case "closed": return styles.statusClosed;
        }
    };

    const getStatusLabel = (status: Inquiry["status"]) => {
        switch (status) {
            case "new": return "New";
            case "contacted": return "Contacted";
            case "in_progress": return "In Progress";
            case "closed": return "Closed";
        }
    };

    const getTypeLabel = (type: Inquiry["type"]) => {
        switch (type) {
            case "buyer": return "Buyer";
            case "seller": return "Seller";
            case "general": return "General";
        }
    };

    const getTypeEmoji = (type: Inquiry["type"]) => {
        switch (type) {
            case "buyer": return "\uD83D\uDFE2";
            case "seller": return "\uD83D\uDD35";
            case "general": return "";
        }
    };

    const logoLetter = companyName.charAt(0).toUpperCase();

    // Login Screen
    if (!isLoggedIn) {
        return (
            <div className={styles.loginPage}>
                <div className={styles.loginCard}>
                    <div className={styles.loginHeader}>
                        <span className={styles.loginLogo}>{logoLetter}</span>
                        <h1>{companyName} Admin</h1>
                        <p>Sign in to manage inquiries &amp; transactions</p>
                    </div>
                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="admin-email">Email</label>
                            <input
                                type="email"
                                id="admin-email"
                                className={styles.formInput}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="admin-password">Password</label>
                            <input
                                type="password"
                                id="admin-password"
                                className={styles.formInput}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        {loginError && (
                            <p className={styles.loginError}>{loginError}</p>
                        )}
                        <button
                            type="submit"
                            className={styles.loginBtn}
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? (
                                <>
                                    <Loader2 size={16} className={styles.spinning} /> Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                    <div className={styles.loginSecure}>
                        <ShieldCheck size={14} />
                        <span>Secured admin panel</span>
                    </div>
                </div>
            </div>
        );
    }

    // Dashboard
    return (
        <div className={styles.dashboard}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <span className={styles.loginLogo}>{logoLetter}</span>
                    <div>
                        <span className={styles.sidebarTitle}>Admin Panel</span>
                        <span className={styles.sidebarEmail}>{email || "admin@demo.com"}</span>
                    </div>
                </div>

                {/* Quick stats: Buyers vs Sellers */}
                <div className={styles.quickStats}>
                    <div className={styles.quickStatItem}>
                        <span className={styles.quickStatLabel}>{"\uD83D\uDFE2"} Buyers</span>
                        <span className={styles.quickStatValue}>{buyerCount}</span>
                    </div>
                    <div className={styles.quickStatItem}>
                        <span className={styles.quickStatLabel}>{"\uD83D\uDD35"} Sellers</span>
                        <span className={styles.quickStatValue}>{sellerCount}</span>
                    </div>
                </div>

                <div className={styles.sidebarStats}>
                    <button
                        className={`${styles.statCard} ${filter === "all" ? styles.activeFilter : ""}`}
                        onClick={() => setFilter("all")}
                    >
                        <Users size={18} />
                        <span className={styles.statCount}>{statusCounts.all}</span>
                        <span>Total</span>
                    </button>
                    <button
                        className={`${styles.statCard} ${filter === "new" ? styles.activeFilter : ""}`}
                        onClick={() => setFilter("new")}
                    >
                        <Clock size={18} />
                        <span className={styles.statCount}>{statusCounts.new}</span>
                        <span>New</span>
                    </button>
                    <button
                        className={`${styles.statCard} ${filter === "in_progress" ? styles.activeFilter : ""}`}
                        onClick={() => setFilter("in_progress")}
                    >
                        <MessageSquare size={18} />
                        <span className={styles.statCount}>{statusCounts.in_progress}</span>
                        <span>Active</span>
                    </button>
                    <button
                        className={`${styles.statCard} ${filter === "closed" ? styles.activeFilter : ""}`}
                        onClick={() => setFilter("closed")}
                    >
                        <CheckCircle size={18} />
                        <span className={styles.statCount}>{statusCounts.closed}</span>
                        <span>Closed</span>
                    </button>
                </div>

                <div className={styles.sidebarActions}>
                    {onBack && (
                        <button className={styles.logoutBtn} onClick={onBack}>
                            <ArrowLeft size={14} /> Back to Site
                        </button>
                    )}
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                {/* Inquiry List */}
                <div className={styles.inquiryList}>
                    <div className={styles.listHeader}>
                        <h2>
                            <Filter size={18} />
                            {filter === "all" ? "All Inquiries" : getStatusLabel(filter as Inquiry["status"])}
                            <span className={styles.listCount}>({filteredInquiries.length})</span>
                        </h2>
                        <button className={styles.refreshBtn} onClick={handleRefresh} disabled={isLoading}>
                            {isLoading ? <Loader2 size={14} className={styles.spinning} /> : <RefreshCw size={14} />} Refresh
                        </button>
                    </div>

                    {filteredInquiries.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>No inquiries match this filter. They will appear here when someone submits the contact form.</p>
                        </div>
                    ) : (
                        <div className={styles.listItems}>
                            {filteredInquiries.map((inquiry) => (
                                <div
                                    key={inquiry.id}
                                    className={`${styles.listItem} ${selectedInquiry?.id === inquiry.id ? styles.listItemActive : ""}`}
                                    onClick={() => setSelectedInquiry(inquiry)}
                                >
                                    <div className={styles.listItemTop}>
                                        <span className={`${styles.typeBadge} ${styles[`type_${inquiry.type}`]}`}>
                                            {getTypeEmoji(inquiry.type)} {getTypeLabel(inquiry.type)}
                                        </span>
                                        <span className={`${styles.statusDot} ${getStatusColor(inquiry.status)}`}></span>
                                    </div>
                                    <div className={styles.listItemName}>{inquiry.name}</div>
                                    <div className={styles.listItemMeta}>
                                        {inquiry.company && <span>{inquiry.company}</span>}
                                        {inquiry.country && <span>{inquiry.country}</span>}
                                        <span>{formatDate(inquiry.created_at)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Detail Panel */}
                <div className={`${styles.detailPanel} ${selectedInquiry ? styles.detailPanelOpen : ""}`}>
                    {selectedInquiry ? (
                        <>
                            <div className={styles.detailHeader}>
                                <button
                                    className={styles.backBtn}
                                    onClick={() => setSelectedInquiry(null)}
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <div>
                                    <h2>{selectedInquiry.name}</h2>
                                    <p>{selectedInquiry.company || "No company"}</p>
                                </div>
                                <div className={styles.detailActions}>
                                    <span className={`${styles.typeBadgeLarge} ${styles[`type_${selectedInquiry.type}`]}`}>
                                        {getTypeEmoji(selectedInquiry.type)} {getTypeLabel(selectedInquiry.type)}
                                    </span>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(selectedInquiry.id)}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className={styles.detailBody}>
                                {/* Status */}
                                <div className={styles.detailSection}>
                                    <h4>Status</h4>
                                    <div className={styles.statusButtons}>
                                        {(["new", "contacted", "in_progress", "closed"] as const).map(
                                            (status) => (
                                                <button
                                                    key={status}
                                                    className={`${styles.statusBtn} ${selectedInquiry.status === status ? styles.statusBtnActive : ""} ${getStatusColor(status)}`}
                                                    onClick={() =>
                                                        handleStatusChange(selectedInquiry.id, status)
                                                    }
                                                >
                                                    {getStatusLabel(status)}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className={styles.detailSection}>
                                    <h4>Contact</h4>
                                    <div className={styles.contactInfo}>
                                        {selectedInquiry.phone && (
                                            <a href={`tel:${selectedInquiry.phone}`} className={styles.contactLink}>
                                                <Phone size={16} /> {selectedInquiry.phone}
                                            </a>
                                        )}
                                        <a href={`mailto:${selectedInquiry.email}`} className={styles.contactLink}>
                                            <Mail size={16} /> {selectedInquiry.email}
                                        </a>
                                        {selectedInquiry.phone && (
                                            <a
                                                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=Hello ${selectedInquiry.name}, regarding your inquiry on ${companyName}...`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.whatsappBtn}
                                            >
                                                WhatsApp
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Inquiry Type & Details */}
                                <div className={styles.detailSection}>
                                    <h4>Inquiry Details</h4>
                                    <div className={styles.detailGrid}>
                                        <div>
                                            <span className={styles.detailLabel}>Type</span>
                                            <span className={styles.detailValue}>
                                                {getTypeEmoji(selectedInquiry.type)} {getTypeLabel(selectedInquiry.type)}
                                            </span>
                                        </div>
                                        {selectedInquiry.country && (
                                            <div>
                                                <span className={styles.detailLabel}>Country</span>
                                                <span className={styles.detailValue}>
                                                    {selectedInquiry.country}
                                                </span>
                                            </div>
                                        )}
                                        {selectedInquiry.metal_type && (
                                            <div>
                                                <span className={styles.detailLabel}>Product</span>
                                                <span className={styles.detailValue}>
                                                    {selectedInquiry.metal_type}
                                                </span>
                                            </div>
                                        )}
                                        {selectedInquiry.quantity && (
                                            <div>
                                                <span className={styles.detailLabel}>Quantity</span>
                                                <span className={styles.detailValue}>
                                                    {selectedInquiry.quantity}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <span className={styles.detailLabel}>Received</span>
                                            <span className={styles.detailValue}>
                                                {new Date(selectedInquiry.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Message / Specifications */}
                                {(selectedInquiry.specifications || selectedInquiry.message) && (
                                    <div className={styles.detailSection}>
                                        <h4>
                                            {selectedInquiry.type === "general"
                                                ? "Message"
                                                : "Specifications"}
                                        </h4>
                                        <p className={styles.detailMessage}>
                                            {selectedInquiry.specifications || selectedInquiry.message}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyDetail}>
                            <Eye size={48} />
                            <p>Select an inquiry to view details</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
