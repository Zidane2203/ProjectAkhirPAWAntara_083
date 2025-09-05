import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Tentang Blablalink NIKKE</h1>
        <p className="mb-4">
          <strong>Blablalink NIKKE</strong> adalah aplikasi web yang dikembangkan sebagai project akhir mata kuliah <em>Pengembangan Aplikasi Web</em>. Aplikasi ini memanfaatkan <strong>Node.js, Express, EJS, dan MySQL</strong> untuk membuat sistem sederhana dengan fitur utama:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>CRUD <em>Guide</em> (Nama + Link) dengan database MySQL</li>
          <li>Menampilkan <em>Guide</em> sederhana dari array lokal</li>
          <li>Daftar lengkap karakter NIKKE versi terbaru (array statis)</li>
          <li>UI responsif menggunakan <strong>TailwindCSS</strong></li>
        </ul>
        <p className="mb-6">
          Proyek ini diharapkan dapat membantu mahasiswa memahami konsep dasar <em>Full-Stack Web Development</em> dengan implementasi nyata menggunakan framework modern.
        </p>
        <Link
          to="/home"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default About;
