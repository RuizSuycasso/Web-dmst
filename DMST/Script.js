// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Sticky header on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// // Dynamic services loading (simulate AJAX request)
// const services = [
//     { name: "Gia Sư Toán", description: "Hỗ trợ học toán từ cơ bản đến nâng cao." },
//     { name: "Gia Sư Tiếng Anh", description: "Nâng cao trình độ tiếng Anh giao tiếp và học thuật." },
//     { name: "Gia Sư Lý", description: "Gia sư chuyên môn cao, giúp bạn hiểu sâu kiến thức vật lý." },
//     { name: "Gia Sư Hóa", description: "Học Hóa dễ dàng với đội ngũ gia sư xuất sắc." }
// ];

function loadServices() {
    const servicesContainer = document.querySelector('.features .container');
    services.forEach(service => {
        const div = document.createElement('div');
        div.className = 'feature-item';
        div.innerHTML = `
            <h3>${service.name}</h3>
            <p>${service.description}</p>
        `;
        servicesContainer.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', loadServices);

// Contact form validation and feedback storage
const form = document.querySelector('.contact form');
const feedbackContainer = document.querySelector('.feedback-container');

function saveFeedback(name, email, message) {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push({ name, email, message });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    displayFeedbacks();
}

function displayFeedbacks() {
    feedbackContainer.innerHTML = ''; // Xóa nội dung hiện tại
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.forEach(feedback => {
        const div = document.createElement('div');
        div.className = 'feedback-item';
        div.innerHTML = `
            <h4>${feedback.name}</h4>
            <p>Email: ${feedback.email}</p>
            <p>${feedback.message}</p>
        `;
        feedbackContainer.appendChild(div);
    });
}

// Gọi chức năng hiển thị ngay sau khi trang tải
document.addEventListener('DOMContentLoaded', displayFeedbacks);

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Vui lòng điền đầy đủ thông tin!");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Email không hợp lệ!");
    } else {
        saveFeedback(name, email, message);
        alert("Gửi thành công! Cảm ơn bạn đã liên hệ.");
        form.reset(); // Xóa dữ liệu trong form
    }
});
