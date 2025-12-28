document.addEventListener('DOMContentLoaded', () => {
    // Check if manifest is loaded
    if (typeof window.productManifest === 'undefined') {
        console.error('Product manifest not loaded. Check path to js/products-data.js');
        return;
    }

    const data = window.productManifest;
    const productNames = Object.keys(data);
    const grid = document.getElementById('productGrid');

    // Clear existing content
    grid.innerHTML = '';

    productNames.forEach(name => {
        const displayName = name;
        const safeName = name.replace(/[^a-zA-Z0-9]/g, '');
        const images = data[name];

        if (!images || images.length === 0) return;

        const card = document.createElement('div');
        card.className = 'product-card';

        let slidesHtml = '';
        images.forEach(imgSrc => {
            const webPath = imgSrc.replace(/\\/g, '/');
            slidesHtml += `<div class="carousel-slide"><img src="${webPath}" loading="lazy" alt="${displayName}"></div>`;
        });

        card.innerHTML = `
            <div class="product-carousel">
                <div class="carousel-track" id="track-${safeName}">
                    ${slidesHtml}
                </div>
                ${images.length > 1 ? `
                <button class="carousel-btn prev" onclick="moveSlide('${safeName}', -1)">&#10094;</button>
                <button class="carousel-btn next" onclick="moveSlide('${safeName}', 1)">&#10095;</button>
                ` : ''}
            </div>
            <div class="product-details">
                <h3 class="product-title">${displayName}</h3>
                 <p style="font-size: 0.8rem; color: #777; margin-bottom: 10px;">${images.length} Images</p>
                <a href="https://wa.me/919967961880?text=Hi, I am interested in ${encodeURIComponent(displayName)}" target="_blank" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.8rem; background-color: #25D366; color: white; border: none;">
                    <i class="fab fa-whatsapp" style="margin-right: 5px;"></i> WhatsApp
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
});
