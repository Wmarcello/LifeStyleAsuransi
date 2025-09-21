// gambar materialize
        const sidenav = document.querySelectorAll('.sidenav');
      M.Sidenav.init(sidenav);

      const slider = document.querySelectorAll('.slider');
      M.Slider.init(slider, 
        {
          indicators: false,
          height: 450,
          transition: 600,
          interval: 3000
        }
      );

      // akhir gambar materialize

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
          <li><a href="#" class="btn red white-text logoutBtn">Logout</a></li>
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
{/* Akhir Cek login status */}

// Form
   document.addEventListener('DOMContentLoaded', function() {
  // Inisialisasi select materialize
  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);

  // Generate pilihan tahun
  const tahunSelect = document.getElementById("tahun");
  const thisYear = new Date().getFullYear();
  for (let y = thisYear; y >= 2000; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    tahunSelect.appendChild(opt);
  }
  M.FormSelect.init(tahunSelect); // re-init setelah append
});

// akhir form

      // Asurasni mobil File cancel + preview

      function previewImage(input, previewId) {
    const previewBox = document.getElementById(previewId);
    previewBox.innerHTML = ""; // reset

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement("img");
        img.src = e.target.result;

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Hapus";
        cancelBtn.className = "btn red cancel-btn";
        cancelBtn.onclick = function() {
          input.value = "";
          previewBox.innerHTML = "";
        };

        previewBox.appendChild(img);
        previewBox.appendChild(cancelBtn);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }


      // Akhir Asuransi mobil File cancel + preview

     document.getElementById("carInsuranceForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const pemilik = document.getElementById("pemilik").value;
  const merek = document.getElementById("merek").value;
  const jenis = document.getElementById("model").value;
  const varian = document.getElementById("varian").value;
  const mesin = document.getElementById("mesin").value;
  const rangka = document.getElementById("rangka").value;
  const plat = document.getElementById("plat").value;
  const tahun = parseInt(document.getElementById("tahun").value);
  const harga = parseFloat(document.getElementById("harga").value);

  const tahunSekarang = new Date().getFullYear();
  const umurMobil = tahunSekarang - tahun;

  let premi = 0;

  if (umurMobil >= 0 && umurMobil <= 3) {
    premi = 0.025 * harga;
  } else if (umurMobil > 3 && umurMobil <= 5) {
    if (harga < 200000000) {
      premi = 0.04 * harga;
    } else {
      premi = 0.03 * harga;
    }
  } else if (umurMobil > 5) {
    premi = 0.05 * harga;
  }

  document.getElementById("premiSeal").textContent = `Rp ${premi.toLocaleString('id-ID')}`;
  document.getElementById("premiZurich").textContent = `Rp ${(premi * 1.1).toLocaleString('id-ID')}`;

  const checkoutData = {
    pemilik, merek, jenis, varian, tahun, mesin, rangka, plat, harga, premi
  };
  localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

  // buka modal
  const modal = M.Modal.getInstance(document.getElementById('premiModal'));
  modal.open();

  // handle tombol SealInsure
  // tombol checkout Allianz
    document.getElementById("btnSeal").onclick = () => {
      localStorage.setItem("checkoutData", JSON.stringify({
        kategori: "Mobil",
        pemilik,
        merek,
        jenis,
        varian,
        plat,
        tahun,
        harga,
      }));
      localStorage.setItem("selectedInsurance", JSON.stringify({
        name: "SealInsure",
        logo: "../assets/partner/allianz.png",
        premi: premi
      }));
      window.location.href = "checkout.html?asuransi=SealInsure";
    };

    // tombol checkout Prudential
    
    document.getElementById("btnZurich").onclick = () => {
      localStorage.setItem("checkoutData", JSON.stringify({
        kategori: "Mobil",
        pemilik,
        merek,
        jenis,
        varian,
        plat,
        tahun,
        harga,
      }));
      localStorage.setItem("selectedInsurance", JSON.stringify({
        name: "Zurich",
        logo: "../assets/partner/zurich.png",
        premi: premi * 1.1
      }));
      window.location.href = "checkout.html?asuransi=Zurich";
    };

  });

// init modal
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);
});


// testimoni

let index = 0;
const slides = document.querySelectorAll('.slide');

function showSlide() {
  slides.forEach((s, i) => {
    s.classList.remove('active');
    if (i === index) s.classList.add('active');
  });
  index = (index + 1) % slides.length;
}

setInterval(showSlide, 4000); // ganti tiap 4 detik


// akhir testimoni


      // Data Merek -> Model -> Varian
