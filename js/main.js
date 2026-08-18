document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".modal").forEach(modal => {
        modal.style.display = "none"; // Asegura que estén ocultos al iniciar
    });

    document.querySelectorAll(".abrir-modal").forEach(boton => {
        boton.addEventListener("click", function () {
            let modalId = this.getAttribute("data-modal");
            let modal = document.getElementById(modalId);
            if (modal) modal.style.display = "flex";
        });
        // permite abrir con teclado (Enter / Espacio) ya que ahora es role="button"
        boton.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                this.click();
            }
        });
    });

    document.querySelectorAll(".close").forEach(boton => {
        boton.addEventListener("click", function () {
            this.closest(".modal").style.display = "none";
        });
    });

    window.addEventListener("click", function (event) {
        document.querySelectorAll(".modal").forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            document.querySelectorAll(".modal").forEach(modal => {
                modal.style.display = "none";
            });
        }
    });
});

class P2Element extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <form id="form" action="https://formsubmit.co/jestcoam@gmail.com" method="POST">
                <p class="ppp1 form-title">enviar mensaje directo a correo</p>
                <input id="nombre" type="text" name="nombre" placeholder="cual es tu nombre" required>
                <input id="motivo" type="text" name="para" placeholder="para que?" required>
                <button class="contacto" id="yesButton" type="submit">Enviar</button>
                <input type="hidden" name="_captcha" value="false">
                <input type="hidden" id="deviceInfo" name="deviceInfo">
            </form>
        `;

        this.form = this.querySelector('#form');
        this.yesButton = this.querySelector('#yesButton');
        this.deviceInfoInput = this.querySelector('#deviceInfo');

        this.setDeviceInfo();

        this.form.addEventListener('submit', (event) => {
            this.handleFormSubmit(event);
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.yesButton.textContent = 'Enviando...';
        this.yesButton.disabled = true;

        const formData = new FormData(this.form);

        fetch(this.form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                this.yesButton.textContent = 'Enviado ✔';
                this.yesButton.style.background = 'var(--string)';
                this.form.reset();
            } else {
                throw new Error('Error al enviar');
            }
        })
        .catch(() => {
            this.yesButton.textContent = 'Error ❌';
            this.yesButton.style.background = 'var(--accent)';
            this.yesButton.disabled = false;
        });
    }

    setDeviceInfo() {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        this.deviceInfoInput.value = `User Agent: ${userAgent}, Platform: ${platform}`;
    }
}

customElements.define("p2-element", P2Element);

document.getElementById("toggleTheme").addEventListener("click", function () {
    const body = document.body;
    const isLight = body.classList.toggle("light-mode");
    this.textContent = isLight ? "Modo Oscuro" : "Modo Claro";
});
