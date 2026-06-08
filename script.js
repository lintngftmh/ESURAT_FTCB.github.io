// CONFIG: Ganti dengan URL Web App dari Google Apps Script Anda
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbymwOT4u7yAOo5Rl7WPWjUqwdRaDC1q7OvbTtgUvIc1xFWhSc730M2BmgBdzacowDFY/exec";

// Database keys
const STORAGE_KEYS = {
    SURAT_MASUK: 'suratMasuk',
    SURAT_KELUAR: 'suratKeluar',
    PERINTAH_KERJA: 'perintahKerja',
    CURRENT_USER: 'currentUser',
    INSTANSI: 'namaInstansi',
    NOTIF_LOGS: 'notificationLogs'
};

// Fungsi Sinkronisasi ke Google Sheets
async function syncToCloud(sheetName, data) {
    if (SCRIPT_URL === "MASUKKAN_URL_WEBAPP_GAS_ANDA_DISINI") return;

    try {
        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Penting untuk GAS
            body: JSON.stringify({
                action: 'saveAll',
                sheet: sheetName,
                data: data
            })
        });
        console.log(`Synced ${sheetName} to cloud`);
    } catch (e) {
        console.error("Sync failed:", e);
    }
}

async function fetchFromCloud(sheetName) {
    if (SCRIPT_URL === "MASUKKAN_URL_WEBAPP_GAS_ANDA_DISINI") return null;

    try {
        const response = await fetch(`${SCRIPT_URL}?action=read&sheet=${sheetName}`, {
            method: 'GET',
            redirect: 'follow'
        });

        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (e) {
        console.error("Fetch failed for " + sheetName + ":", e);
        return null;
    }
}

// Initialize data if empty (with high-quality initial mock data for premium experience)
// Initialize data if empty (with high-quality initial mock data for premium experience)
function initData() {
    const existingLogs = localStorage.getItem(STORAGE_KEYS.NOTIF_LOGS);
    if (!existingLogs || JSON.parse(existingLogs).length === 0) {
        const defaultNotifLogs = [
            {
                message: `halo,

ada perubahan berkas pada system E-Surat oleh admin:

perintah kerja sudah berhasil diunggah:

1. nomor surat: -
2. perihal: Melakukan inventarisasi dan pengecekan AC di Laboratorium Komputer Gedung C Lantai 2.
3. unit: Wakil Dekan Sumber Daya
4. tanggal: 05 Juni 2026 - 16.45 WIB
5. file: <a href="" download="Pengecekan_AC_LabC.pdf" class="file-link" style="color: #0C599A; font-weight: bold; text-decoration: underline;">📄 Pengecekan_AC_LabC.pdf</a>

salam,
E-Surat Apps System`
            },
            {
                message: `halo,

ada perubahan berkas pada system E-Surat oleh staff:

surat masuk sudah berhasil diunggah:

1. nomor surat: 105/FT-CB/SM/VI/2026
2. perihal: Pagu Anggaran Kegiatan Kemahasiswaan Semester Ganjil
3. unit: Biro Keuangan Pusat
4. tanggal: 03 Juni 2026 - 14.15 WIB
5. file: <a href="" download="Pagu_Anggaran_Mhs.pdf" class="file-link" style="color: #0C599A; font-weight: bold; text-decoration: underline;">📄 Pagu_Anggaran_Mhs.pdf</a>

salam,
E-Surat Apps System`
            },
            {
                message: `halo,

ada perubahan berkas pada system E-Surat oleh admin:

surat keluar sudah berhasil diunggah:

1. nomor surat: 045/FT-CB/SK/VI/2026
2. perihal: Surat Izin Pelaksanaan Seminar Nasional TechTrend 2026
3. unit: Himpunan Mahasiswa Teknik Informatika
4. tanggal: 02 Juni 2026 - 09.30 WIB
5. file: <a href="" download="Izin_Seminar_TechTrend.pdf" class="file-link" style="color: #0C599A; font-weight: bold; text-decoration: underline;">📄 Izin_Seminar_TechTrend.pdf</a>

salam,
E-Surat Apps System`
            },
            {
                message: `halo,

ada perubahan berkas pada system E-Surat oleh admin:

surat masuk sudah berhasil diunggah:

1. nomor surat: 102/FT-CB/SM/VI/2026
2. perihal: Undangan Rapat Koordinasi Kurikulum OBE Baru
3. unit: Direktorat Akademik Universitas
4. tanggal: 01 Juni 2026 - 10.00 WIB
5. file: <a href="" download="Undangan_Rapat_OBE.pdf" class="file-link" style="color: #0C599A; font-weight: bold; text-decoration: underline;">📄 Undangan_Rapat_OBE.pdf</a>

salam,
E-Surat Apps System`
            }
        ];
        localStorage.setItem(STORAGE_KEYS.NOTIF_LOGS, JSON.stringify(defaultNotifLogs));
    }

    if (!localStorage.getItem(STORAGE_KEYS.SURAT_MASUK)) {
        const defaultSuratMasuk = [
            {
                id: 1717800000001,
                no: "102/FT-CB/SM/VI/2026",
                tanggal: "01 Juni 2026 - 10.00 WIB",
                unit: "Direktorat Akademik Universitas",
                perihal: "Undangan Rapat Koordinasi Kurikulum OBE Baru",
                fileData: "",
                fileName: "Undangan_Rapat_OBE.pdf",
                uploader: "Admin"
            },
            {
                id: 1717800000002,
                no: "105/FT-CB/SM/VI/2026",
                tanggal: "03 Juni 2026 - 14.15 WIB",
                unit: "Biro Keuangan Pusat",
                perihal: "Pagu Anggaran Kegiatan Kemahasiswaan Semester Ganjil",
                fileData: "",
                fileName: "Pagu_Anggaran_Mhs.pdf",
                uploader: "Staff"
            }
        ];
        localStorage.setItem(STORAGE_KEYS.SURAT_MASUK, JSON.stringify(defaultSuratMasuk));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SURAT_KELUAR)) {
        const defaultSuratKeluar = [
            {
                id: 1717800000003,
                no: "045/FT-CB/SK/VI/2026",
                tanggal: "02 Juni 2026 - 09.30 WIB",
                unit: "Himpunan Mahasiswa Teknik Informatika",
                perihal: "Surat Izin Pelaksanaan Seminar Nasional TechTrend 2026",
                fileData: "",
                fileName: "Izin_Seminar_TechTrend.pdf",
                uploader: "Admin"
            }
        ];
        localStorage.setItem(STORAGE_KEYS.SURAT_KELUAR, JSON.stringify(defaultSuratKeluar));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PERINTAH_KERJA)) {
        const defaultPerintahKerja = [
            {
                id: 1717800000004,
                tanggal: "05 Juni 2026 - 16.45 WIB",
                dari: "Wakil Dekan Sumber Daya",
                keterangan: "Melakukan inventarisasi dan pengecekan AC di Laboratorium Komputer Gedung C Lantai 2.",
                fileData: "",
                fileName: "Pengecekan_AC_LabC.pdf",
                status: "sedang_diproses",
                uploader: "Admin"
            }
        ];
        localStorage.setItem(STORAGE_KEYS.PERINTAH_KERJA, JSON.stringify(defaultPerintahKerja));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INSTANSI)) {
        localStorage.setItem(STORAGE_KEYS.INSTANSI, 'FAKULTAS TEKNIK CERDAS DAN BERKELANJUTAN');
    }
}

