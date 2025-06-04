document.querySelector('#searchForm').addEventListener('submit', function(event) {
    if (!document.querySelector('#searchInput').value.trim()) {
        event.preventDefault();
        alert('Por favor, ingresa un título.');
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#searchForm');
    const input = document.querySelector('#searchInput');

    form.addEventListener('submit', function (event) {
        if (!input.value.trim()) {
            event.preventDefault();
            alert('Por favor, ingresa un título para la búsqueda.');
        }
    });
});
<script src="/js/search.js"></script>