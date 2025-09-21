// Readmore bttn
  const readMoreBtn = document.getElementById("readMoreBtn");
  const insuranceContent = document.getElementById("insuranceContent");
  let expanded = false;

  readMoreBtn.addEventListener("click", () => {
    if (!expanded) {
      insuranceContent.style.maxHeight = "2000px";
      readMoreBtn.textContent = "Read Less";
    } else {
      insuranceContent.style.maxHeight = "200px";
      readMoreBtn.textContent = "Read More";
    }
    expanded = !expanded;
  });

// Akhir Readmore

// Materialize css gambar dan scrollspy ++ parallax
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
         const parallax = document.querySelectorAll('.parallax');
      M.Parallax.init(parallax);

      const materialbox = document.querySelectorAll('.materialboxed');
      M.Materialbox.init(materialbox);

      const scroll = document.querySelectorAll('.scrollspy');
      M.ScrollSpy.init(scroll, {
        scrollOffset: 70
      });

      // akhir materialize css scroll spy ++ parallax

      // checkout premi

      document.getElementById("carInsuranceForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const merek = document.getElementById("merek").value;
  const jenis = document.getElementById("jenis").value;
  const tahun = parseInt(document.getElementById("tahun").value);
  const harga = parseFloat(document.getElementById("harga").value);
  const plat = document.getElementById("plat").value;
  const mesin = document.getElementById("mesin").value;
  const rangka = document.getElementById("rangka").value;
  const pemilik = document.getElementById("pemilik").value;

  const currentYear = new Date().getFullYear();
  const umur = currentYear - tahun;

  let premi = 0;
  if (umur <= 3) {
    premi = 0.025 * harga;
  } else if (umur <= 5 && harga < 200000000) {
    premi = 0.04 * harga;
  } else if (umur <= 5 && harga >= 200000000) {
    premi = 0.03 * harga;
  } else {
    premi = 0.05 * harga;
  }

  // tampilkan di index
  document.getElementById("result").style.display = "block";
  document.getElementById("premiResult").innerHTML = `
    Umur mobil: <b>${umur} tahun</b><br>
    Harga mobil: <b>Rp ${harga.toLocaleString()}</b><br>
    Premi per tahun: <b>Rp ${premi.toLocaleString()}</b>
  `;

  // simpan ke localStorage untuk checkout
  const dataCheckout = {
    pemilik,
    merek,
    jenis,
    tahun,
    harga,
    premi
  };
  localStorage.setItem("checkoutData", JSON.stringify(dataCheckout));
});

      // Akhir checkout premi


             // Data Mobil Asuransi-mobil.html
         
   