const dataMobil = {
   "AION": {
    "Y Plus": ["Standard", "Premium"],
    "LX Plus": ["80D", "80 Max"]
  },
  "AUDI": {
    "A4": ["2.0 TFSI", "2.0 TFSI Quattro"],
    "Q5": ["2.0 TFSI Quattro", "Sportback 45 TFSI"]
  },
  "BAIC": {
    "X55": ["Elite", "Premium"],
    "BJ40": ["SE 4x4", "P Series"]
  },
  "BMW": {
    "3 Series": ["320i Sport", "330i M Sport"],
    "X5": ["xDrive40i", "xDrive45e Plug-in Hybrid"]
  },
  "BYD": {
    "Dolphin": ["Active", "Premium"],
    "Seal": ["Dynamic Standard", "Performance AWD"]
  },
  "CHERY": {
    "Tiggo 7 Pro": ["Comfort", "Elite", "Premium"],
    "Omoda 5": ["RZ MT", "RZ CVT", "GT Turbo"]
  },
  "CITROEN": {
    "C3": ["Feel", "Shine"],
    "C5 Aircross": ["Shine", "Max"]
  },
  "DAIHATSU": {
    "Xenia": ["1.3 X MT", "1.3 R AT", "1.5 R CVT"],
    "Terios": ["X MT", "R AT Custom", "R Adventure"]
  },
  "DFSK": {
    "Glory 560": ["B-Type", "C-Type", "L-Type"],
    "Seres E1": ["Type B", "Type L"]
  },
  "FORD": {
    "Ranger": ["XL MT", "XLT AT", "Wildtrak 4x4"],
    "Everest": ["Trend AT", "Titanium AT 4x4"]
  },
  "HONDA": {
    "Brio": ["Satya S MT", "Satya E CVT", "RS CVT"],
    "HR-V": ["1.5 S MT", "1.5 E CVT", "1.5 RS Turbo"]
  },
  "HYUNDAI": {
    "Creta": ["Active MT", "Style IVT", "Prime IVT"],
    "IONIQ 5": ["Prime", "Signature Long Range"]
  },
  "ISUZU": {
    "MU-X": ["4x2 AT", "4x4 AT"],
    "D-Max": ["Hi-Lander MT", "V-Cross AT"]
  },
  "KIA": {
    "Seltos": ["EX MT", "EX+ IVT", "GT-Line Turbo"],
    "Sonet": ["Active MT", "Dynamic IVT", "Premiere Turbo"]
  },
  "LEXUS": {
    "RX": ["RX 350 Luxury", "RX 500h F-Sport"],
    "UX": ["UX 200 Luxury", "UX 300e EV"]
  },
  "MAZDA": {
    "CX-5": ["Elite", "Kuro Edition", "GT"],
    "Mazda 3": ["1.5 AT", "2.0 AT"]
  },
  "MERCEDES": {
    "C-Class": ["C200 Avantgarde", "C300 AMG Line"],
    "GLE": ["GLE 450 4MATIC", "GLE 53 AMG"]
  },
  "MITSUBISHI": {
    "Xpander": ["GLX MT", "Exceed AT", "Ultimate CVT"],
    "Pajero Sport": ["Dakar 4x2 AT", "Dakar Ultimate 4x4 AT"]
  },
  "NISSAN": {
    "Livina": ["VL AT", "VE MT"],
    "X-Trail": ["2.0 MT", "2.5 CVT"]
  },
  "FOTON": {
  "View CS2": ["Standard", "Luxury", "Business"],
  "View Transvan": ["Base", "Tourist"],
  "Tunland G7": ["Base", "Premium", "4x4"],
  "Aumark": ["Light Truck", "Medium Truck"]
},
"GMC": {
  "Sierra": ["1500 Pro", "1500 Denali", "1500 AT4X"],
  "Yukon": ["SLT", "AT4", "Denali Ultimate"],
  "Acadia": ["SLE", "SLT", "Denali"],
  "Canyon": ["Elevation", "AT4", "Denali"]
},
"GWM": {
  "Haval H6": ["2WD", "AWD", "Hybrid"],
  "Tank 300": ["Base", "Luxury", "Offroad"],
  "Ora Good Cat": ["400 Pro", "500 Ultra"],
  "Poer": ["Standard", "Luxury", "Offroad"]
},
  "PEUGEOT": {
    "3008": ["Allure", "GT"],
    "5008": ["Allure", "GT"]
  },
  "SUBARU": {
    "Forester": ["2.0i-S EyeSight", "2.0i-L EyeSight"],
    "XV": ["2.0i-S EyeSight"]
  },
  "SUZUKI": {
    "Ertiga": ["GL MT", "GX AT", "Hybrid Sport"],
    "XL7": ["Zeta MT", "Beta AT", "Alpha AT"]
  },
  "TOYOTA": {
    "Avanza": ["1.3 E MT", "1.3 G AT", "1.5 G MT"],
    "Innova": ["2.0 G MT", "2.4 V AT Diesel", "2.0 Venturer AT"],
    "Fortuner": ["2.4 G MT Diesel", "2.8 VRZ AT 4x4"]
  },
  "VOLKSWAGEN": {
    "Tiguan": ["1.4 TSI", "Allspace"],
    "Golf": ["GTI", "R-Line"]
  },
  "WULING": {
    "Confero": ["S 1.5C MT", "S 1.5L MT"],
    "Almaz": ["Exclusive CVT", "RS Pro Hybrid"],
    "Air EV": ["Long Range", "Standard Range"]
  }
};

// Update model berdasarkan merek
function updateModel() {
  const merek = document.getElementById("merek").value;
  const modelSelect = document.getElementById("model");
  const varianSelect = document.getElementById("varian");

  // Reset dropdown
  modelSelect.innerHTML = '<option value="" disabled selected>-- Pilih Model --</option>';
  varianSelect.innerHTML = '<option value="" disabled selected>-- Pilih Varian --</option>';

  if (dataMobil[merek]) {
    Object.keys(dataMobil[merek]).forEach(model => {
      const opt = document.createElement("option");
      opt.value = model;
      opt.textContent = model;
      modelSelect.appendChild(opt);
    });
  }

  // refresh materialize select
  M.FormSelect.init(modelSelect);
  M.FormSelect.init(varianSelect);
}

// Update varian berdasarkan model
function updateVarian() {
  const merek = document.getElementById("merek").value;
  const model = document.getElementById("model").value;
  const varianSelect = document.getElementById("varian");

  // Reset varian
  varianSelect.innerHTML = '<option value="" disabled selected>-- Pilih Varian --</option>';

  if (dataMobil[merek] && dataMobil[merek][model]) {
    dataMobil[merek][model].forEach(v => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      varianSelect.appendChild(opt);
    });
  }

  // refresh materialize select
  M.FormSelect.init(varianSelect);
}

      // Akhir Data Mobil