const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#navlinks");

function closeNav() {
	if (!hamburger || !nav) {
		return;
	}
	hamburger.setAttribute("aria-expanded", "false");
	hamburger.setAttribute("aria-label", "Abrir menú");
	nav.classList.remove("open");
}

if (hamburger && nav) {
	hamburger.addEventListener("click", () => {
		const isOpen = hamburger.getAttribute("aria-expanded") !== "true";
		hamburger.setAttribute("aria-expanded", String(isOpen));
		hamburger.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
		nav.classList.toggle("open", isOpen);
	});

	nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
	document.addEventListener("click", (event) => {
		if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
			closeNav();
		}
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeNav();
		}
	});
}

const header = document.querySelector("#header");
const year = document.querySelector("#year");

if (year) {
	year.textContent = new Date().getFullYear();
}

if (header) {
	const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 12);
	updateHeader();
	window.addEventListener("scroll", updateHeader, { passive: true });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	revealElements.forEach((element) => observer.observe(element));
} else {
	revealElements.forEach((element) => element.classList.add("visible"));
}
