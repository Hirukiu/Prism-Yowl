
document.addEventListener("DOMContentLoaded", () => {

    const toggles = document.querySelectorAll(".module-toggle");

    toggles.forEach(toggle => {
        toggle.addEventListener("change", async function () {

            const moduleCard = this.closest(".module-card");
            if (!moduleCard) return;

            const moduleName = moduleCard.dataset.module;
            if (!moduleName) {
                console.error("data-module manquant sur la card");
                return;
            }

            const statusText = moduleCard.querySelector(".status-text");

            const isActivating = this.checked;

            let endpoint;
            let newStatusText;

            if (isActivating) {
                endpoint = `/module/activate`;
                newStatusText = "Actif";
            } else {
                endpoint = `/module/desactivate`;
                newStatusText = "Inactif";
            }

            try {
                const response = await fetch(`http://localhost:5000${endpoint}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ module_name: moduleName }),
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();

                if (data.name && data.name.toLowerCase() !== moduleName.toLowerCase()) {
                    console.warn("Le module renvoyé ne correspond pas");
                }

                statusText.textContent = newStatusText;
                statusText.style.color = isActivating ? "#8b5cf6" : "#6b7280";

                console.log(`${moduleName} → ${isActivating ? "activé" : "désactivé"}`, data);

            } catch (err) {
                console.error("Erreur lors de la requête :", err);
                this.checked = !isActivating;
                statusText.textContent = isActivating ? "Inactif" : "Actif";
                statusText.style.color = isActivating ? "#6b7280" : "#8b5cf6";

                alert(`Impossible de ${isActivating ? "activer" : "désactiver"} le module ${moduleName}.\nVérifie que le serveur est lancé.`);
            }
        });
    });

    loadInitialModuleStates();
});

async function loadInitialModuleStates() {
    const moduleCards = document.querySelectorAll(".module-card");

    for (const card of moduleCards) {
        const moduleName = card.dataset.module;
        if (!moduleName) continue;

        try {

            const response = await fetch(`http://localhost:5000/module/activate`);
            if (!response.ok) continue;

            const activeModules = await response.json();

            let isActive = false;

            if (Array.isArray(activeModules)) {
                isActive = activeModules.some(m => m.name.toLowerCase() === moduleName.toLowerCase());
            } else if (activeModules && activeModules.name) {
                isActive = activeModules.name.toLowerCase() === moduleName.toLowerCase();
            }

            const toggle = card.querySelector(".module-toggle");
            const statusText = card.querySelector(".status-text");

            toggle.checked = isActive;
            statusText.textContent = isActive ? "Actif" : "Inactif";
            statusText.style.color = isActive ? "#8b5cf6" : "#6b7280";

        } catch (err) {
            console.warn(`Impossible de charger l'état de ${moduleName}`, err);
        }
    }
}