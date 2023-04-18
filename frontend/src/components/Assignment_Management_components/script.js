document.addEventListener("DOMContentLoaded", () => {
    // Your code here
  
    const dbar = document.querySelector(".detailedBar");
    const dbutton = document.querySelector(".detailedBar button");
  
    if (dbutton) { // Check if element is present in the DOM
      dbutton.addEventListener("click", () => {
        const visible = dbar.getAttribute("hash");
  
        if (visible === "false") {
          dbar.setAttribute("hash", true);
        } else if (visible === "true") {
          dbar.setAttribute("hash", false);
        }
      });
    }
  
    let sidebar = document.querySelector(".side-bar");
    let sidebarBtn = document.getElementById("checkbtn");
  
    if (sidebarBtn) { // Check if element is present in the DOM
      sidebarBtn.addEventListener("click", () => {
        var hash = document.getElementById("checkbtn").checked;
  
        if (hash) {
          let navbar = document.querySelector(".navbar");
          let dashboard = document.querySelector(".dashboard");
          let sellings = document.querySelector(".sellings");
          let orders = document.querySelector(".orders");
  
          sidebar.classList.add("dark");
          navbar.classList.add("dark");
          dashboard.classList.add("dark-dashboard");
          sellings.classList.add("dark-sellings");
          orders.classList.add("dark-orders");
        } else {
          let navbar = document.querySelector(".navbar");
          let dashboard = document.querySelector(".dashboard");
          let sellings = document.querySelector(".dark-sellings");
          let orders = document.querySelector(".dark-orders");
  
          sidebar.classList.remove("dark");
          navbar.classList.remove("dark");
          dashboard.classList.remove("dark-dashboard");
          sellings.classList.remove("dark-sellings");
          orders.classList.remove("dark-orders");
        }
      });
    }
  });
  