// Helper: Ambil tanggal sistem dalam format YYYY-MM-DD untuk input HTML5 date
function getSystemDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
}

// Helper: Dapatkan singkatan zona waktu lokal perangkat
function getLocalTimezoneAbbreviation() {
    const tzString = new Date().toTimeString();
    const offset = -new Date().getTimezoneOffset() / 60;
    if (offset === 7) return 'WIB';
    if (offset === 8) return 'WITA';
    if (offset === 9) return 'WIT';
    
    const match = tzString.match(/\(([^)]+)\)/);
    if (match) {
        const abbrev = match[1].split(' ').map(word => word[0]).join('');
        if (abbrev && abbrev.length <= 4) return abbrev;
    }
    return `GMT${offset >= 0 ? '+' : ''}${offset}`;
}

// Helper: Format tanggal & waktu ke (DD Bulan YYYY - HH.MM WIB)
function formatDateTime(date = new Date()) {
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const day = String(date.getDate()).padStart(2, '0');
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const tz = getLocalTimezoneAbbreviation();
    return `${day} ${monthName} ${year} - ${hours}.${minutes} ${tz}`;
}

// Helper: Konversi dari format YYYY-MM-DD input date ke (DD Bulan YYYY - HH.MM WIB)
function formatInputDate(dateStr) {
    if (!dateStr) return formatDateTime(new Date());
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const tz = getLocalTimezoneAbbreviation();
    
    return `${day} ${months[monthIndex]} ${year} - ${hours}.${minutes} ${tz}`;
}

// Helper: Konversi kembali format (DD Bulan YYYY - HH.MM WIB) ke YYYY-MM-DD
function parseFormattedDate(formattedStr) {
    if (!formattedStr) return getSystemDate();
    try {
        if (/^\d{4}-\d{2}-\d{2}/.test(formattedStr)) {
            return formattedStr.substring(0, 10);
        }
        
        // Bersihkan koma jika ada (mendukung format lama dan baru)
        const cleanStr = formattedStr.replace(',', '');
        const parts = cleanStr.trim().split(/\s+/);
        if (parts.length < 3) return getSystemDate();
        
        const day = parts[0].padStart(2, '0');
        const monthName = parts[1];
        const year = parts[2];
        
        const months = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        
        const monthIndex = months.indexOf(monthName);
        if (monthIndex === -1) return getSystemDate();
        
        const month = String(monthIndex + 1).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (e) {
        console.error("Parse date failed:", e);
        return getSystemDate();
    }
}

// Helper: Parse any date format (formatted strings, ISO, Date objects) back to a JavaScript Date object
function parseAnyDateToObj(dateStr) {
    if (!dateStr) return null;
    if (dateStr instanceof Date) return dateStr;
    
    // Jika berupa Unix timestamp
    if (/^\d+$/.test(dateStr)) {
        return new Date(parseInt(dateStr, 10));
    }
    
    // Jika berupa string ISO atau YYYY-MM-DD
    if (typeof dateStr === 'string' && (dateStr.includes('T') || /^\d{4}-\d{2}-\d{2}/.test(dateStr))) {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) return d;
    }
    
    try {
        if (typeof dateStr === 'string') {
            // Bersihkan koma dan pecah berdasarkan spasi
            const cleanStr = dateStr.replace(',', '');
            const parts = cleanStr.trim().split(/\s+/);
            // Format yang diharapkan: ["DD", "Bulan", "YYYY", "-", "HH.MM", "ZONA"]
            if (parts.length >= 5) {
                const day = parseInt(parts[0], 10);
                const monthName = parts[1];
                const year = parseInt(parts[2], 10);
                
                const timePart = parts[4]; // "HH.MM"
                const timeParts = timePart.split('.');
                const hours = parseInt(timeParts[0], 10);
                const minutes = parseInt(timeParts[1], 10);
                
                const months = [
                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                ];
                const monthIndex = months.indexOf(monthName);
                if (monthIndex === -1) return null;
                
                // Cari zona waktu asli dari string
                const tzPart = parts[5] ? parts[5].toUpperCase() : 'WIB';
                let tzOffset = 7 * 60; // default ke WIB (UTC+7)
                if (tzPart === 'WITA') tzOffset = 8 * 60;
                else if (tzPart === 'WIT') tzOffset = 9 * 60;
                else if (tzPart.startsWith('GMT')) {
                    const offsetMatch = tzPart.match(/GMT([+-]\d+)/);
                    if (offsetMatch) tzOffset = parseInt(offsetMatch[1], 10) * 60;
                }
                
                // Buat date object UTC dan sesuaikan offset aslinya
                const utcTime = Date.UTC(year, monthIndex, day, hours, minutes);
                const actualUtcTime = utcTime - (tzOffset * 60 * 1000);
                const res = new Date(actualUtcTime);
                if (!isNaN(res.getTime())) return res;
            }
        }
    } catch (e) {
        console.error("Failed parsing custom date string:", dateStr, e);
    }
    
    // Fallback standard parse
    const fallbackDate = new Date(dateStr);
    if (!isNaN(fallbackDate.getTime())) return fallbackDate;
    
    return null;
}

