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

    // Category Map logic
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // Update Page Header Title
    const headerTitle = document.querySelector('.page-header h1');
    if (category && headerTitle) {
        headerTitle.textContent = category;
    }

    let displayedProducts = productNames;

    if (category) {
        const lowerCat = category.toLowerCase();
        displayedProducts = productNames.filter(name => {
            const lowerName = name.toLowerCase();
            if (lowerCat === 'seating') {
                return lowerName.includes('chair') || lowerName.includes('stool') || lowerName.includes('sofa') || lowerName.includes('bell') || lowerName.includes('mono') || lowerName.includes('blaze') || lowerName.includes('visit') || lowerName.includes('seat');
            } else if (lowerCat === 'desk') {
                return lowerName.includes('desk') || lowerName.includes('table');
            } else if (lowerCat === 'work stations') {
                return lowerName.includes('work') || lowerName.includes('station');
            } else if (lowerCat === 'cabinets') {
                return lowerName.includes('rack') || lowerName.includes('cabinet') || lowerName.includes('cupboard') || lowerName.includes('storage') || lowerName.includes('shelf');
            } else if (lowerCat === 'school furniture') {
                return lowerName.includes('school') || lowerName.includes('bench') || lowerName.includes('student') || lowerName.includes('baby');
            }
            return true;
        });
    }

    let foundProductToScroll = null;

    displayedProducts.forEach(name => {
        const displayName = name;
        const safeName = name.replace(/[^a-zA-Z0-9]/g, '');
        const images = data[name];

        if (!images || images.length === 0) return;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.id = `product-${safeName}`; // Add ID for deep linking

        let slidesHtml = '';
        images.forEach(imgSrc => {
            const webPath = imgSrc.replace(/\\/g, '/');
            slidesHtml += `<div class="carousel-slide"><img src="${webPath}" loading="lazy" alt="${displayName}"></div>`;
        });

        // Construct Deep Link
        const productUrl = `${window.location.origin}${window.location.pathname}?product=${encodeURIComponent(name)}`;
        const imageUrl = `${window.location.origin}/${images[0].replace(/\\/g, '/')}`;

        // Revised Message Format: Product Page Link + Image URL for preview
        const waText = `Check out ${displayName}: ${productUrl}\n\nImage: ${imageUrl}`;

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
                <a href="https://wa.me/919967961880?text=${encodeURIComponent(waText)}" target="_blank" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.8rem; background-color: #25D366; color: white; border: none;">
                    <i class="fab fa-whatsapp" style="margin-right: 5px;"></i> WhatsApp
                </a>
            </div>
        `;
        grid.appendChild(card);

        // Check/Set deep link target
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('product') === name) {
            foundProductToScroll = card;
        }
    });

    // Handle Deep Link Scroll
    if (foundProductToScroll) {
        setTimeout(() => {
            foundProductToScroll.scrollIntoView({ behavior: 'smooth', block: 'center' });
            foundProductToScroll.style.border = "2px solid var(--primary-color)";
            foundProductToScroll.style.transition = "border 0.5s";
            setTimeout(() => { foundProductToScroll.style.border = "none"; }, 3000);
        }, 500);
    }
});
