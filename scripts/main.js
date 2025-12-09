// /scripts/main.js


document.addEventListener("DOMContentLoaded", () => {
initTabs();
initProjectExpanders();
});

function initTabs() {
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
if (!tabs.length) return;

tabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => activateTab(tab, tabs, panels));
    tab.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const next = (idx + dir + tabs.length) % tabs.length;
        tabs[next].focus();
        activateTab(tabs[next], tabs, panels);
    }
    });
});
}

function activateTab(selectedTab, tabs, panels) {
const target = selectedTab.dataset.target;

tabs.forEach((t) => t.setAttribute("aria-selected", String(t === selectedTab)));

panels.forEach((panel) => {
    const match = panel.dataset.panel === target;
    panel.hidden = !match;
    if (match) ensureFirstActive(panel);
});
}

function initProjectExpanders() {
document.querySelectorAll(".projectlist").forEach((listEl) => {
    listEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".project-toggle");
    if (!btn) return;

    const card = btn.closest(".project");
    if (!card) return;

    setActiveCard(card);
    });


    ensureFirstActive(listEl);
});
}

function setActiveCard(cardEl) {
const list = cardEl.parentElement;
const cards = Array.from(list.querySelectorAll(".project"));

cards.forEach((c) => {
    const isActive = c === cardEl;
    c.classList.toggle("is-active", isActive);

    const toggle = c.querySelector(".project-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", String(isActive));
});
}

function ensureFirstActive(listEl) {
const currentActive = listEl.querySelector(".project.is-active");
if (currentActive) {
    listEl.querySelectorAll(".project").forEach((c) => {
    const t = c.querySelector(".project-toggle");
    if (t) t.setAttribute("aria-expanded", String(c.classList.contains("is-active")));
    });
    return;
}
const first = listEl.querySelector(".project");
if (first) setActiveCard(first);
}


const modal = document.getElementById('posterModal');
const modalImage = document.getElementById('modalImage');
const thumbs = document.querySelectorAll('.poster-thumb');
thumbs.forEach(thumb => {
    thumb.addEventListener('click', function (e) {
        e.preventDefault();
        const imgSrc = this.querySelector('img').src;
        modalImage.src = imgSrc;
        modal.classList.add('active');
    });
});
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});