// Helper: Memastikan tanggal dari berbagai format (termasuk ISO 2026-06-07T17:00:00.000Z) dikonversi ke format tampilan sesuai perangkat
function ensureFormattedDate(dateValue) {
    if (!dateValue) return '';
    
    const dateObj = parseAnyDateToObj(dateValue);
    if (!dateObj || isNaN(dateObj.getTime())) {
        return dateValue;
    }
    
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const monthName = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const tz = getLocalTimezoneAbbreviation();
    
    return `${day} ${monthName} ${year} - ${hours}.${minutes} ${tz}`;
}

// Notification System Helpers
function getNotifLogs() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIF_LOGS)) || [];
}

function saveNotifLog(message) {
    const logs = getNotifLogs();
    logs.unshift({ message });
    localStorage.setItem(STORAGE_KEYS.NOTIF_LOGS, JSON.stringify(logs));
}

function showToast(media, title, body) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${media}`;
    
    const icon = media === 'whatsapp' ? '💬' : '📧';
    
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            <div class="toast-header">
                <span class="toast-title">${title}</span>
                <button class="toast-close" onclick="this.closest('.toast').remove()">&times;</button>
            </div>
            <div class="toast-body" style="white-space: pre-wrap; font-size: 12px; margin-top: 5px;">${body}</div>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 6 seconds with a slide/fade out effect
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.transition = 'all 0.5s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 500);
        }
    }, 6000);
}

// Dispatch notifications to simulated WhatsApp and Email targets
function dispatchNotifications(message) {
    const waNumber = "+62 812-3456-7890 (Grup Kearsipan)";
    const emailTarget = "arsip-teknik@universitas.ac.id";
    
    // 1. WhatsApp Simulation Toast
    showToast('whatsapp', 'Notifikasi WhatsApp Terkirim (Simulasi)', `Tujuan: ${waNumber}\n\n${message}`);
    
    // 2. Email Simulation Toast
    showToast('email', 'Notifikasi Email Terkirim (Simulasi)', `Tujuan: ${emailTarget}\n\n${message}`);
    
    // 3. Save to Local Logs
    saveNotifLog(message);
}

// Load notification logs table
function loadNotificationLogs() {
    const data = getNotifLogs();
    const tbody = document.getElementById('logNotifikasiTable');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="2" style="text-align: center; color: #999; padding: 20px;">Belum ada log notifikasi.</td></tr>`;
        return;
    }

    data.forEach((item, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td style="text-align: center; font-weight: bold; vertical-align: top; padding-top: 15px;">${index + 1}</td>
            <td style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; font-family: 'Segoe UI', sans-serif; padding: 15px; text-align: left;">${item.message}</td>
        `;
    });
}

// Clear notification logs
function clearNotificationLogs() {
    if (confirm('Yakin ingin membersihkan semua log notifikasi?')) {
        localStorage.setItem(STORAGE_KEYS.NOTIF_LOGS, JSON.stringify([]));
        loadNotificationLogs();
    }
}

// Dashboard: Load Recent Uploads from Surat Masuk, Surat Keluar & Perintah Kerja
function loadRecentUploads() {
    const recentTable = document.getElementById('recentUploadsTable');
    if (!recentTable) return;

    const sm = getSuratMasuk();
    const sk = getSuratKeluar();
    const pk = getPerintahKerja();

    // Map each list to a unified format
    const allItems = [
        ...sm.map(x => ({
            id: x.id,
            tipe: 'Surat Masuk',
            tipeClass: 'masuk',
            uploader: x.uploader || 'Admin',
            noSurat: x.no,
            perihal: x.perihal,
            tanggal: x.tanggal,
            fileName: x.fileName,
            fileData: x.fileData
        })),
        ...sk.map(x => ({
            id: x.id,
            tipe: 'Surat Keluar',
            tipeClass: 'keluar',
            uploader: x.uploader || 'Admin',
            noSurat: x.no,
            perihal: x.perihal,
            tanggal: x.tanggal,
            fileName: x.fileName,
            fileData: x.fileData
        })),
        ...pk.map(x => ({
            id: x.id,
            tipe: 'Perintah Kerja',
            tipeClass: 'perintah',
            uploader: x.uploader || 'Admin',
            noSurat: '-',
            perihal: x.keterangan,
            tanggal: x.tanggal,
            fileName: x.fileName,
            fileData: x.fileData
        }))
    ];

    // Sort by ID descending (which acts as a reliable upload timestamp)
    allItems.sort((a, b) => b.id - a.id);

    recentTable.innerHTML = '';

    // Take top 5 recent uploads
    const topItems = allItems.slice(0, 5);

    if (topItems.length === 0) {
        recentTable.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #999; padding: 20px;">Belum ada dokumen yang diunggah.</td></tr>`;
        return;
    }

    topItems.forEach(item => {
        const row = recentTable.insertRow();
        row.innerHTML = `
            <td><strong>${item.uploader}</strong></td>
            <td><span class="recent-type-badge ${item.tipeClass}">${item.tipe}</span></td>
            <td>${item.noSurat}</td>
            <td>${item.perihal}</td>
            <td>${ensureFormattedDate(item.tanggal)}</td>
            <td>${item.fileName ? `<a href="${item.fileData}" download="${item.fileName}" style="color: #0C599A; font-weight: 600; text-decoration: underline;">📄 ${item.fileName}</a>` : '-'}</td>
        `;
    });
}

