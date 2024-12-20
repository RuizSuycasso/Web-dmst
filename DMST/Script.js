// Function để tải dịch vụ (dynamically)
function loadServices() {
    const servicesContainer = document.querySelector('.features .container');
    const services = [
        { name: "Gia Sư Toán", description: "Hỗ trợ học toán từ cơ bản đến nâng cao." },
        { name: "Gia Sư Tiếng Anh", description: "Nâng cao trình độ tiếng Anh giao tiếp và học thuật." },
        { name: "Gia Sư Lý", description: "Gia sư chuyên môn cao, giúp bạn hiểu sâu kiến thức vật lý." },
        { name: "Gia Sư Hóa", description: "Học Hóa dễ dàng với đội ngũ gia sư xuất sắc." }
    ];

    servicesContainer.innerHTML = ''; // Xóa nội dung cũ trước khi thêm mới
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

// Đợi người dùng thực hiện một hành động (nhấn nút) để hiển thị danh sách dịch vụ
document.addEventListener('DOMContentLoaded', () => {
    // Lấy nút hiển thị dịch vụ từ DOM
    const showServicesBtn = document.getElementById('showServicesBtn');
    if (showServicesBtn) {
        showServicesBtn.addEventListener('click', loadServices);
    }
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

// Contact form validation and feedback storage
const form = document.querySelector('.contact form');
const feedbackContainer = document.querySelector('.feedback-container');

function saveFeedback(name, email, message) {
    const feedbacks = JSON.parse(sessionStorage.getItem('feedbacks')) || [];
    feedbacks.push({ name, email, message });
    sessionStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    displayFeedbacks();
}

function displayFeedbacks() {
    feedbackContainer.innerHTML = ''; // Clear current content
    const feedbacks = JSON.parse(sessionStorage.getItem('feedbacks')) || [];
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
        form.reset(); // Clear form data
    }
});

// Gọi chức năng hiển thị ngay sau khi trang tải
document.addEventListener('DOMContentLoaded', displayFeedbacks);
