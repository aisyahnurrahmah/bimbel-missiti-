  // toggle menu
function togglemenu(event) {
    if(event) event.preventDefault(); //mencegah efek bawaan tag a di img
    const navMenu = document.getElementById('container-menu')
    navMenu.classList.toggle('active')
}
// ini foto berpindah di halaman home
const slider = document.querySelector('.slide');
const btnprev = document.querySelector('.btnprev'); 
const btnnext = document.querySelector('.btnnext');
if(slider && btnprev &&btnnext){
  btnnext.addEventListener('click', function() {
    slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
    resetAutoSlide();
  });

  btnprev.addEventListener('click', function() {
    slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
    resetAutoSlide();
  });

  // Auto Slide tiap 4 detik
  let autoSlideInterval = setInterval(nextSlide, 2000);

  function nextSlide() {
  //   Jika sudah di ujung kanan, kembali ke pertama lagi 
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
    }
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 2000);
  }
}

// halaman contact
const formlogin = document.getElementById('formlogin');
// buat bikin tombol daftar sekarang kehubung sama no.wa nya
if (formlogin){
  formlogin.addEventListener('submit', function(event)
  {event.preventDefault();
    const linkWa = 'https://api.whatsapp.com/send?phone=6282343119259';
    window.open(linkWa, '_blank');
  });
}
// PROGRAM BIMBEL SESUAI JENJANG
const sameButtons = document.querySelectorAll('.same-button');
const programCards = document.querySelectorAll('.card-program');
// FUNGSI YANG MEMFILTER & MENGAKTIFKAN CARD PROGRAM
function filterJenjang(targetJenjang) {
  sameButtons.forEach(button => {
    if (button.getAttribute('data-jenjang') === targetJenjang) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  programCards.forEach(card => {
    const cardJenjang = card.getAttribute('data-jenjang');

    if (cardJenjang === targetJenjang || targetJenjang === 'semua'){
      card.style.display = 'block';
    } 
    else{
      card.style.display= 'none';
    }
  });
};

if(sameButtons.length >0 && programCards.length >0){
  // NGECEK PARAMATER DARI FOOTER BUTTON ITU
  const urlparameter = new URLSearchParams(window.location.search);
  const Jenjangfromurl = urlparameter.get('jenjang');

  if (Jenjangfromurl) {
    filterJenjang(Jenjangfromurl);
  }
  // EVENT SAAT TOMBOL DIKLIK MANUAL
  sameButtons.forEach(button => {
    button.addEventListener('click', function(){
      sameButtons.forEach(button => button.classList.remove('active'));
      this.classList.add('active');
      // ambil data jenjang
      const targetJenjang = this.getAttribute('data-jenjang');
      filterJenjang(targetJenjang);
    })
  });
}


