// gambar materialize
const sidenav = document.querySelectorAll('.sidenav');
M.Sidenav.init(sidenav);

const slider = document.querySelectorAll('.slider');
M.Slider.init(slider, {
  indicators: false,
  height: 450,
  transition: 600,
  interval: 3000
});

          // Login 
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems);

      // Cek login status
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const userName = localStorage.getItem("userName");
      const navMenu = document.getElementById("navMenu");
      const mobileMenu = document.getElementById("mobileMenu");

        if (isLoggedIn !== "true" || !userName) {
        alert("Silakan login terlebih dahulu untuk mengakses halaman ini.");
        window.location.href = "login.html";
        return; // stop script
        }

        navMenu.innerHTML = `
          <li><a href="../index.html">Back Home</a></li>
          <li><a href="#" class="btn indigo darken-3 white-text waves-effect waves-light" style="border-radius: 25px;"> ${userName}</a></li>
          <li><a href="./history.html" class="btn green darken-2 white-text" id="historybtn">History</a></li>
          <li><a href="#" class="btn red white-text logoutBtn">Logout</a></li>
        `;

        mobileMenu.innerHTML = `
          <li><a href="../index.html">Back Home</a></li>
          <li><a href="#" class="btn indigo darken-3 white-text waves-effect waves-light" style="border-radius: 25px;"> ${userName}</a></li>
          <li><a href="./history.html" class="btn green darken-2 white-text" id="historybtn">History</a></li>
          <<li><a href="#" class="btn red white-text logoutBtn">Logout</a></li>
        `;
          
        // tombol logout
           document.querySelectorAll(".logoutBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("history");
    alert("Anda sudah logout.");
    window.location.href = "./asuransi/login.html";
  });
});
      });

/* Akhir Cek login status */

// form
document.addEventListener("DOMContentLoaded", function () {
  // init materialize
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  const form = document.getElementById("formKesehatan");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // ambil data form
    const nama = document.getElementById("nama").value.trim();
    const tanggalLahir = document.getElementById("tanggalLahir").value;
    const pekerjaan = document.getElementById("pekerjaan").value.trim();

    // radio button (ubah jadi Ya/Tidak)
    const merokokValue = document.querySelector("input[name='merokok']:checked").value;
    const hipertensiValue = document.querySelector("input[name='hipertensi']:checked").value;
    const diabetesValue = document.querySelector("input[name='diabetes']:checked").value;

    const merokok = merokokValue === "1" ? "Ya" : "Tidak";
    const hipertensi = hipertensiValue === "1" ? "Ya" : "Tidak";
    const diabetes = diabetesValue === "1" ? "Ya" : "Tidak";

    if (!nama || !tanggalLahir || !pekerjaan) {
      alert("Harap isi semua data!");
      return;
    }

    // hitung umur
    const today = new Date();
    const lahir = new Date(tanggalLahir);
    let umur = today.getFullYear() - lahir.getFullYear();
    const monthDiff = today.getMonth() - lahir.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < lahir.getDate())) {
      umur--;
    }

    // faktor pengali umur (m)
    let m = 0.1;
    if (umur <= 20) m = 0.1;
    else if (umur <= 35) m = 0.2;
    else if (umur <= 50) m = 0.25;
    else m = 0.4;

    // premi dasar
    const P = 2000000;
    // rumus premi
    const premi =
      P +
      m * P +
      (merokokValue === "1" ? 0.5 * P : 0) +
      (hipertensiValue === "1" ? 0.4 * P : 0) +
      (diabetesValue === "1" ? 0.5 * P : 0);

    // tampilkan ke modal
    document.getElementById("premiAllianz").textContent =
      "Rp " + premi.toLocaleString("id-ID");
    document.getElementById("premiPrudential").textContent =
      "Rp " + (premi * 1.1).toLocaleString("id-ID");

    // buka modal
    const modal = M.Modal.getInstance(document.getElementById("premiHealthModal"));
    modal.open();

    // tombol checkout Allianz
    document.getElementById("btnAllianz").onclick = () => {
      localStorage.setItem("checkoutData", JSON.stringify({
        kategori: "Kesehatan",
        pemilik: nama,
        tanggalLahir,
        pekerjaan,
        merokok,
        hipertensi,
        diabetes
      }));
      localStorage.setItem("selectedInsurance", JSON.stringify({
        name: "Allianz",
        logo: "../assets/partner/allianz.png",
        premi: premi
      }));
      window.location.href = "checkout.html?asuransi=Allianz";
    };

    // tombol checkout Prudential
    document.getElementById("btnPrudential").onclick = () => {
      localStorage.setItem("checkoutData", JSON.stringify({
        kategori: "Kesehatan",
        pemilik: nama,
        tanggalLahir,
        pekerjaan,
        merokok,
        hipertensi,
        diabetes
      }));
      localStorage.setItem("selectedInsurance", JSON.stringify({
        name: "Prudential",
        logo: "../assets/partner/prudential.png",
        premi: premi * 1.1
      }));
      window.location.href = "checkout.html?asuransi=Prudential";
    };

  });
});
