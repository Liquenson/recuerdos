// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Selecciona el formulario y la lista de comentarios
    const commentForm = document.querySelector(".comment-form");
    const commentsList = document.querySelector(".comments-list");

    // Escucha el evento de envío del formulario
    commentForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Previene el envío del formulario

        // Obtén los valores de nombre y comentario
        const nameInput = commentForm.querySelector("input[type='text']");
        const commentInput = commentForm.querySelector("textarea");

        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        // Valida que los campos no estén vacíos
        if (name === "" || comment === "") {
            alert("Por favor, ingresa tu nombre y comentario.");
            return;
        }

        // Crea el nuevo elemento de comentario
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");

        const commentContent = `
            <p><strong>${name}:</strong> ${comment}</p>
        `;

        commentElement.innerHTML = commentContent;

        // Añade el comentario a la lista de comentarios
        commentsList.appendChild(commentElement);

        // Limpia los campos del formulario
        nameInput.value = "";
        commentInput.value = "";
    });
});
