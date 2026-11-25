export interface MetricItem {
  value: string;
  label: string;
}

export interface ProjectCaseCard {
  id: string;
  title: string;
  caption: string;
  accent: "primary" | "lime" | "orange";
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

const projectAssets = import.meta.glob<string>(
  "../assets/**/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" },
);

/** Resolve a bundled project asset from `src/assets/` so Vite emits it in production builds. */
function projectAsset(relativePath: string): string {
  const key = `../assets/${relativePath}`;
  const resolved = projectAssets[key];
  if (!resolved) {
    throw new Error(`Missing project asset: ${key}`);
  }
  return resolved;
}

export type ProjectCategory =
  | "Semua"
  | "Web & Desktop"
  | "Mobile"
  | "Machine Learning"
  | "Infrastruktur";

export interface ProjectItem {
  id: string;
  name: string;
  kind: string;
  category: Exclude<ProjectCategory, "Semua">;
  year: string;
  stack: string[];
  blurb: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  metrics: MetricItem[];
  cards: ProjectCaseCard[];
  /**
   * Daftar gambar bukti proyek (letakkan file gambar di folder `public/projects/`,
   * lalu referensikan misal: `{ src: "/projects/library-1.png", alt: "...", caption: "..." }`).
   */
  images: ProjectImage[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type?: string;
  period: string;
  duration: string;
  location: string;
  tags: string[];
  highlights: string[];
}

export interface SkillItemDetail {
  name: string;
  level: string;
  iconKey: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  accent: "primary" | "orange" | "lime";
  description: string;
  items: SkillItemDetail[];
}

export const profile = {
  name: "Askar Prayogo",
  first: "Askar",
  last: "Prayogo",
  role: "Software Engineer",
  subroles: [
    "Software Engineer",
    "Fullstack Web Developer",
    "DevOps & System Administrator",
  ],
  taglineWords: ["FROM", "IDEA", "TO", "IMPACT"],
  email: "prayogoaskar@gmail.com",
  phone: "+62 896-5509-0273",
  location: "Depok, Indonesia",
  city: "Depok",
  availability:
    "Terbuka untuk Peluang Full-Time · Software / Fullstack Engineer",
  linkedin: {
    label: "linkedin.com/in/askarprayogo",
    url: "https://linkedin.com/in/askarprayogo",
  },
  github: {
    label: "github.com/nicorobin28",
    url: "https://github.com/nicorobin28",
  },
  photo: "/profile.png",
  cvUrl: "/cv-askar-prayogo.pdf",
  summary:
    "Lulusan S1 Teknik Informatika dengan pengalaman lebih dari 1 tahun dalam merancang, membangun, dan memelihara aplikasi desktop, platform web full-stack, serta infrastruktur server dan jaringan. Terbiasa menerjemahkan kebutuhan bisnis menjadi fitur yang terukur dampaknya—mulai dari percepatan alur operasional, efisiensi kerja tim, hingga menjaga stabilitas sistem bagi ratusan pengguna aktif. Menguasai JavaScript/TypeScript, PHP, React/Svelte, Node.js, basis data relasional, serta administrasi server Linux dan jaringan.",
  summaryShort:
    "Mengubah kebutuhan bisnis menjadi produk digital dan sistem yang terukur dampaknya — lebih cepat, minim kerja manual, dan andal untuk operasional nyata.",
};

export const stats = [
  {
    value: 20,
    suffix: "+",
    label: "Aplikasi web, mobile & sistem end-to-end dirilis",
  },
  {
    value: 40,
    suffix: "%",
    label: "Peningkatan efisiensi waktu operasional lewat otomatisasi",
  },
  {
    value: 85,
    suffix: "%",
    label: "Reduksi human error melalui digitalisasi alur kerja",
  },
  {
    value: 2,
    suffix: " th+",
    label: "Pengalaman pengembangan perangkat lunak & sistem",
  },
];

export const marqueeItems = [
  "FULL-STACK DEVELOPMENT",
  "REACT & NEXT.JS",
  "SVELTE",
  "TYPESCRIPT",
  "NODE.JS",
  "PHP · LARAVEL",
  "MYSQL & POSTGRESQL",
  "MONGODB",
  "LINUX SERVER",
  "NETWORKING",
  "DOCKER",
  "CI/CD",
  "REST API",
  "AGILE / SCRUM",
];

export const experiences: ExperienceItem[] = [
  {
    id: "mts-yasmine",
    company: "MTS Yasmine",
    role: "Software Engineer",
    type: "Proyek End-to-End",
    period: "Okt 2025 — Des 2025",
    duration: "3 bulan",
    location: "Indonesia",
    tags: ["Java", "NetBeans", "SQL", "Desktop App", "Figma"],
    highlights: [
      "Merancang dan membangun aplikasi manajemen perpustakaan berbasis desktop secara end-to-end menggunakan Java NetBeans dan basis data SQL untuk mendigitalisasi 1.000+ koleksi buku.",
      "Mengotomatisasi alur pelacakan, peminjaman, dan pengembalian buku yang sebelumnya manual di atas kertas—memangkas waktu kerja administrasi staf hingga 40%.",
      "Mengimplementasikan fitur pencarian dan pelaporan otomatis berbasis database, mempercepat pengecekan ketersediaan buku dari 10–20 menit menjadi hitungan detik.",
      "Merancang antarmuka desktop yang intuitif bagi staf non-teknis, menurunkan kesalahan pencatatan data (human error) dalam sirkulasi harian sebesar 85%.",
    ],
  },
  {
    id: "votapps",
    company: "VOTAPPS — Universitas Negeri Jakarta",
    role: "Mobile Developer",
    type: "Freelance",
    period: "Jan 2026",
    duration: "±1,5 bulan",
    location: "Indonesia",
    tags: [
      "React Native",
      "Android",
      "SQLite",
      "Push Notification",
      "PDF Export",
    ],
    highlights: [
      "Membangun aplikasi Android dari nol menggunakan React Native untuk membantu atlet bola voli menjadwalkan dan menjalankan program latihan mandiri tanpa pengawasan langsung pelatih.",
      "Merancang fitur penjadwalan sesi latihan (jam mulai–selesai) beserta panduan materi latihan terstruktur agar atlet dapat menyusun program personal dalam hitungan menit.",
      "Mengimplementasikan sistem pengingat otomatis 5 menit sebelum jadwal latihan dimulai guna meningkatkan konsistensi dan kedisiplinan atlet.",
      "Menangani seluruh siklus pengembangan secara mandiri (UI/UX, state management, integrasi notifikasi, hingga build Android) dari tahap kebutuhan hingga rilis dalam 1,5 bulan.",
      "Menyediakan fitur ekspor hasil latihan ke format PDF sebagai dokumen evaluasi progres atlet.",
    ],
  },
  {
    id: "cms-apps",
    company: "CMS Apps — Sistem Manajemen Portofolio",
    role: "Fullstack Developer",
    type: "Freelance",
    period: "Mar 2026 — Apr 2026",
    duration: "1 bulan",
    location: "Indonesia",
    tags: ["Next.js", "React.js", "Tailwind CSS", "Node.js", "PostgreSQL"],
    highlights: [
      "Merancang dan membangun aplikasi portofolio profesional sekaligus sistem Content Management System (CMS) kustom secara end-to-end menggunakan ekosistem Next.js, state management Context API, dan basis data Supabase.",
      "Menerjemahkan rancangan desain klien secara presisi (pixel-perfect) ke dalam antarmuka publik (front-end) yang responsif, memastikan tampilan showcase proyek berfungsi optimal di berbagai ukuran perangkat.",
      "Membangun dashboard admin full-stack menggunakan Next.js dan Supabase dengan implementasi Role-Based Access Control (RBAC) serta operasi CRUD real-time, memangkas waktu pembaruan konten klien hingga 100% tanpa intervensi developer.",
      "Mengimplementasikan alur autentikasi dan manajemen sesi untuk memastikan keamanan akses ke panel admin.",
      "Menerapkan algoritma penyortiran data (data sorting logic) pada halaman utama untuk memprioritaskan proyek dengan penanda (flag) 'featured' agar otomatis tampil di urutan teratas sebelum proyek reguler.",
    ],
  },
  {
    id: "7tech",
    company: "7Tech Digital",
    role: "System Administrator & Network Engineer",
    type: "Magang",
    period: "Feb 2021 — Apr 2021",
    duration: "3 bulan",
    location: "Indonesia",
    tags: ["Linux", "LAN/VLAN/Firewall", "SolarWinds", "Server Hardening"],
    highlights: [
      "Mengelola dan memantau 100+ server serta perangkat jaringan dengan tingkat uptime sistem konsisten di angka 99% selama masa magang.",
      "Merancang dan mengonfigurasi ulang topologi jaringan (LAN/VLAN/firewall), berhasil menekan insiden gangguan konektivitas hingga 20% dibanding periode sebelumnya.",
      "Menangani troubleshooting dan menyelesaikan rata-rata 3–5 tiket insiden teknis per minggu dengan waktu respons rata-rata di bawah 10 menit.",
      "Menyusun dokumentasi SOP administrasi server dan jaringan yang mempercepat proses onboarding anggota tim baru sebesar 90%.",
      "Menerapkan standar keamanan dasar (server hardening dan backup terjadwal) untuk meminimalkan risiko downtime akibat kegagalan sistem.",
      "Membangun sistem pemantauan jaringan berbasis Orion SolarWinds sehingga proses monitoring dan troubleshooting berjalan jauh lebih efektif.",
    ],
  },
];

export const projectCategories: ProjectCategory[] = [
  "Semua",
  "Web & Desktop",
  "Mobile",
  "Machine Learning",
  "Infrastruktur",
];

export const projects: ProjectItem[] = [
  {
    id: "library-system",
    name: "Sistem Manajemen Perpustakaan Digital",
    kind: "Desktop · Pengembangan End-to-End · Magang",
    category: "Web & Desktop",
    year: "2025",
    stack: ["Java", "NetBeans", "SQL", "Figma"],
    blurb:
      "Platform operasional perpustakaan terpadu berbasis desktop untuk katalogisasi, peminjaman, pengembalian, dan pelaporan 1.000+ koleksi buku. Menggantikan alur kertas, memangkas waktu administrasi 40%, dan mempercepat pencarian stok hingga hitungan detik.",
    challenge:
      "Pencatatan sirkulasi buku masih dilakukan secara manual di atas kertas sehingga staf membutuhkan 10–20 menit hanya untuk memastikan ketersediaan buku dan rentan terjadi salah input.",
    solution:
      "Merancang skema basis data SQL relasional yang terhubung dengan antarmuka desktop Java NetBeans yang sederhana bagi staf non-teknis, lengkap dengan pencarian real-time dan laporan otomatis.",
    deliverables: [
      "Arsitektur Database SQL & Skema Sirkulasi",
      "Aplikasi Desktop Java NetBeans End-to-End",
      "Modul Pencarian Instan & Laporan Otomatis",
    ],
    metrics: [
      { value: "1.000+", label: "buku terdigitalisasi" },
      { value: "-40%", label: "waktu administrasi" },
      { value: "-85%", label: "human error input" },
    ],
    cards: [
      {
        id: "lib-1",
        title: "Katalogisasi 1.000+ Koleksi",
        caption:
          "Indeks buku terstruktur dengan pencarian instan berbasis SQL dari 10–20 menit menjadi hitungan detik.",
        accent: "primary",
      },
      {
        id: "lib-2",
        title: "Otomatisasi Peminjaman",
        caption:
          "Alur pinjam–kembali digital yang memangkas beban kerja administratif staf perpustakaan hingga 40%.",
        accent: "lime",
      },
      {
        id: "lib-3",
        title: "UI Ramah Pengguna Non-Teknis",
        caption:
          "Desain antarmuka fokus pada kejelasan input yang menurunkan kesalahan pencatatan harian sebesar 85%.",
        accent: "orange",
      },
    ],
    images: [
      {
        src: projectAsset("project-image/project-image-1.png"),
        alt: "Tampilan Login Perpustakaan",
        caption: "Halaman login untuk staf perpustakaan.",
      },
      {
        src: projectAsset("project-image/project-image-2.png"),
        alt: "Tampilan Dashboard Perpustakaan",
        caption: "Dashboard utama katalogisasi dan sirkulasi buku",
      },
      {
        src: projectAsset("project-image/project-image-3.png"),
        alt: "Tampilan Manajemen Buku",
        caption: "Fitur pencarian instan dan manajemen koleksi buku",
      },
      {
        src: projectAsset("project-image/project-image-4.png"),
        alt: "Tampilan Manajemen Peminjaman",
        caption: "Halaman pencatatan peminjaman buku",
      },
      {
        src: projectAsset("project-image/project-image-5.png"),
        alt: "Tampilan Manajemen Pengembalian Buku",
        caption: "Halaman pencatatan pengembalian buku",
      },
      {
        src: projectAsset("project-image/project-image-6.png"),
        alt: "Tampilan Manajemen Siswa",
        caption: "Halaman pencatatan data siswa",
      },
      {
        src: projectAsset("project-image/project-image-7.png"),
        alt: "Tampilan Manajemen Denda",
        caption: "Halaman pencatatan data denda",
      },
      {
        src: projectAsset("project-image/project-image-8.png"),
        alt: "Tampilan Laporan Perpustakaan",
        caption:
          "Laporan otomatis sirkulasi buku, peminjaman, pengembalian, dan denda",
      },
      // Contoh pengisian lebih dari 1 gambar:
      // { src: "/projects/library-dashboard.png", alt: "Tampilan Dashboard Perpustakaan", caption: "Dashboard utama katalogisasi dan sirkulasi buku" },
      // { src: "/projects/library-search.png", alt: "Fitur Pencarian Instan", caption: "Pencarian status ketersediaan buku berbasis SQL" },
    ],
  },
  {
    id: "athletix",
    name: "VOTAPPS — Aplikasi Latihan Atlet Voli",
    kind: "Mobile · Proyek Freelance Mandiri",
    category: "Mobile",
    year: "2026",
    stack: ["React Native", "Android", "Push Notification", "PDF Export"],
    blurb:
      "Aplikasi pendamping latihan mandiri bagi atlet bola voli Universitas Negeri Jakarta: penyusunan jadwal terstruktur, pengingat otomatis 5 menit sebelum sesi, serta ekspor laporan PDF untuk evaluasi progres.",
    challenge:
      "Atlet membutuhkan panduan latihan yang tetap terstruktur dan disiplin saat berlatih mandiri di luar jam pengawasan langsung pelatih.",
    solution:
      "Mengembangkan aplikasi Android dengan React Native yang menggabungkan pemilih materi latihan, penjadwalan jam mulai–selesai, notifikasi lokal otomatis 5 menit pra-sesi, dan generator laporan PDF.",
    deliverables: [
      "Desain UI/UX & Alur Latihan Mandiri",
      "Integrasi Local Push Notification Pra-Sesi",
      "Build Android & Fitur Ekspor Laporan PDF",
    ],
    metrics: [
      { value: "1,5 bln", label: "konsep hingga rilis" },
      { value: "100%", label: "pengembangan mandiri" },
      { value: "PDF", label: "laporan evaluasi" },
    ],
    cards: [
      {
        id: "ath-1",
        title: "Penjadwalan Mandiri",
        caption:
          "Atlet menyusun sesi latihan lengkap dengan durasi dan panduan materi dalam hitungan menit.",
        accent: "lime",
      },
      {
        id: "ath-2",
        title: "Pengingat Otomatis -5 Menit",
        caption:
          "Notifikasi terintegrasi sebelum jadwal dimulai untuk menjaga konsistensi dan kedisiplinan latihan.",
        accent: "primary",
      },
      {
        id: "ath-3",
        title: "Ekspor Laporan PDF",
        caption:
          "Rekap hasil latihan dapat langsung diekspor menjadi dokumen PDF untuk ditinjau pelatih.",
        accent: "orange",
      },
    ],
    images: [
      {
        src: projectAsset("votapps/main-menu.png"),
        alt: "Tampilan Menu Utama VOTAPPS",
        caption:
          "Menu utama aplikasi VOTAPPS dengan opsi navigasi ke fitur latihan dan laporan.",
      },
      {
        src: projectAsset("votapps/menu-materi-latihan.png"),
        alt: "Tampilan Menu Materi Latihan VOTAPPS",
        caption: "Menu materi latihan aplikasi VOTAPPS",
      },
      {
        src: projectAsset("votapps/menu-latihan.webp"),
        alt: "Tampilan Menu Buat Jadwal Berlatih VOTAPPS",
        caption:
          "Menu berlatih aplikasi VOTAPPS dengan opsi jadwal dan panduan materi.",
      },
    ],
  },
  {
    id: "cms-apps",
    name: "CMS Apps — Sistem Manajemen Portofolio",
    kind: "Web · Fullstack Development",
    category: "Web & Desktop",
    year: "2026",
    stack: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Framer Motion",
      "JWT Authentication",
      "Zustand",
      "Node.js",
      "PostgreSQL",
    ],
    blurb:
      "Aplikasi web fullstack untuk mengelola portofolio proyek, pengalaman, dan keahlian secara real-time. Menyediakan antarmuka admin yang intuitif untuk memperbarui konten tanpa perlu menyentuh kode.",
    challenge:
      "Pemilik portofolio membutuhkan cara cepat dan mudah untuk memperbarui konten proyek, pengalaman, dan keahlian tanpa harus mengedit kode sumber secara manual.",
    solution:
      "Membangun aplikasi web fullstack dengan Next.js dan React.js di frontend, Node.js di backend, serta MySQL sebagai basis data. Menyediakan panel admin yang ramah pengguna untuk mengelola konten secara real-time.",
    deliverables: [
      "Frontend Next.js & React.js",
      "Backend Node.js & PostgreSQL",
      "Panel Admin Intuitif untuk Manajemen Konten",
    ],
    metrics: [
      { value: "Real-time", label: "pembaruan konten" },
      { value: "Fullstack", label: "Next.js + Node.js" },
      { value: "MySQL", label: "basis data relasional" },
    ],
    cards: [
      {
        id: "cms-1",
        title: "Manajemen Konten Real-time",
        caption:
          "Admin dapat menambahkan, mengedit, dan menghapus proyek, pengalaman, dan keahlian secara langsung.",
        accent: "primary",
      },
      {
        id: "cms-2",
        title: "Antarmuka Admin Intuitif",
        caption:
          "Desain panel admin yang sederhana dan mudah digunakan tanpa memerlukan pengetahuan teknis.",
        accent: "lime",
      },
      {
        id: "cms-3",
        title: "Arsitektur Fullstack Modern",
        caption:
          "Menggunakan Next.js untuk frontend, Node.js untuk backend, dan MySQL untuk penyimpanan data.",
        accent: "orange",
      },
    ],
    images: [
      {
        src: projectAsset("cms-apps/main-menu-showcase-portfolio.png"),
        alt: "Tampilan Menu Utama CMS Apps",
        caption:
          "Menu utama aplikasi CMS Portfolio Apps dengan menampilkan showcase portofolio proyek",
      },
      {
        src: projectAsset("cms-apps/detail-showcase-project.png"),
        alt: "Detail Showcase Proyek",
        caption:
          "Tampilan detail showcase proyek dengan deskripsi pekerjaan, role, dan tautan terkait.",
      },
      {
        src: projectAsset("cms-apps/page-about.png"),
        alt: "Halaman Tentang Saya",
        caption:
          "Tampilan halaman tentang saya dengan informasi pribadi, kontak, dan pengalaman kerja dalam bentuk timeline.",
      },
      {
        src: projectAsset("cms-apps/dashboard-panel-cms.png"),
        alt: "Panel Dashboard CMS",
        caption:
          "Tampilan panel dashboard CMS berisi informasi terkait konten portofolio, pengalaman, dan keahlian yang dapat dikelola secara real-time.",
      },
      {
        src: projectAsset("cms-apps/manajemen-portofolio.png"),
        alt: "Panel Manajemen Portofolio",
        caption:
          "Tampilan panel manajemen portofolio berisi informasi terkait proyek, pengalaman, dan keahlian yang dapat dikelola secara real-time.",
      },
      {
        src: projectAsset("cms-apps/manajemen-experience.png"),
        alt: "Panel Manajemen Pengalaman",
        caption:
          "Tampilan panel manajemen pengalaman berisi informasi terkait pengalaman bekerja dalam sebuah instansi yang dapat dikelola secara real-time.",
      },
    ],
  },
  {
    id: "courier-dss",
    name: "SPK Seleksi Penerimaan Kurir (Naive Bayes)",
    kind: "Skripsi · Machine Learning & DSS",
    category: "Machine Learning",
    year: "2026",
    stack: [
      "React Native",
      "Android",
      "Python",
      "Naive Bayes",
      "Decision Support System",
    ],
    blurb:
      "Sistem Pendukung Keputusan untuk PT. Amerta Bertiga Sejahtera yang menerapkan algoritma klasifikasi Naive Bayes dalam menyaring kandidat kurir baru secara objektif dengan tingkat akurasi mencapai 94%.",
    challenge:
      "Proses seleksi kandidat kurir baru membutuhkan metode penilaian yang konsisten, cepat, dan objektif berdasarkan kriteria pelamar.",
    solution:
      "Membangun model klasifikasi Naive Bayes yang terlatih pada data kriteria seleksi perusahaan sehingga menghasilkan rekomendasi kelayakan kandidat dengan akurasi tervalidasi 94%.",
    deliverables: [
      "Pipeline Preprocessing & Pemodelan Naive Bayes",
      "Evaluasi Model & Validasi Akurasi (94%)",
      "Sistem Pendukung Keputusan Seleksi Kurir",
    ],
    metrics: [
      { value: "94%", label: "akurasi klasifikasi" },
      { value: "ML", label: "algoritma Naive Bayes" },
      { value: "SPK", label: "dukungan keputusan" },
    ],
    cards: [
      {
        id: "dss-1",
        title: "Klasifikasi Probabilistik",
        caption:
          "Mengevaluasi profil kandidat secara terukur menggunakan algoritma Naive Bayes.",
        accent: "orange",
      },
      {
        id: "dss-2",
        title: "Akurasi Tervalidasi 94%",
        caption:
          "Hasil pengujian menunjukkan konsistensi tinggi dalam memprediksi kelayakan penerimaan kurir.",
        accent: "primary",
      },
      {
        id: "dss-3",
        title: "Dampak Operasional HR",
        caption:
          "Membantu tim rekrutmen mengambil keputusan lebih cepat berbasis data historis.",
        accent: "lime",
      },
    ],
    images: [
      {
        src: projectAsset("spk-apps/onboarding-screen.png"),
        alt: "Tampilan Onboarding SPK Apps",
        caption:
          "Tampilan awal aplikasi SPK Seleksi Penerimaan Kurir yang menampilkan informasi singkat tentang sistem dan cara penggunaannya.",
      },
      {
        src: projectAsset("spk-apps/login-page.png"),
        alt: "Tampilan Login SPK Apps",
        caption:
          "Tampilan login aplikasi SPK Seleksi Penerimaan Kurir yang memungkinkan Tim Rekrutmen untuk masuk ke dalam sistem.",
      },
      {
        src: projectAsset("spk-apps/dashboard-aplikasi.png"),
        alt: "Tampilan Dashboard SPK Apps",
        caption:
          "Tampilan dashboard aplikasi SPK Seleksi Penerimaan Kurir yang menampilkan overview informasi terkait prediksi calon kurir, serta beberapa menu sebagai quick access.",
      },
      {
        src: projectAsset("spk-apps/manajemen-fitur-kriteria.png"),
        alt: "Tampilan Manajemen Fitur SPK Apps",
        caption:
          "Tampilan manajemen fitur aplikasi SPK Seleksi Penerimaan Kurir yang memungkinkan Tim Rekrutmen untuk mengelola kriteria seleksi secara real-time.",
      },
      {
        src: projectAsset("spk-apps/menu-dataset.png"),
        alt: "Tampilan Menu Dataset SPK Apps",
        caption:
          "Tampilan menu dataset aplikasi SPK Seleksi Penerimaan Kurir yang menampilkan data historis kandidat kurir yang digunakan untuk melatih model Naive Bayes.",
      },
      {
        src: projectAsset("spk-apps/menu-prediksi-kelayakan-calon-kurir.png"),
        alt: "Tampilan Menu Prediksi Kelayakan Calon Kurir",
        caption:
          "Tampilan menu prediksi kelayakan calon kurir yang menampilkan hasil analisis berdasarkan data historis.",
      },
      {
        src: projectAsset("spk-apps/page-laporan.png"),
        alt: "Tampilan Page Laporan SPK Apps",
        caption:
          "Tampilan page laporan aplikasi SPK Seleksi Penerimaan Kurir yang menampilkan hasil analisis berdasarkan data historis.",
      },
    ],
  },
  {
    id: "network-ops",
    name: "Network Operation Center & Server @ 7Tech",
    kind: "Infrastruktur · Program Magang",
    category: "Infrastruktur",
    year: "2021",
    stack: ["Linux Server", "LAN/VLAN", "Firewall", "Orion SolarWinds"],
    blurb:
      "Menjaga operasional 100+ server dan perangkat jaringan tetap stabil pada uptime 99%, merancang ulang topologi LAN/VLAN/firewall untuk menekan insiden 20%, serta menyusun SOP yang mempercepat onboarding 90%.",
    challenge:
      "Skala infrastruktur dengan 100+ perangkat membutuhkan pemantauan proaktif, segmentasi jaringan yang rapi, serta dokumentasi operasional yang standar.",
    solution:
      "Mengonfigurasi ulang segmentasi LAN/VLAN & firewall, mengimplementasikan monitoring Orion SolarWinds, menerapkan server hardening & backup terjadwal, serta mendokumentasikan SOP teknis.",
    deliverables: [
      "Redesain Topologi LAN / VLAN / Firewall",
      "Dashboard Monitoring Orion SolarWinds",
      "Dokumentasi SOP Server & Onboarding Tim",
    ],
    metrics: [
      { value: "99%", label: "uptime sistem" },
      { value: "-20%", label: "insiden jaringan" },
      { value: "+90%", label: "kecepatan onboarding" },
    ],
    cards: [
      {
        id: "net-1",
        title: "Pemantauan 100+ Perangkat",
        caption:
          "Monitoring aktif menggunakan Orion SolarWinds dengan respons tiket di bawah 10 menit.",
        accent: "primary",
      },
      {
        id: "net-2",
        title: "Segmentasi LAN/VLAN & Firewall",
        caption:
          "Redesain topologi yang menekan insiden gangguan konektivitas hingga 20%.",
        accent: "orange",
      },
      {
        id: "net-3",
        title: "Dokumentasi SOP Standar",
        caption:
          "Panduan administrasi terstruktur yang mempercepat adaptasi anggota tim baru sebesar 90%.",
        accent: "lime",
      },
    ],
    images: [
      {
        src: projectAsset("network-ops/bukti-sertifikat-magang.png"),
        alt: "Bukti Sertifikat Magang 7Tech",
        caption:
          "Sertifikat resmi program magang di 7Tech Digital yang menegaskan pengalaman dan kontribusi dalam pengelolaan Network Operation Center & Server.",
      },
      {
        src: projectAsset("network-ops/bukti-sertifikat-magang-2.png"),
        alt: "Bukti Sertifikat Magang 7Tech",
        caption:
          "Sertifikat resmi program magang di 7Tech Digital yang menegaskan pengalaman dan kontribusi dalam pengelolaan Network Operation Center & Server.",
      },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Bahasa Pemrograman",
    accent: "primary",
    description:
      "Fondasi logika pemrograman lintas web, backend, desktop, dan pengolahan data.",
    items: [
      { name: "JavaScript", level: "Mahir", iconKey: "JavaScript" },
      { name: "TypeScript", level: "Mahir", iconKey: "TypeScript" },
      { name: "PHP", level: "Mahir", iconKey: "PHP" },
      { name: "Python", level: "Menengah–Mahir", iconKey: "Python" },
      { name: "SQL", level: "Mahir", iconKey: "SQL" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    accent: "orange",
    description:
      "Membangun antarmuka modern yang responsif, aksesibel, dan interaktif.",
    items: [
      { name: "React.js", level: "Mahir", iconKey: "React.js" },
      { name: "Next.js", level: "Mahir", iconKey: "Next.js" },
      { name: "Svelte", level: "Menengah–Mahir", iconKey: "Svelte" },
      { name: "HTML5", level: "Mahir", iconKey: "HTML5" },
      { name: "CSS3", level: "Mahir", iconKey: "CSS3" },
      { name: "Tailwind CSS", level: "Mahir", iconKey: "Tailwind CSS" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    accent: "lime",
    description:
      "Perancangan logika bisnis, autentikasi, dan layanan API yang andal.",
    items: [
      { name: "Node.js", level: "Mahir", iconKey: "Node.js" },
      { name: "Express.js", level: "Mahir", iconKey: "Express.js" },
      { name: "Laravel", level: "Mahir", iconKey: "Laravel" },
      { name: "REST API", level: "Mahir", iconKey: "REST API" },
    ],
  },
  {
    id: "databases",
    title: "Basis Data",
    accent: "primary",
    description:
      "Pemodelan relasional dan non-relasional dengan performa query terjaga.",
    items: [
      { name: "MySQL", level: "Mahir", iconKey: "MySQL" },
      { name: "PostgreSQL", level: "Menengah–Mahir", iconKey: "PostgreSQL" },
      { name: "MongoDB", level: "Menengah", iconKey: "MongoDB" },
    ],
  },
  {
    id: "infra",
    title: "Infrastruktur & Jaringan",
    accent: "orange",
    description:
      "Pengelolaan server Linux, keamanan jaringan, dan stabilitas layanan.",
    items: [
      {
        name: "Linux Server Administration",
        level: "Menengah–Mahir",
        iconKey: "Linux Server Administration",
      },
      {
        name: "Networking (LAN/VLAN/Firewall)",
        level: "Menengah–Mahir",
        iconKey: "Networking (LAN/VLAN/Firewall)",
      },
      { name: "DNS", level: "Menengah", iconKey: "DNS" },
      { name: "DHCP", level: "Menengah", iconKey: "DHCP" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Metodologi",
    accent: "lime",
    description:
      "Alur kerja kolaboratif, kontainerisasi, dan pengujian API standar industri.",
    items: [
      { name: "Git/GitHub", level: "Mahir", iconKey: "Git/GitHub" },
      { name: "Docker", level: "Menengah", iconKey: "Docker" },
      { name: "CI/CD Dasar", level: "Menengah", iconKey: "CI/CD basics" },
      { name: "Agile/Scrum", level: "Terbiasa", iconKey: "Agile/Scrum" },
      { name: "Postman", level: "Mahir", iconKey: "Postman" },
    ],
  },
];

export const skillIcons: Record<string, string> = {
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "React.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  Svelte:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  HTML5:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  Laravel:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  "REST API":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  MySQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  PostgreSQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Linux Server Administration":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "Networking (LAN/VLAN/Firewall)":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unix/unix-original.svg",
  DNS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg",
  DHCP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg",
  "Git/GitHub":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "CI/CD basics":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "Agile/Scrum":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-original.svg",
  Postman:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
};

export const education = {
  degree: "S1 Teknik Informatika",
  school: "Universitas Indraprasta PGRI",
  period: "2022 — 2026",
  gpa: "3.65 / 4.00",
  thesisTitle:
    "Implementasi Algoritma Naive Bayes dalam Sistem Pendukung Keputusan Seleksi Penerimaan Kurir Baru Pada PT. Amerta Bertiga Sejahtera",
  thesisSummary:
    "Merancang sistem pendukung keputusan berbasis algoritma Naive Bayes untuk membantu evaluasi penerimaan kurir baru secara objektif dengan tingkat akurasi klasifikasi mencapai 94%.",
};

export const navItems = [
  { label: "Tentang", href: "#about" },
  { label: "Proyek", href: "#work" },
  { label: "Pengalaman", href: "#experience" },
  { label: "Keahlian", href: "#skills" },
  { label: "Kontak", href: "#contact" },
];
