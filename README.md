# Music Explorer - UTS Pengembangan Aplikasi Web

Proyek ini dibuat untuk memenuhi Ujian Tengah Semester (UTS) mata kuliah IF25-22014 Pengembangan Aplikasi Web.

Nama: Nadya Shafwah Yusuf

NIM: 123140167

Studi Kasus: Digit 7 - Music Explorer

## Link Deployment Vercel

[Link Vercel](https://uts-pemweb-123140167.vercel.app/)

## Tampilan

![tampilan](https://github.com/nadshafy/uts-pemweb-123140167/blob/main/src/assets/Screenshot_20251102_193814.png)

## Fitur-Fitur

Aplikasi ini mengimplementasikan semua fitur wajib dan beberapa fitur tambahan:

### Fitur Wajib

* Form Pencarian: Form pencarian berdasarkan keyword (input teks) dan media type (dropdown).

* Tabel Hasil: Menampilkan hasil pencarian dari iTunes API dalam tabel (Artwork, Judul, Artis, Harga).

* Audio Preview: Memutar sample audio langsung dari tabel hasil.

* Playlist Builder: Fungsi untuk menambah lagu ke playlist dan data playlist tersimpan di localStorage.

* Sorting: Mengurutkan hasil pencarian berdasarkan "Harga" atau "Tanggal Rilis".

### Fitur Tambahan

* Detail Modal: Menampilkan informasi lebih lengkap (Album, Genre, Rilis) saat judul lagu di tabel diklik.

* Manajemen Playlist: Menghapus lagu satu per satu dari playlist.

* Kosongkan Playlist: Tombol untuk menghapus semua lagu dari playlist sekaligus.

* Loading & Error: Tampilan loading kustom dan penanganan error yang jelas.

## Teknologi yang Digunakan

* React.js (Vite): Library utama untuk membangun user interface.

* React Hooks: Menggunakan useState untuk state management dan useEffect untuk lifecycle (termasuk sinkronisasi localStorage).

* Fetch API: Digunakan untuk mengambil data secara asinkron dari iTunes Search API.

* CSS Murni: Styling kustom dengan layout Flexbox/Grid, responsive design (media queries), dan efek glassmorphism.

* localStorage: Digunakan untuk menyimpan data playlist secara persisten di browser pengguna.

## Cara Instalasi dan Menjalankan

Untuk menjalankan proyek ini secara lokal di komputer Anda:

1. Clone repository ini:

```
git clone https://github.com/nadshafy/uts-pemweb-123140167.git
```


2. Masuk ke direktori proyek:
```
cd uts-pemweb-123140167
```

3. Install semua dependencies:
'''
npm install
'''

4. Jalankan development server:
```
npm run dev
```

5. Buka http://localhost:5173 di browser Anda.
