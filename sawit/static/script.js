document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result;
            document.getElementById('imagePreview').classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }
});

function diagnose() {
    const imageInput = document.getElementById('imageInput').files[0];
    if (!imageInput) {
        alert("Silakan unggah gambar terlebih dahulu.");
        return;
    }
    
    const formData = new FormData();
    formData.append("file", imageInput);
    
    fetch("/predict", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = `Hasil: ${data.result}`;
    })
    .catch(error => console.error("Error:", error));
}