// Load Institution Name
function loadInstitution() {
    const name = localStorage.getItem(STORAGE_KEYS.INSTANSI) || 'FAKULTAS TEKNIK CERDAS DAN BERKELANJUTAN';
    const elements = document.querySelectorAll('.instansi-name');
    elements.forEach(el => {
        el.innerText = name;
    });
}

// Get data locally
function getSuratMasuk() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SURAT_MASUK)) || [];
}

function getSuratKeluar() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SURAT_KELUAR)) || [];
}

function getPerintahKerja() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PERINTAH_KERJA)) || [];
}

// Global Sync from Cloud
async function syncAllFromCloud() {
    if (SCRIPT_URL === "MASUKKAN_URL_WEBAPP_GAS_ANDA_DISINI") {
        alert("Konfigurasi Cloud Belum Lengkap! Harap masukkan URL Google Apps Script di script.js baris pertama.");
        return;
    }

    console.log("Syncing from cloud...");
    const sm = await fetchFromCloud('SuratMasuk');
    const sk = await fetchFromCloud('SuratKeluar');
    const pk = await fetchFromCloud('PerintahKerja');

    if (sm) localStorage.setItem(STORAGE_KEYS.SURAT_MASUK, JSON.stringify(sm));
    if (sk) localStorage.setItem(STORAGE_KEYS.SURAT_KELUAR, JSON.stringify(sk));
    if (pk) localStorage.setItem(STORAGE_KEYS.PERINTAH_KERJA, JSON.stringify(pk));

    updateDashboard();
    console.log("Cloud sync complete.");
}

// Save data locally and sync to cloud
function persistSuratMasuk(data) {
    localStorage.setItem(STORAGE_KEYS.SURAT_MASUK, JSON.stringify(data));
    syncToCloud('SuratMasuk', data);
}

function persistSuratKeluar(data) {
    localStorage.setItem(STORAGE_KEYS.SURAT_KELUAR, JSON.stringify(data));
    syncToCloud('SuratKeluar', data);
}

function persistPerintahKerja(data) {
    localStorage.setItem(STORAGE_KEYS.PERINTAH_KERJA, JSON.stringify(data));
    syncToCloud('PerintahKerja', data);
}

// Sidebar Toggle Functions
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

// Login function
function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value.trim();

    // Simple validation (static users)
    const validUsers = {
        admin: { email: 'admin@teknik.com', password: 'admin123', role: 'admin' },
        staff: { email: 'staff@teknik.com', password: 'staff123', role: 'staff' }
    };

    let user = null;
    if (email === validUsers.admin.email && password === validUsers.admin.password) {
        user = validUsers.admin;
    } else if (email === validUsers.staff.email && password === validUsers.staff.password) {
        user = validUsers.staff;
    }

    if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboardPage').style.display = 'block';
        document.getElementById('currentUserRole').innerHTML = `👤 ${user.role.toUpperCase()}`;
        const btnTambah = document.getElementById('btnTambahPerintah');
        if (btnTambah) btnTambah.style.display = (user.role === 'admin') ? 'block' : 'none';
        initData();
        loadInstitution();
        syncAllFromCloud(); // Jalankan sinkronisasi awan
        updateDashboard();
        showSection('dashboard');
    } else {
        alert('Email atau password salah!');
    }
}

