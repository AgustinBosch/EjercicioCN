    <script>
    </script>
  
  <footer class="footer"> 
    <div class="footer-content">
      <p>Desarrollado por <strong>Ariel Ortiz</strong></p>
      <div class="social-links">
        <a href="https://github.com/ariel957" target="_blank" rel="noopener noreferrer">
          <img src="/icons/icons8-github.svg" alt="GitHub" class="icon" /> GitHub
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/icons8-linkedin.svg" alt="LinkedIn" class="icon" /> LinkedIn
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/icons8-instagram.svg" alt="Twitter" class="icon" /> Instagram
        </a>
      </div>
    </div>
  </footer>
  
  <style>
    .footer {
      background-color: #54a6ff; 
      color: white; 
      padding: 20px; 
      text-align: center;
      font-family: "Calligraffitti", cursive;
      box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2); 
      position: fixed; 
      bottom: 0; 
      left: 0; 
      width: 100%; 
      z-index: 1000; 
    }
  
    .footer-content {
      display: flex; 
      flex-direction: column;
      align-items: center; 
      gap: 10px; 
    }
  
    .social-links {
      display: flex; 
      gap: 20px; 
    }
  
    .social-links a {
      color: white;
      text-decoration: none; 
      font-size: 1rem; 
      display: flex; 
      align-items: center;
    }
  
    .social-links a:hover {
      color: #0056b3; 
    }
  
    .icon {
      width: 20px;
      height: 20px; 
      margin-right: 8px; 
    }
  </style>