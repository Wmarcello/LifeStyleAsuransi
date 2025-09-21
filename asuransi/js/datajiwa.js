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
          <li><a href="#" id="logoutBtn" class="btn red white-text">Logout</a></li>
        `;

        mobileMenu.innerHTML = `
          <li><a href="../index.html">Back Home</a></li>
          <li><a href="#" class="btn indigo darken-3 white-text waves-effect waves-light" style="border-radius: 25px;"> ${userName}</a></li>
          <li><a href="./history.html" class="btn green darken-2 white-text" id="historybtn">History</a></li>
          <li><a href="#" id="logoutBtn" class="btn red white-text">Logout</a></li>
        `;

        // Tombol logout
        document.getElementById("logoutBtn").addEventListener("click", function() {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userName");
          alert("Anda sudah logout.");
          window.location.href = "./login.html";
        });
      });

/* Akhir Cek login status */

//  Form Asuransi Jiwa
 document.addEventListener("DOMContentLoaded", function() {
      M.AutoInit();

      const form = document.getElementById("formJiwa");
      form.addEventListener("submit", function(e) {
        e.preventDefault();

        const nama = document.getElementById("nama").value;
        const tgl = document.getElementById("tanggalLahir").value;
        const pertanggungan = parseInt(document.getElementById("pertanggungan").value);

        // hitung umur
        const birthDate = new Date(tgl);
        const today = new Date();
        let umur = today.getFullYear() - birthDate.getFullYear();
        const mDiff = today.getMonth() - birthDate.getMonth();
        if (mDiff < 0 || (mDiff === 0 && today.getDate() < birthDate.getDate())) {
          umur--;
        }

        // hitung premi
        let m = 0;
        if (umur <= 30) m = 0.002;
        else if (umur <= 50) m = 0.004;
        else m = 0.01;

        const premi = m * pertanggungan;

           // tampilkan ke modal
    document.getElementById("premiAIA").textContent =
      "Rp " + premi.toLocaleString("id-ID");
    document.getElementById("premiAstraLife").textContent =
      "Rp " + (premi * 1.1).toLocaleString("id-ID"); // contoh beda sedikit

    // buka modal
    const modal = M.Modal.getInstance(document.getElementById("premiJiwaModal"));
    modal.open();

        // tombol checkout Allianz
      document.getElementById("btnAIA").onclick = () => {
      localStorage.setItem("checkoutData", JSON.stringify({
        kategori: "Jiwa",
        pemilik: nama,
        tanggalLahir: tgl,
        pertanggungan,
       
      }));
      localStorage.setItem("selectedInsurance", JSON.stringify({
        name: "AIA",
        logo: "../assets/partner/aia.png",
        premi: premi
      }));
      window.location.href = "checkout.html?asuransi=AIA";
    };

    // tombol checkout Prudential
    document.getElementById("btnAstraLife").onclick = () => {
      localStorage.setItem("checkoutData", JSON.stringify({
        kategori: "Jiwa",
        pemilik: nama,
        tanggalLahir: tgl,
        pertanggungan,
        
       
      }));
      localStorage.setItem("selectedInsurance", JSON.stringify({
        name: "AstraLife",
        logo: "../assets/insurancelife/astralife.png",
        premi: premi * 1.1
      }));
      window.location.href = "checkout.html?asuransi=AstraLife";
    };

  });

      });

      // akhir form asuransi jiwa