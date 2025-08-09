// Conversión: °F = (°C × 9/5) + 32
const $ = (s) => document.querySelector(s);

const input = $("#celsius");
const btn = $("#btn-convertir");
const resultado = $("#resultado");
const textoResultado = $("#texto-resultado");
const icono = $("#icono");
const historial = $("#historial");

function clasificarTemp(celsius) {
    if (celsius < 0) return "bajo";       // azul
    if (celsius <= 40) return "medio";    // verde
    return "alto";                         // rojo (> 40) => alerta
}

function emojiPorClase(clase) {
    if (clase === "bajo") return "❄️";
    if (clase === "medio") return "🌤️";
    return "🔥";
}

function convertir() {
    const c = parseFloat(input.value);
    if (Number.isNaN(c)) {
        alert("Ingrese un número válido en °C");
        input.focus();
        return;
    }

    const f = (c * 9 / 5) + 32;
    const clase = clasificarTemp(c);

    // Mostrar resultado
    resultado.className = "resultado " + clase;
    icono.textContent = emojiPorClase(clase);
    textoResultado.textContent = `${c.toFixed(2)} °C = ${f.toFixed(2)} °F`;

    // Alerta si es muy alta
    if (clase === "alto") {
        alert("⚠️ ¡Temperatura muy alta (más de 40 °C)!");
    }

    // Agregar al historial
    const li = document.createElement("li");
    const spanBadge = document.createElement("span");
    spanBadge.className = "badge " + clase;
    spanBadge.textContent = clase === "bajo" ? "Bajo Cero"
        : clase === "medio" ? "Media"
            : "Muy Alta";
    li.textContent = `${c.toFixed(2)} °C → ${f.toFixed(2)} °F`;
    li.appendChild(spanBadge);
    historial.appendChild(li);

    // limpiar input (opcional)
    input.select();
}

btn.addEventListener("click", convertir);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") convertir();
});
