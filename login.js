// ==================== Supabase Config ====================
const supabaseUrl = "https://sojmbapgroetsgplshse.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvam1iYXBncm9ldHNncGxzaHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NzU4NzksImV4cCI6MjA3MjA1MTg3OX0.30hi6wuhjU0fcusAQLZbgBgw8z2UlOzRvMEXmIHX7hU"; 
const { createClient } = supabase;
const db = createClient(supabaseUrl, supabaseKey);

// ==================== Login ====================
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const { data, error } = await db.auth.signInWithPassword({ email, password });

  if (error) {
    errorMsg.textContent = "❌ " + error.message;
    errorMsg.classList.remove("hidden");
  } else {
    errorMsg.classList.add("hidden");
    alert("✅ Login berhasil!");
    window.location.href = "index.html"; // arahkan ke halaman utama
  }
});

// ==================== Cek session ====================
(async ()=>{
  const { data } = await db.auth.getSession();
  if(data.session){
    // sudah login, langsung ke dashboard
    window.location.href = "index.html";
  }
})();