function handleLogout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('dashboardPage').style.display = 'none';
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    
    // Reset password visibility when logging out
    const passwordInput = document.getElementById('loginPassword');
    const toggleIcon = document.getElementById('togglePassword');
    if (passwordInput && toggleIcon) {
        passwordInput.type = 'password';
        toggleIcon.innerText = '👁️';
        toggleIcon.title = 'Tampilkan Password';
    }
    
    closeSidebar();
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('loginPassword');
    const toggleIcon = document.getElementById('togglePassword');
    if (passwordInput && toggleIcon) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.innerText = '🙈';
            toggleIcon.title = 'Sembunyikan Password';
        } else {
            passwordInput.type = 'password';
            toggleIcon.innerText = '👁️';
            toggleIcon.title = 'Tampilkan Password';
        }
    }
}

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (user) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboardPage').style.display = 'block';
        const userData = JSON.parse(user);
        document.getElementById('currentUserRole').innerHTML = `👤 ${userData.role.toUpperCase()}`;
        const btnTambah = document.getElementById('btnTambahPerintah');
        if (btnTambah) btnTambah.style.display = (userData.role === 'admin') ? 'block' : 'none';
        initData();
        loadInstitution();
        syncAllFromCloud(); // Jalankan sinkronisasi awan
        updateDashboard();
        showSection('dashboard');
    } else {
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('dashboardPage').style.display = 'none';
    }
}

// Update dashboard stats
function updateDashboard() {
    const suratMasuk = getSuratMasuk();
    const suratKeluar = getSuratKeluar();
    const perintahKerja = getPerintahKerja();

    document.getElementById('totalSuratMasuk').innerText = suratMasuk.length;
    document.getElementById('totalSuratKeluar').innerText = suratKeluar.length;
    document.getElementById('totalPerintahKerja').innerText = perintahKerja.length;

    // Load recent uploads automatically when updating dashboard
    loadRecentUploads();
}

// Show section
function showSection(section) {
    const sections = ['dashboardSection', 'suratMasukSection', 'suratKeluarSection', 'perintahKerjaSection', 'logNotifikasiSection'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.style.display = 'none';
    });
    
    const targetSection = document.getElementById(`${section}Section`);
    if (targetSection) targetSection.style.display = 'block';

    // Update sidebar active state
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
        link.classList.remove('active');
        const clickAttr = link.getAttribute('onclick');
        if (clickAttr && clickAttr.includes(section)) {
            link.classList.add('active');
        }
    });

    if (section === 'dashboard') {
        updateDashboard();
    }
    if (section === 'suratMasuk') loadSuratMasuk();
    if (section === 'suratKeluar') loadSuratKeluar();
    if (section === 'perintahKerja') loadPerintahKerja();
    if (section === 'logNotifikasi') loadNotificationLogs();

    // Close sidebar on mobile after selection
    closeSidebar();
}

// Load Surat Masuk table
function loadSuratMasuk() {
    const data = getSuratMasuk();
    const tbody = document.getElementById('suratMasukTable');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${item.no}</td>
            <td>${ensureFormattedDate(item.tanggal)}</td>
            <td>${item.unit}</td>
            <td>${item.perihal}</td>
            <td>${item.fileName ? `<a href="${item.fileData}" download="${item.fileName}">📄 ${item.fileName}</a>` : '-'}</td>
            <td>
                <button class="btn-edit" onclick="editSurat('masuk', ${item.id})">✏️ Edit</button>
                <button class="btn-danger" onclick="deleteSurat('masuk', ${item.id})">🗑️ Hapus</button>
                <button class="btn-print" onclick="printSurat('masuk', ${item.id})">🖨️ Cetak</button>
            </td>
        `;
    });
}

// Load Surat Keluar table
function loadSuratKeluar() {
    const data = getSuratKeluar();
    const tbody = document.getElementById('suratKeluarTable');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${item.no}</td>
            <td>${ensureFormattedDate(item.tanggal)}</td>
            <td>${item.unit}</td>
            <td>${item.perihal}</td>
            <td>${item.fileName ? `<a href="${item.fileData}" download="${item.fileName}">📄 ${item.fileName}</a>` : '-'}</td>
            <td>
                <button class="btn-edit" onclick="editSurat('keluar', ${item.id})">✏️ Edit</button>
                <button class="btn-danger" onclick="deleteSurat('keluar', ${item.id})">🗑️ Hapus</button>
                <button class="btn-print" onclick="printSurat('keluar', ${item.id})">🖨️ Cetak</button>
            </td>
        `;
    });
}

