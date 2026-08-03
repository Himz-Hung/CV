export const profile = {
  name: 'Đặng Ngọc Hưng',
  nameEn: 'Dang Ngoc Hung',
  title: 'Front-end Developer',
  tagline: 'ReactJS · TypeScript · UI Engineering',
  email: 'hungitforwork@gmail.com',
  phone: '0859550557',
  github: 'https://github.com/Himz-Hung',
  location: 'District 7, Ho Chi Minh City',
  birth: '14/11/2003',
  summary:
    'Front-end Developer chuyên sâu về ReactJS và TypeScript, giàu kinh nghiệm xây dựng các ứng dụng web doanh nghiệp và hướng khách hàng. Thành thạo việc dựng hệ thống component tái sử dụng, tích hợp RESTful API, quản lý state phức tạp và tối ưu hiệu năng cho các sản phẩm có khả năng mở rộng.',
}

export const stats = [
  { value: '3+', label: 'Năm kinh nghiệm' },
  { value: '30+', label: 'React components tái sử dụng' },
  { value: '20+', label: 'REST API endpoints tích hợp' },
  { value: '8.09', label: 'GPA / 10 (FPT University)' },
]

export const skills = [
  {
    group: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SCSS'],
  },
  {
    group: 'Frameworks & UI',
    items: ['ReactJS', 'Angular', 'MUI', 'Ant Design', 'TailwindCSS'],
  },
  {
    group: 'State Management',
    items: ['Redux Toolkit', 'Redux Thunk', 'React Query (TanStack)'],
  },
  {
    group: 'Tools',
    items: ['Git', 'Vite'],
  },
  {
    group: 'Auth & Security',
    items: ['JWT Authentication', 'Role-Based Access Control (RBAC)'],
  },
  {
    group: 'Architecture & Optimization',
    items: ['Custom Hooks', 'Code Splitting', 'Lazy Loading', 'Performance Optimization'],
  },
  {
    group: 'Others',
    items: ['RESTful APIs', 'Responsive Design', 'Agile / Scrum'],
  },
  {
    group: 'Basic Knowledge',
    items: ['NodeJS', 'MongoDB', 'Firebase'],
  },
]

export const experience = [
  {
    period: '2024 – Nay',
    role: 'Freelance Front-end Developer',
    company: 'Freelance',
    points: [
      'Phát triển và bàn giao nhiều ứng dụng web: nền tảng sự kiện Lucky Wheel, hệ thống xử lý Excel, hệ thống quản lý tài liệu.',
      'Xây dựng giao diện responsive với ReactJS, TypeScript và các thư viện UI hiện đại.',
      'Thiết kế component tái sử dụng và tối ưu kiến trúc frontend để dễ bảo trì.',
      'Tích hợp RESTful API, xử lý luồng dữ liệu và quản lý state bằng Redux.',
      'Triển khai upload/download file, xử lý dữ liệu, form handling và trải nghiệm UI tương tác.',
    ],
  },
  {
    period: '2023 – 2024',
    role: 'Front-end Developer',
    company: 'FPT Software Quy Nhon',
    points: [
      'Phát triển và bảo trì ứng dụng web doanh nghiệp bằng ReactJS + TypeScript cho khách hàng nước ngoài.',
      'Xây dựng UI component tái sử dụng, giảm code trùng lặp và tăng hiệu suất phát triển.',
      'Tích hợp REST API và tối ưu xử lý dữ liệu để cải thiện hiệu năng ứng dụng.',
      'Phối hợp với backend developers và tham gia chu trình phát triển Agile/Scrum.',
      'Bàn giao tính năng production qua code review và làm việc nhóm.',
    ],
  },
]

export const projects = [
  {
    name: 'Booking Platform',
    period: 'Tháng 8/2025 – 1/2026',
    role: 'Developer',
    accent: 'from-indigo-500 to-blue-600',
    description:
      'Nền tảng đặt dịch vụ web cho khách hàng nước ngoài. Cho phép người dùng tìm kiếm, đặt và quản lý dịch vụ với gói subscription và tích hợp thanh toán. Tập trung vào bảo mật dữ liệu, tối ưu hiệu năng, responsive và kiến trúc frontend có khả năng mở rộng.',
    responsibilities: [
      'Dựng UI responsive với ReactJS, Vite, TypeScript, Tailwind',
      'Xây kiến trúc component tái sử dụng, mở rộng được',
      'Quản lý state bằng Redux Thunk',
      'Triển khai authentication & role-based access control',
      'Tối ưu hiệu năng và cải thiện UX đa thiết bị',
    ],
    tech: ['ReactJS', 'TypeScript', 'Redux', 'Axios', 'TailwindCSS', 'Vite'],
  },
  {
    name: 'Web Management System',
    period: 'Japanese Travel Agency',
    role: 'Developer',
    accent: 'from-rose-500 to-orange-500',
    description:
      'Hệ thống quản lý web cho một công ty du lịch Nhật Bản: quản lý tour, khách hàng và booking. Một phần của dự án doanh nghiệp thực tế cho khách hàng nước ngoài.',
    responsibilities: [
      'Phát triển 30+ React component tái sử dụng bằng TypeScript & SCSS',
      'Tích hợp 20+ REST API endpoint cho customer, booking, tour',
      'Phối hợp với backend team (.NET Core, SQL Server)',
      'Tham gia Agile (Scrum), daily stand-up, code review',
      'Sửa lỗi UI nghiêm trọng và tối ưu hiệu năng render',
    ],
    tech: ['ReactJS', 'TypeScript', 'SCSS', '.NET Core', 'SQL Server', 'AWS'],
  },
  {
    name: 'FAMS — Face Attendance Management',
    period: 'Tháng 3/2025 – 5/2025',
    role: 'Front-End Developer / Full-stack Contributor',
    accent: 'from-emerald-500 to-teal-600',
    description:
      'Hệ thống điểm danh tự động dùng công nghệ nhận diện khuôn mặt trên nền tảng Jetson Orin, tích hợp ứng dụng web (responsive cho mobile) để quản lý điểm danh trường học hiệu quả.',
    responsibilities: [
      'Phát triển web UI bằng ReactJS + TypeScript',
      'Tích hợp API điểm danh và cập nhật dữ liệu real-time',
      'Làm việc với backend (NodeJS, Python, MongoDB)',
      'Thiết kế cấu trúc hệ thống & tham gia phân tích yêu cầu',
    ],
    tech: ['ReactJS', 'NodeJS', 'Python', 'MongoDB', 'PostgreSQL'],
  },
  {
    name: 'Student Management System',
    period: 'Tháng 1/2023 – 2/2023',
    role: 'Developer',
    accent: 'from-fuchsia-500 to-purple-600',
    description:
      'Ứng dụng quản lý sinh viên xây bằng ReactJS trong năm hai đại học. Tập trung vào quản lý dữ liệu sinh viên và cung cấp UI trực quan cho các thao tác CRUD.',
    responsibilities: [
      'Phát triển React component tái sử dụng và quản lý state',
      'Tích hợp RESTful API để fetch và cập nhật dữ liệu sinh viên',
      'Triển khai form validation và error handling',
      'Cải thiện UI/UX cho tương tác mượt mà',
    ],
    tech: ['ReactJS', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Git', 'GitHub'],
  },
]

export const education = {
  school: 'FPT University',
  degree: 'Cử nhân Công nghệ Thông tin',
  period: '2021 – 2025',
  gpa: '8.09 / 10 (3.3 / 4)',
}
