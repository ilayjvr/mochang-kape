document.addEventListener('DOMContentLoaded', function() {
    // Blog pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination a');
    const blogPages = document.querySelectorAll('.blog-pages');
    const totalPages = blogPages.length;
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get current active page number
            const currentActive = document.querySelector('.pagination a.active');
            let currentPage = currentActive ? parseInt(currentActive.textContent) : 1;
            
            // Determine which page to show
            let pageNum;
            
            if (this.querySelector('.fa-chevron-right')) {
                // Next button clicked
                pageNum = currentPage + 1;
                if (pageNum > totalPages) pageNum = 1;
            } else if (this.querySelector('.fa-chevron-left')) {
                // Previous button clicked
                pageNum = currentPage - 1;
                if (pageNum < 1) pageNum = totalPages;
            } else {
                // Number button clicked
                pageNum = parseInt(this.textContent);
            }
            
            // Remove active class from all links and pages
            paginationLinks.forEach(item => item.classList.remove('active'));
            blogPages.forEach(page => page.classList.remove('active'));
            
            // Add active class to the corresponding number link
            document.querySelector(`.pagination a:nth-child(${pageNum + 1})`).classList.add('active');
            
            // Show corresponding page
            document.getElementById(`blog-page-${pageNum}`).classList.add('active');
        });
    });
    
    // Newsletter form
    const blogNewsletterForm = document.getElementById('blogNewsletterForm');
    if (blogNewsletterForm) {
        blogNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            blogNewsletterForm.reset();
        });
    }
});