// Load Perintah Kerja table
function loadPerintahKerja() {
    const data = getPerintahKerja();
    const tbody = document.getElementById('perintahKerjaTable');
    tbody.innerHTML = '';

    data.forEach(item => {
        const statusText = item.status === 'sedang_diproses' ? '🟡 Sedang Diproses' : '🟢 Sudah Diproses';
        const statusClass = item.status === 'sedang_diproses' ? 'status-proses' : 'status-selesai';
        const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
        const isAdmin = user && user.role === 'admin';
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${ensureFormattedDate(item.tanggal)}</td>
            <td>${item.dari}</td>
            <td>${item.keterangan}</td>
            <td>${item.fileName ? `<a href="${item.fileData}" download="${item.fileName}">📄 ${item.fileName}</a>` : '-'}</td>
            <td class="${statusClass}">${statusText}</td>
            <td>
                <button class="btn-edit" onclick="editPerintahKerja(${item.id})">✏️ Edit</button>
                <button class="btn-danger" onclick="deletePerintahKerja(${item.id})">🗑️ Hapus</button>
                <button class="btn-print" onclick="printPerintahKerja(${item.id})">🖨️ Cetak</button>
            </td>
        `;
    });
}

// Show modal for surat
let currentEditId = null;

function showModal(jenis) {
    document.getElementById('labelUnit').innerText = jenis === 'masuk' ? 'Unit Pengirim' : 'Unit Tujuan';
    document.getElementById('suratJenis').value = jenis;
    document.getElementById('modalTitle').innerText = jenis === 'masuk' ? 'Tambah Surat Masuk' : 'Tambah Surat Keluar';
    document.getElementById('suratId').value = '';
    document.getElementById('suratNo').value = '';
    
    // Otomatis menggunakan tanggal sistem
    document.getElementById('suratTanggal').value = getSystemDate();
    
    document.getElementById('suratUnit').value = '';
    document.getElementById('suratPerihal').value = '';
    document.getElementById('suratFile').value = '';
    currentUploadedFile = null;
    currentUploadedFileName = null;
    document.getElementById('suratModal').style.display = 'flex';
}

function editSurat(jenis, id) {
    const data = jenis === 'masuk' ? getSuratMasuk() : getSuratKeluar();
    const item = data.find(d => d.id === id);

    if (item) {
        document.getElementById('labelUnit').innerText = jenis === 'masuk' ? 'Unit Pengirim' : 'Unit Tujuan';
        document.getElementById('suratJenis').value = jenis;
        document.getElementById('modalTitle').innerText = jenis === 'masuk' ? 'Edit Surat Masuk' : 'Edit Surat Keluar';
        document.getElementById('suratId').value = item.id;
        document.getElementById('suratNo').value = item.no;
        document.getElementById('suratTanggal').value = item.tanggal;
        document.getElementById('suratUnit').value = item.unit;
        document.getElementById('suratPerihal').value = item.perihal;
        document.getElementById('suratFile').value = '';
        currentUploadedFile = item.fileData || null;
        currentUploadedFileName = item.fileName || null;
        document.getElementById('suratModal').style.display = 'flex';
    }
}

function saveSurat() {
    const jenis = document.getElementById('suratJenis').value;
    const id = document.getElementById('suratId').value;
    const no = document.getElementById('suratNo').value;
    const unit = document.getElementById('suratUnit').value;
    const perihal = document.getElementById('suratPerihal').value;
    const fileData = currentUploadedFile;
    const fileName = currentUploadedFileName;

    // Ambil role user aktif
    const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    const roleName = currentUser ? (currentUser.role === 'admin' ? 'admin' : 'staff') : 'admin';

    if (!no || !unit || !perihal) {
        alert('Harap isi semua field yang wajib!');
        return;
    }

    let data = jenis === 'masuk' ? getSuratMasuk() : getSuratKeluar();
    const isNew = !id;
    let tanggal = '';

    if (id) {
        // Edit existing
        const index = data.findIndex(d => d.id == id);
        if (index !== -1) {
            tanggal = data[index].tanggal; // Pertahankan tanggal awal
            const uploader = data[index].uploader || 'Admin';
            data[index] = { ...data[index], no, tanggal, unit, perihal, fileData, fileName, uploader };
        }
    } else {
        // Add new
        const newId = Date.now();
        tanggal = formatDateTime(new Date()); // Format seragam (DD, Bulan YYYY - HH.MM WIB)
        const uploader = roleName === 'admin' ? 'Admin' : 'Staff';
        data.push({ id: newId, no, tanggal, unit, perihal, fileData, fileName, uploader });
    }

    if (jenis === 'masuk') {
        persistSuratMasuk(data);
        loadSuratMasuk();
    } else {
        persistSuratKeluar(data);
        loadSuratKeluar();
    }

    // Kirim notifikasi jika unggahan baru
    if (isNew) {
        const displayTipe = jenis === 'masuk' ? 'surat masuk' : 'surat keluar';
        const fileLink = fileName 
            ? `<a href="${fileData}" download="${fileName}" class="file-link" style="color: #0C599A; font-weight: bold; text-decoration: underline;">📄 ${fileName}</a>` 
            : 'Tanpa Lampiran';

        const notifMsg = `halo,

ada perubahan berkas pada system E-Surat oleh ${roleName}:

${displayTipe} sudah berhasil diunggah:

1. nomor surat: ${no}
2. perihal: ${perihal}
3. unit: ${unit}
4. tanggal: ${tanggal}
5. file: ${fileLink}

salam,
E-Surat Apps System`;

        dispatchNotifications(notifMsg);
    }

    updateDashboard();
    closeModal();
}

function deleteSurat(jenis, id) {
    if (confirm('Yakin ingin menghapus surat ini?')) {
        let data = jenis === 'masuk' ? getSuratMasuk() : getSuratKeluar();
        data = data.filter(d => d.id !== id);

        if (jenis === 'masuk') {
            persistSuratMasuk(data);
            loadSuratMasuk();
        } else {
            persistSuratKeluar(data);
            loadSuratKeluar();
        }

        updateDashboard();
    }
}

function printSurat(jenis, id) {
    const data = jenis === 'masuk' ? getSuratMasuk() : getSuratKeluar();
    const item = data.find(d => d.id === id);

    if (item) {
        if (item.fileName && item.fileName.toLowerCase().endsWith('.pdf') && item.fileData) {
            // Convert base64 to blob for better compatibility
            const base64Data = item.fileData.split(',')[1];
            const binaryString = window.atob(base64Data);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
        } else {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>Cetak Surat - ${item.no}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 40px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .title { font-size: 24px; font-weight: bold; }
                        .subtitle { font-size: 14px; color: #666; }
                        .content { margin-top: 20px; }
                        .row { margin-bottom: 10px; }
                        .label { font-weight: bold; width: 120px; display: inline-block; }
                        @media print {
                            body { margin: 0; padding: 20px; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="title">E-SURAT APPS</div>
                        <div class="subtitle">FAKULTAS TEKNIK CERDAS DAN BERKELANJUTAN</div>
                        <hr>
                    </div>
                    <div class="content">
                        <div class="row"><span class="label">No. Surat:</span> ${item.no}</div>
                        <div class="row"><span class="label">Tanggal:</span> ${item.tanggal}</div>
                        <div class="row"><span class="label">${jenis === 'masuk' ? 'Pengirim' : 'Tujuan'}:</span> ${item.unit}</div>
                        <div class="row"><span class="label">Perihal:</span> ${item.perihal}</div>
                        <div class="row"><span class="label">File:</span> ${item.fileName || '-'}</div>
                    </div>
                    <hr>
                    <div style="margin-top: 50px; text-align: right;">
                        Dicetak pada: ${new Date().toLocaleString()}
                    </div>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    }
}

function closeModal() {
    document.getElementById('suratModal').style.display = 'none';
}

// Perintah Kerja functions
function showModalPerintahKerja() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    const isAdmin = user && user.role === 'admin';

    // Sembunyikan status group sepenuhnya untuk Admin saat membuat perintah kerja
    document.getElementById('perintahStatusGroup').style.display = isAdmin ? 'none' : 'block';
    document.getElementById('perintahStatus').style.display = isAdmin ? 'none' : 'block';
    document.getElementById('perintahStatusText').style.display = 'none';

    document.getElementById('perintahId').value = '';
    document.getElementById('perintahTanggal').value = getSystemDate(); // Gunakan tanggal otomatis
    document.getElementById('perintahTanggal').readOnly = false;
    document.getElementById('perintahDari').readOnly = false;
    document.getElementById('perintahKeterangan').readOnly = false;
    document.getElementById('perintahFile').disabled = false;
    document.getElementById('perintahDari').value = '';
    document.getElementById('perintahKeterangan').value = '';
    document.getElementById('perintahFile').value = '';
    currentUploadedFile = null;
    currentUploadedFileName = null;
    document.getElementById('perintahStatus').value = 'sedang_diproses';
    document.getElementById('perintahKerjaModal').style.display = 'flex';
}

function editPerintahKerja(id) {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    const isAdmin = user && user.role === 'admin';

    const data = getPerintahKerja();
    const item = data.find(d => d.id === id);

    if (item) {
        // Sembunyikan status group sepenuhnya untuk Admin saat melihat/mengedit perintah kerja
        document.getElementById('perintahStatusGroup').style.display = isAdmin ? 'none' : 'block';
        document.getElementById('perintahStatus').style.display = isAdmin ? 'none' : 'block';
        document.getElementById('perintahStatusText').style.display = 'none';

        document.getElementById('perintahId').value = item.id;
        
        // Parse kembali format tanggal untuk input type="date"
        document.getElementById('perintahTanggal').value = parseFormattedDate(item.tanggal);
        
        document.getElementById('perintahDari').value = item.dari;
        document.getElementById('perintahKeterangan').value = item.keterangan;
        document.getElementById('perintahFile').value = '';
        
        document.getElementById('perintahTanggal').readOnly = !isAdmin;
        document.getElementById('perintahDari').readOnly = !isAdmin;
        document.getElementById('perintahKeterangan').readOnly = !isAdmin;
        document.getElementById('perintahFile').disabled = !isAdmin;
        
        currentUploadedFile = item.fileData || null;
        currentUploadedFileName = item.fileName || null;
        document.getElementById('perintahStatus').value = item.status || 'sedang_diproses';
        document.getElementById('perintahKerjaModal').style.display = 'flex';
    }
}

function savePerintahKerja() {
    const id = document.getElementById('perintahId').value;
    const tanggalInput = document.getElementById('perintahTanggal').value;
    const dari = document.getElementById('perintahDari').value;
    const keterangan = document.getElementById('perintahKeterangan').value;
    const fileData = currentUploadedFile;
    const fileName = currentUploadedFileName;
    const status = document.getElementById('perintahStatus').value;

    if (!tanggalInput || !dari || !keterangan) {
        alert('Harap isi semua field yang wajib!');
        return;
    }

    let data = getPerintahKerja();
    const isNew = !id;
    let finalStatus = status;
    let isStatusChange = false;
    let originalStatus = '';
    let finalTanggal = '';

    const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    const roleName = currentUser ? (currentUser.role === 'admin' ? 'admin' : 'staff') : 'admin';

    if (id) {
        const index = data.findIndex(d => d.id == id);
        if (index !== -1) {
            originalStatus = data[index].status;
            // Admin tidak bisa mengubah status, jadi biarkan status lama tetap ada
            finalStatus = (roleName === 'admin') ? originalStatus : status;
            isStatusChange = (finalStatus !== originalStatus);
            
            // Format input date jika berubah, jika tidak pertahankan
            const origDate = data[index].tanggal;
            if (parseFormattedDate(origDate) === tanggalInput) {
                finalTanggal = origDate;
            } else {
                finalTanggal = formatInputDate(tanggalInput);
            }
            
            const uploader = data[index].uploader || 'Admin';
            data[index] = { ...data[index], tanggal: finalTanggal, dari, keterangan, fileData, fileName, status: finalStatus, uploader };
        }
    } else {
        const newId = Date.now();
        // Admin membuat perintah kerja baru, status bawaan adalah sedang_diproses
        finalStatus = 'sedang_diproses';
        finalTanggal = formatInputDate(tanggalInput);
        data.push({ id: newId, tanggal: finalTanggal, dari, keterangan, fileData, fileName, status: finalStatus, uploader: 'Admin' });
    }

    persistPerintahKerja(data);
    loadPerintahKerja();

    // Kirim Notifikasi WhatsApp & Email
    if (isNew) {
        const fileLink = fileName 
            ? `<a href="${fileData}" download="${fileName}" class="file-link" style="color: #0C599A; font-weight: bold; text-decoration: underline;">📄 ${fileName}</a>` 
            : 'Tanpa Lampiran';

        const notifMsg = `halo,

ada perubahan berkas pada system E-Surat oleh ${roleName}:

perintah kerja sudah berhasil diunggah:

1. nomor surat: -
2. perihal: ${keterangan}
3. unit: ${dari} (Status: Sedang Proses)
4. tanggal: ${finalTanggal}
5. file: ${fileLink}

salam,
E-Surat Apps System`;

        dispatchNotifications(notifMsg);
    } else if (isStatusChange) {
        const fileLink = fileName 
            ? `<a href="${fileData}" download="${fileName}" class="file-link" style="color: #0C599A; font-weight: bold; text-decoration: underline;">📄 ${fileName}</a>` 
            : 'Tanpa Lampiran';
        const displayStatus = finalStatus === 'sedang_diproses' ? 'Sedang Proses' : 'Sudah Diproses';

        const notifMsg = `halo,

ada perubahan berkas pada system E-Surat oleh ${roleName}:

status perintah kerja sudah berhasil diperbarui:

1. nomor surat: -
2. perihal: ${keterangan}
3. unit: ${dari} (Status Baru: ${displayStatus})
4. tanggal: ${finalTanggal}
5. file: ${fileLink}

salam,
E-Surat Apps System`;

        dispatchNotifications(notifMsg);
    }

    updateDashboard();
    closePerintahKerjaModal();
}

function printPerintahKerja(id) {
    const data = getPerintahKerja();
    const item = data.find(d => d.id === id);

    if (item) {
        if (item.fileName && item.fileName.toLowerCase().endsWith('.pdf') && item.fileData) {
            // Convert base64 to blob for better compatibility
            const base64Data = item.fileData.split(',')[1];
            const binaryString = window.atob(base64Data);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
        } else {
            const statusText = item.status === 'sedang_diproses' ? 'Sedang Diproses' : 'Sudah Diproses';
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>Cetak Perintah Kerja</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 40px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .title { font-size: 24px; font-weight: bold; }
                        .subtitle { font-size: 14px; color: #666; }
                        .content { margin-top: 20px; }
                        .row { margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
                        .label { font-weight: bold; width: 150px; display: inline-block; }
                        @media print {
                            body { margin: 0; padding: 20px; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="title">E-SURAT APPS</div>
                        <div class="subtitle">SURAT PERINTAH KERJA</div>
                        <hr>
                    </div>
                    <div class="content">
                        <div class="row"><span class="label">Tanggal:</span> ${item.tanggal}</div>
                        <div class="row"><span class="label">Pemberi Perintah:</span> ${item.dari}</div>
                        <div class="row"><span class="label">Keterangan:</span> ${item.keterangan}</div>
                        <div class="row"><span class="label">Status:</span> ${statusText}</div>
                        <div class="row"><span class="label">File Terlampir:</span> ${item.fileName || '-'}</div>
                    </div>
                    <div style="margin-top: 50px; text-align: right;">
                        <p>Dicetak pada: ${new Date().toLocaleString()}</p>
                    </div>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    }
}

function deletePerintahKerja(id) {
    if (confirm('Yakin ingin menghapus perintah kerja ini?')) {
        let data = getPerintahKerja();
        data = data.filter(d => d.id !== id);
        persistPerintahKerja(data);
        loadPerintahKerja();
        updateDashboard();
    }
}

function closePerintahKerjaModal() {
    document.getElementById('perintahKerjaModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('suratModal');
    const modalPk = document.getElementById('perintahKerjaModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === modalPk) {
        modalPk.style.display = 'none';
    }
}

let currentUploadedFile = null;
let currentUploadedFileName = null;

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.type !== "application/pdf") {
            alert("Hanya file PDF yang diizinkan!");
            event.target.value = '';
            currentUploadedFile = null;
            currentUploadedFileName = null;
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            currentUploadedFile = e.target.result;
            currentUploadedFileName = file.name;
        };
        reader.readAsDataURL(file);
    } else {
        currentUploadedFile = null;
        currentUploadedFileName = null;
    }
}

// Filter table function
function filterTable(tableId, query) {
    const tbody = document.getElementById(tableId);
    if (!tbody) return;
    const trs = tbody.getElementsByTagName("tr");
    const filter = query.toLowerCase();

    for (let i = 0; i < trs.length; i++) {
        const tds = trs[i].getElementsByTagName("td");
        let found = false;
        for (let j = 0; j < tds.length; j++) {
            if (tds[j]) {
                if (tds[j].innerHTML.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        trs[i].style.display = found ? "" : "none";
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('suratFile').addEventListener('change', handleFileUpload);
    document.getElementById('perintahFile').addEventListener('change', handleFileUpload);
    
    // Support enter key for login
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    
    if (loginEmail && loginPassword) {
        const handleEnter = function(e) {
            if (e.key === 'Enter') {
                handleLogin();
            }
        };
        loginEmail.addEventListener('keypress', handleEnter);
        loginPassword.addEventListener('keypress', handleEnter);
    }
    
    checkAuth();
});