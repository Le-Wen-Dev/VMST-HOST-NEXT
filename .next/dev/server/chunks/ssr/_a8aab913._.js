module.exports = [
"[project]/data/mockData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blogCategories",
    ()=>blogCategories,
    "blogPosts",
    ()=>blogPosts,
    "businessPlans",
    ()=>businessPlans,
    "emailPlans",
    ()=>emailPlans,
    "mockOrders",
    ()=>mockOrders,
    "mockServers",
    ()=>mockServers,
    "mockServices",
    ()=>mockServices,
    "mockTickets",
    ()=>mockTickets,
    "vouchers",
    ()=>vouchers,
    "wordpressPlans",
    ()=>wordpressPlans
]);
const wordpressPlans = [
    {
        id: 'wp-starter',
        name: 'WP Starter',
        type: 'wordpress',
        storage: '10 GB NVMe',
        bandwidth: '100 GB',
        websites: 1,
        ssl: true,
        backup: 'Hằng ngày',
        support: '8/5',
        sla: '99.5%',
        price: {
            monthly: 79000,
            quarterly: 213000,
            yearly: 758000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360',
            'LiteSpeed Cache',
            'WordPress Toolkit',
            'Auto SSL',
            '1 Website',
            'Backup tự động hằng ngày',
            'Email hỗ trợ 8/5'
        ]
    },
    {
        id: 'wp-basic',
        name: 'WP Basic',
        type: 'wordpress',
        storage: '20 GB NVMe',
        bandwidth: '200 GB',
        websites: 3,
        ssl: true,
        backup: 'Hằng ngày',
        support: '8/5',
        sla: '99.7%',
        price: {
            monthly: 129000,
            quarterly: 348000,
            yearly: 1238000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360',
            'LiteSpeed Cache',
            'WordPress Toolkit',
            'Auto SSL',
            '3 Websites',
            'Backup tự động hằng ngày',
            'Email hỗ trợ 8/5',
            'Cloudflare CDN miễn phí'
        ]
    },
    {
        id: 'wp-pro',
        name: 'WP Pro',
        type: 'wordpress',
        storage: '40 GB NVMe',
        bandwidth: '500 GB',
        websites: 10,
        ssl: true,
        backup: 'Hằng ngày',
        support: '24/7',
        sla: '99.9%',
        price: {
            monthly: 249000,
            quarterly: 672000,
            yearly: 2390000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360',
            'LiteSpeed Cache',
            'WordPress Toolkit Pro',
            'Auto SSL',
            '10 Websites',
            'Backup tự động hằng ngày',
            'Hỗ trợ 24/7',
            'Cloudflare CDN Pro',
            'Malware Scanner',
            'Staging Environment'
        ],
        recommended: true
    },
    {
        id: 'wp-business',
        name: 'WP Business',
        type: 'wordpress',
        storage: '80 GB NVMe',
        bandwidth: '1 TB',
        websites: 25,
        ssl: true,
        backup: 'Hằng ngày + Weekly',
        support: '24/7 Priority',
        sla: '99.95%',
        price: {
            monthly: 399000,
            quarterly: 1077000,
            yearly: 3830000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360',
            'LiteSpeed Cache',
            'WordPress Toolkit Pro',
            'Auto SSL',
            '25 Websites',
            'Backup hằng ngày + Weekly',
            'Hỗ trợ ưu tiên 24/7',
            'Cloudflare CDN Pro',
            'Malware Scanner Pro',
            'Staging Environment',
            'Redis Cache',
            'Object Cache'
        ]
    },
    {
        id: 'wp-enterprise',
        name: 'WP Enterprise',
        type: 'wordpress',
        storage: '150 GB NVMe',
        bandwidth: '2 TB',
        websites: 50,
        ssl: true,
        backup: 'Hằng ngày + Weekly',
        support: '24/7 Priority',
        sla: '99.99%',
        price: {
            monthly: 699000,
            quarterly: 1887000,
            yearly: 6710000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360 Elite',
            'LiteSpeed Cache',
            'WordPress Toolkit Pro',
            'Auto SSL',
            '50 Websites',
            'Backup hằng ngày + Weekly + Monthly',
            'Hỗ trợ ưu tiên 24/7',
            'Cloudflare CDN Enterprise',
            'Malware Scanner Elite',
            'Staging Environment',
            'Redis Cache',
            'Object Cache',
            'Dedicated IP',
            'WAF Protection'
        ]
    },
    {
        id: 'wp-ultimate',
        name: 'WP Ultimate',
        type: 'wordpress',
        storage: '300 GB NVMe',
        bandwidth: 'Không giới hạn',
        websites: 100,
        ssl: true,
        backup: 'Hằng ngày + Weekly + Monthly',
        support: '24/7 Dedicated',
        sla: '99.99%',
        price: {
            monthly: 1299000,
            quarterly: 3507000,
            yearly: 12470000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360 Elite',
            'LiteSpeed Cache',
            'WordPress Toolkit Pro',
            'Auto SSL',
            '100 Websites',
            'Backup toàn diện',
            'Hỗ trợ chuyên biệt 24/7',
            'Cloudflare CDN Enterprise',
            'Malware Scanner Elite',
            'Staging Environment',
            'Redis Cache',
            'Object Cache',
            'Dedicated IP',
            'WAF Protection',
            'DDoS Protection',
            'Priority Queue'
        ]
    }
];
const businessPlans = [
    {
        id: 'biz-starter',
        name: 'Biz Starter',
        type: 'business',
        storage: '15 GB NVMe',
        bandwidth: '150 GB',
        websites: 1,
        ssl: true,
        backup: 'Hằng ngày',
        support: '8/5',
        sla: '99.7%',
        price: {
            monthly: 99000,
            quarterly: 267000,
            yearly: 950000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360',
            'PHP 7.4 - 8.3',
            'Node.js Support',
            'Auto SSL',
            '1 Website',
            'Backup tự động hằng ngày',
            'Email hỗ trợ 8/5',
            '10 Email Accounts'
        ]
    },
    {
        id: 'biz-basic',
        name: 'Biz Basic',
        type: 'business',
        storage: '30 GB NVMe',
        bandwidth: '300 GB',
        websites: 5,
        ssl: true,
        backup: 'Hằng ngày',
        support: '24/7',
        sla: '99.8%',
        price: {
            monthly: 179000,
            quarterly: 483000,
            yearly: 1718000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360',
            'PHP 7.4 - 8.3',
            'Node.js Support',
            'Python Support',
            'Auto SSL',
            '5 Websites',
            'Backup tự động hằng ngày',
            'Hỗ trợ 24/7',
            '25 Email Accounts',
            'Cloudflare CDN',
            'Cron Jobs'
        ]
    },
    {
        id: 'biz-pro',
        name: 'Biz Pro',
        type: 'business',
        storage: '60 GB NVMe',
        bandwidth: '700 GB',
        websites: 15,
        ssl: true,
        backup: 'Hằng ngày',
        support: '24/7 Priority',
        sla: '99.9%',
        price: {
            monthly: 329000,
            quarterly: 888000,
            yearly: 3160000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360',
            'PHP 7.4 - 8.3',
            'Node.js Support',
            'Python Support',
            'Auto SSL',
            '15 Websites',
            'Backup hằng ngày',
            'Hỗ trợ ưu tiên 24/7',
            '50 Email Accounts',
            'Cloudflare CDN Pro',
            'Cron Jobs',
            'Git Support',
            'SSH Access',
            'Redis Cache'
        ],
        recommended: true
    },
    {
        id: 'biz-business',
        name: 'Biz Business',
        type: 'business',
        storage: '120 GB NVMe',
        bandwidth: '1.5 TB',
        websites: 30,
        ssl: true,
        backup: 'Hằng ngày + Weekly',
        support: '24/7 Priority',
        sla: '99.95%',
        price: {
            monthly: 549000,
            quarterly: 1482000,
            yearly: 5270000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360',
            'PHP 7.4 - 8.3',
            'Node.js Support',
            'Python Support',
            'Auto SSL',
            '30 Websites',
            'Backup hằng ngày + Weekly',
            'Hỗ trợ ưu tiên 24/7',
            '100 Email Accounts',
            'Cloudflare CDN Pro',
            'Cron Jobs',
            'Git Support',
            'SSH Access',
            'Redis Cache',
            'Elasticsearch',
            'Dedicated IP'
        ]
    },
    {
        id: 'biz-enterprise',
        name: 'Biz Enterprise',
        type: 'business',
        storage: '250 GB NVMe',
        bandwidth: '3 TB',
        websites: 60,
        ssl: true,
        backup: 'Hằng ngày + Weekly',
        support: '24/7 Dedicated',
        sla: '99.99%',
        price: {
            monthly: 999000,
            quarterly: 2697000,
            yearly: 9590000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360 Elite',
            'PHP 7.4 - 8.3',
            'Node.js Support',
            'Python Support',
            'Auto SSL',
            '60 Websites',
            'Backup toàn diện',
            'Hỗ trợ chuyên biệt 24/7',
            '250 Email Accounts',
            'Cloudflare CDN Enterprise',
            'Cron Jobs',
            'Git Support',
            'SSH Access',
            'Redis Cache',
            'Elasticsearch',
            'Dedicated IP',
            'WAF Protection',
            'Priority Queue'
        ]
    },
    {
        id: 'biz-ultimate',
        name: 'Biz Ultimate',
        type: 'business',
        storage: '500 GB NVMe',
        bandwidth: 'Không giới hạn',
        websites: 100,
        ssl: true,
        backup: 'Hằng ngày + Weekly + Monthly',
        support: '24/7 Dedicated',
        sla: '99.99%',
        price: {
            monthly: 1799000,
            quarterly: 4857000,
            yearly: 17270000
        },
        features: [
            'OpenLiteSpeed',
            'CloudLinux',
            'Imunify360 Elite',
            'PHP 7.4 - 8.3',
            'Node.js Support',
            'Python Support',
            'Ruby Support',
            'Auto SSL',
            '100 Websites',
            'Backup toàn diện',
            'Hỗ trợ chuyên biệt 24/7',
            '500 Email Accounts',
            'Cloudflare CDN Enterprise',
            'Cron Jobs',
            'Git Support',
            'SSH Access',
            'Redis Cache',
            'Elasticsearch',
            'Dedicated IP (2)',
            'WAF Protection',
            'DDoS Protection',
            'Priority Queue',
            'Custom Configuration'
        ]
    }
];
const emailPlans = [
    {
        id: 'mail-starter',
        name: 'Mail Starter',
        type: 'email',
        storage: '5 GB',
        bandwidth: '50 GB',
        websites: 0,
        emails: 5,
        ssl: true,
        backup: 'Hằng ngày',
        support: '8/5',
        sla: '99.7%',
        price: {
            monthly: 49000,
            quarterly: 132000,
            yearly: 470000
        },
        features: [
            '5 Email Accounts',
            '5 GB Storage/mailbox',
            'Webmail (Roundcube)',
            'SMTP, POP3, IMAP',
            'Anti-Spam (SpamAssassin)',
            'Anti-Virus (ClamAV)',
            'Email Forwarding',
            'Auto-Responder',
            'Backup hằng ngày',
            'SSL/TLS Encryption'
        ]
    },
    {
        id: 'mail-basic',
        name: 'Mail Basic',
        type: 'email',
        storage: '10 GB',
        bandwidth: '100 GB',
        websites: 0,
        emails: 15,
        ssl: true,
        backup: 'Hằng ngày',
        support: '24/7',
        sla: '99.8%',
        price: {
            monthly: 89000,
            quarterly: 240000,
            yearly: 854000
        },
        features: [
            '15 Email Accounts',
            '10 GB Storage/mailbox',
            'Webmail (Roundcube)',
            'SMTP, POP3, IMAP',
            'Anti-Spam Pro',
            'Anti-Virus Pro',
            'Email Forwarding',
            'Auto-Responder',
            'Backup hằng ngày',
            'SSL/TLS Encryption',
            'Email Aliases',
            'Catch-All Email',
            'Hỗ trợ 24/7'
        ]
    },
    {
        id: 'mail-pro',
        name: 'Mail Pro',
        type: 'email',
        storage: '25 GB',
        bandwidth: '250 GB',
        websites: 0,
        emails: 50,
        ssl: true,
        backup: 'Hằng ngày',
        support: '24/7 Priority',
        sla: '99.9%',
        price: {
            monthly: 179000,
            quarterly: 483000,
            yearly: 1718000
        },
        features: [
            '50 Email Accounts',
            '25 GB Storage/mailbox',
            'Webmail (Roundcube)',
            'SMTP, POP3, IMAP',
            'Anti-Spam Enterprise',
            'Anti-Virus Enterprise',
            'Email Forwarding',
            'Auto-Responder',
            'Backup hằng ngày',
            'SSL/TLS Encryption',
            'Email Aliases',
            'Catch-All Email',
            'Hỗ trợ ưu tiên 24/7',
            'DKIM & SPF',
            'Mailing Lists',
            'Email Archiving'
        ],
        recommended: true
    },
    {
        id: 'mail-business',
        name: 'Mail Business',
        type: 'email',
        storage: '50 GB',
        bandwidth: '500 GB',
        websites: 0,
        emails: 100,
        ssl: true,
        backup: 'Hằng ngày + Weekly',
        support: '24/7 Priority',
        sla: '99.95%',
        price: {
            monthly: 329000,
            quarterly: 888000,
            yearly: 3160000
        },
        features: [
            '100 Email Accounts',
            '50 GB Storage/mailbox',
            'Webmail (Roundcube)',
            'SMTP, POP3, IMAP',
            'Anti-Spam Enterprise',
            'Anti-Virus Enterprise',
            'Email Forwarding',
            'Auto-Responder',
            'Backup hằng ngày + Weekly',
            'SSL/TLS Encryption',
            'Email Aliases',
            'Catch-All Email',
            'Hỗ trợ ưu tiên 24/7',
            'DKIM & SPF & DMARC',
            'Mailing Lists',
            'Email Archiving',
            'ActiveSync Support',
            'Shared Calendars'
        ]
    },
    {
        id: 'mail-enterprise',
        name: 'Mail Enterprise',
        type: 'email',
        storage: '100 GB',
        bandwidth: '1 TB',
        websites: 0,
        emails: 250,
        ssl: true,
        backup: 'Hằng ngày + Weekly',
        support: '24/7 Dedicated',
        sla: '99.99%',
        price: {
            monthly: 599000,
            quarterly: 1617000,
            yearly: 5750000
        },
        features: [
            '250 Email Accounts',
            '100 GB Storage/mailbox',
            'Webmail (Roundcube)',
            'SMTP, POP3, IMAP',
            'Anti-Spam Elite',
            'Anti-Virus Elite',
            'Email Forwarding',
            'Auto-Responder',
            'Backup toàn diện',
            'SSL/TLS Encryption',
            'Email Aliases',
            'Catch-All Email',
            'Hỗ trợ chuyên biệt 24/7',
            'DKIM & SPF & DMARC',
            'Mailing Lists',
            'Email Archiving',
            'ActiveSync Support',
            'Shared Calendars',
            'Dedicated IP',
            'Advanced Filtering'
        ]
    },
    {
        id: 'mail-ultimate',
        name: 'Mail Ultimate',
        type: 'email',
        storage: '250 GB',
        bandwidth: 'Không giới hạn',
        websites: 0,
        emails: 500,
        ssl: true,
        backup: 'Hằng ngày + Weekly + Monthly',
        support: '24/7 Dedicated',
        sla: '99.99%',
        price: {
            monthly: 1099000,
            quarterly: 2967000,
            yearly: 10550000
        },
        features: [
            '500 Email Accounts',
            '250 GB Storage/mailbox',
            'Webmail (Roundcube)',
            'SMTP, POP3, IMAP',
            'Anti-Spam Elite',
            'Anti-Virus Elite',
            'Email Forwarding',
            'Auto-Responder',
            'Backup toàn diện',
            'SSL/TLS Encryption',
            'Email Aliases',
            'Catch-All Email',
            'Hỗ trợ chuyên biệt 24/7',
            'DKIM & SPF & DMARC',
            'Mailing Lists',
            'Email Archiving',
            'ActiveSync Support',
            'Shared Calendars',
            'Dedicated IP (2)',
            'Advanced Filtering',
            'Email Compliance',
            'Priority Delivery'
        ]
    }
];
const blogCategories = [
    {
        slug: 'wordpress',
        name: 'WordPress',
        description: 'Hướng dẫn và tips về WordPress',
        count: 8
    },
    {
        slug: 'hosting',
        name: 'Hosting',
        description: 'Kiến thức về hosting và server',
        count: 12
    },
    {
        slug: 'email',
        name: 'Email',
        description: 'Quản lý email doanh nghiệp',
        count: 6
    },
    {
        slug: 'security',
        name: 'Bảo mật',
        description: 'Bảo mật website và dữ liệu',
        count: 10
    },
    {
        slug: 'performance',
        name: 'Tối ưu',
        description: 'Tối ưu hiệu năng website',
        count: 9
    },
    {
        slug: 'tutorial',
        name: 'Hướng dẫn',
        description: 'Hướng dẫn chi tiết từng bước',
        count: 15
    }
];
const blogPosts = [
    {
        id: '1',
        slug: 'cach-tang-toc-wordpress-voi-litespeed-cache',
        title: 'Cách tăng tốc WordPress với LiteSpeed Cache',
        excerpt: 'Hướng dẫn chi tiết cách cài đặt và tối ưu LiteSpeed Cache để tăng tốc độ tải trang WordPress lên 300%.',
        content: `LiteSpeed Cache là một trong những plugin cache mạnh mẽ nhất cho WordPress hiện nay. Trong bài viết này, chúng tôi sẽ hướng dẫn chi tiết cách cài đặt và tối ưu để đạt hiệu suất tốt nhất.

## Cài đặt LiteSpeed Cache

1. Truy cập Dashboard WordPress
2. Vào Plugins > Add New
3. Tìm kiếm "LiteSpeed Cache"
4. Click Install và Activate

## Cấu hình tối ưu

### Cache Settings
- Bật Page Cache
- Bật Object Cache
- Bật Browser Cache

### Image Optimization
- Bật Lazy Load
- Tối ưu hình ảnh tự động
- WebP conversion

### Database Optimization
- Clean up revisions
- Remove trashed posts
- Optimize tables

Với những cài đặt trên, website của bạn sẽ tăng tốc đáng kể!`,
        thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'WordPress',
        categorySlug: 'wordpress',
        author: 'VMST Team',
        date: '2025-10-08',
        readTime: '5 phút',
        tags: [
            'WordPress',
            'Cache',
            'Performance',
            'LiteSpeed'
        ]
    },
    {
        id: '2',
        slug: 'bao-mat-website-voi-imunify360',
        title: 'Bảo mật website với Imunify360',
        excerpt: 'Tìm hiểu về Imunify360 - giải pháp bảo mật toàn diện cho hosting, giúp chống malware, hack và DDoS.',
        content: `Imunify360 là giải pháp bảo mật tiên tiến được tích hợp sẵn trong tất cả các gói hosting của VMST Host.

## Tính năng nổi bật

### Real-time Protection
- Quét và phát hiện malware theo thời gian thực
- Tự động clean malware
- WAF (Web Application Firewall)

### Proactive Defense
- Intrusion Detection System
- Network Firewall
- Patch Management

### Advanced Features
- KernelCare integration
- Captcha protection
- Country blocking

Với Imunify360, website của bạn được bảo vệ 24/7 khỏi mọi mối đe dọa!`,
        thumbnail: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Bảo mật',
        categorySlug: 'security',
        author: 'VMST Team',
        date: '2025-10-07',
        readTime: '6 phút',
        tags: [
            'Security',
            'Imunify360',
            'Malware',
            'WAF'
        ]
    },
    {
        id: '3',
        slug: 'huong-dan-cau-hinh-email-doanh-nghiep',
        title: 'Hướng dẫn cấu hình Email Doanh nghiệp',
        excerpt: 'Hướng dẫn từng bước cấu hình email doanh nghiệp trên Outlook, Gmail và thiết bị di động.',
        content: `Email doanh nghiệp chuyên nghiệp là yếu tố quan trọng trong giao tiếp kinh doanh. Bài viết này hướng dẫn cấu hình chi tiết.

## Cấu hình trên Outlook

### IMAP Settings
- Server: mail.yourdomain.com
- Port: 993 (SSL)
- Username: your-email@yourdomain.com

### SMTP Settings
- Server: mail.yourdomain.com
- Port: 465 (SSL)
- Authentication: Required

## Cấu hình trên Gmail

1. Vào Settings > Accounts
2. Add mail account
3. Nhập thông tin IMAP/SMTP
4. Verify và hoàn tất

## Mobile Configuration

Hướng dẫn cho iOS và Android với screenshots chi tiết.`,
        thumbnail: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Email',
        categorySlug: 'email',
        author: 'VMST Team',
        date: '2025-10-06',
        readTime: '7 phút',
        tags: [
            'Email',
            'Configuration',
            'Outlook',
            'Gmail'
        ]
    },
    {
        id: '4',
        slug: 'lua-chon-hosting-phu-hop-cho-doanh-nghiep',
        title: 'Lựa chọn Hosting phù hợp cho Doanh nghiệp',
        excerpt: 'So sánh chi tiết các loại hosting và hướng dẫn chọn gói phù hợp với nhu cầu kinh doanh của bạn.',
        content: `Chọn hosting phù hợp là quyết định quan trọng ảnh hưởng trực tiếp đến hiệu suất website và kinh doanh.

## WordPress Hosting vs Business Hosting

### WordPress Hosting
- Tối ưu riêng cho WordPress
- LiteSpeed Cache tích hợp
- WordPress Toolkit
- Phù hợp: Blog, tin tức, corporate site

### Business Hosting
- Đa dạng công nghệ (PHP, Node.js, Python)
- Linh hoạt cho mọi ứng dụng
- SSH Access, Git support
- Phù hợp: Thương mại điện tử, web app

## Yếu tố cần xem xét

1. Traffic dự kiến
2. Dung lượng dữ liệu
3. Số lượng website
4. Yêu cầu công nghệ
5. Ngân sách

Liên hệ VMST Host để được tư vấn miễn phí!`,
        thumbnail: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Hosting',
        categorySlug: 'hosting',
        author: 'VMST Team',
        date: '2025-10-05',
        readTime: '8 phút',
        tags: [
            'Hosting',
            'WordPress',
            'Business',
            'Guide'
        ]
    },
    {
        id: '5',
        slug: 'toi-uu-database-wordpress-tang-toc-website',
        title: 'Tối ưu Database WordPress - Tăng tốc website',
        excerpt: 'Các kỹ thuật tối ưu database WordPress để giảm query time và tăng tốc độ tải trang.',
        content: `Database là trái tim của WordPress. Tối ưu database giúp website chạy nhanh hơn đáng kể.

## Các vấn đề thường gặp

- Post revisions quá nhiều
- Transients cũ không được dọn
- Spam comments
- Tables không được optimize

## Giải pháp tối ưu

### 1. Clean up Revisions
\`\`\`sql
DELETE FROM wp_posts WHERE post_type = 'revision';
\`\`\`

### 2. Remove Transients
\`\`\`sql
DELETE FROM wp_options WHERE option_name LIKE '%_transient_%';
\`\`\`

### 3. Optimize Tables
\`\`\`sql
OPTIMIZE TABLE wp_posts, wp_postmeta, wp_options;
\`\`\`

## Plugin hỗ trợ

- WP-Optimize
- Advanced Database Cleaner
- LiteSpeed Cache (có DB optimization)

Thực hiện định kỳ để duy trì hiệu suất!`,
        thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Tối ưu',
        categorySlug: 'performance',
        author: 'VMST Team',
        date: '2025-10-04',
        readTime: '6 phút',
        tags: [
            'WordPress',
            'Database',
            'Optimization',
            'Performance'
        ]
    },
    {
        id: '6',
        slug: 'backup-website-quan-trong-nhu-the-nao',
        title: 'Backup Website quan trọng như thế nào?',
        excerpt: 'Tại sao backup là bắt buộc cho mọi website và cách thực hiện backup tự động hiệu quả.',
        content: `Mất dữ liệu có thể gây thiệt hại nghiêm trọng cho doanh nghiệp. Backup là bảo hiểm cho website của bạn.

## Rủi ro khi không có Backup

- Hack/Malware: Mất toàn bộ dữ liệu
- Lỗi cập nhật: Website bị hỏng
- Xóa nhầm: Không thể phục hồi
- Server crash: Downtime kéo dài

## Chiến lược Backup

### Tự động hằng ngày
VMST Host backup tự động mỗi ngày cho tất cả các gói.

### Retention Policy
- Daily: 7 ngày
- Weekly: 4 tuần
- Monthly: 3 tháng (gói cao cấp)

### Backup Location
- Offsite storage
- Multiple locations
- Encrypted backup

## Test Backup định kỳ

Backup vô dụng nếu không thể restore. VMST Host kiểm tra backup định kỳ.

An tâm với hệ thống backup chuyên nghiệp!`,
        thumbnail: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Hosting',
        categorySlug: 'hosting',
        author: 'VMST Team',
        date: '2025-10-03',
        readTime: '5 phút',
        tags: [
            'Backup',
            'Security',
            'Disaster Recovery'
        ]
    }
];
const vouchers = [
    {
        id: 'v1',
        code: 'WELCOME20',
        type: 'percentage',
        value: 20,
        minAmount: 0,
        validFrom: '2025-10-01',
        validTo: '2025-12-31',
        usageLimit: 100,
        usedCount: 23,
        description: 'Giảm 20% cho khách hàng mới',
        active: true
    },
    {
        id: 'v2',
        code: 'YEARLONG',
        type: 'percentage',
        value: 25,
        minAmount: 1000000,
        validFrom: '2025-10-01',
        validTo: '2025-10-31',
        usageLimit: 50,
        usedCount: 12,
        description: 'Giảm 25% cho đơn hàng từ 1 triệu (gói năm)',
        active: true
    },
    {
        id: 'v3',
        code: 'SAVE100K',
        type: 'fixed',
        value: 100000,
        minAmount: 500000,
        validFrom: '2025-10-01',
        validTo: '2025-10-15',
        usageLimit: 30,
        usedCount: 8,
        description: 'Giảm 100k cho đơn hàng từ 500k',
        active: true
    }
];
const mockServices = [
    {
        id: 's1',
        planName: 'WP Pro',
        planType: 'WordPress Hosting',
        ip: '103.56.158.10',
        serverName: 'VPS-HN-01',
        status: 'active',
        createdDate: '2025-08-15',
        expiryDate: '2026-08-15',
        autoRenew: true
    },
    {
        id: 's2',
        planName: 'Mail Pro',
        planType: 'Email Domain',
        ip: '103.56.158.12',
        serverName: 'VPS-HN-03',
        status: 'active',
        createdDate: '2025-09-01',
        expiryDate: '2025-12-01',
        autoRenew: false
    }
];
const mockServers = [
    {
        id: 'srv1',
        name: 'VPS-HN-01',
        ip: '103.56.158.10',
        location: 'Hà Nội',
        maxAccounts: 100,
        currentAccounts: 67,
        cpu: 45,
        ram: 62,
        status: 'online'
    },
    {
        id: 'srv2',
        name: 'VPS-HN-02',
        ip: '103.56.158.11',
        location: 'Hà Nội',
        maxAccounts: 100,
        currentAccounts: 54,
        cpu: 38,
        ram: 55,
        status: 'online'
    },
    {
        id: 'srv3',
        name: 'VPS-HN-03',
        ip: '103.56.158.12',
        location: 'Hà Nội',
        maxAccounts: 80,
        currentAccounts: 42,
        cpu: 32,
        ram: 48,
        status: 'online'
    },
    {
        id: 'srv4',
        name: 'VPS-HCM-01',
        ip: '103.56.159.10',
        location: 'Hồ Chí Minh',
        maxAccounts: 100,
        currentAccounts: 71,
        cpu: 51,
        ram: 68,
        status: 'online'
    }
];
const mockOrders = [
    {
        id: 'ord-2025-001',
        customerName: 'Nguyễn Văn A',
        customerEmail: 'nguyenvana@example.com',
        planName: 'WP Pro',
        planType: 'WordPress Hosting',
        duration: '12 tháng',
        amount: 2390000,
        voucher: 'WELCOME20',
        discount: 478000,
        total: 1912000,
        status: 'provisioned',
        createdDate: '2025-10-08',
        notes: 'Khách yêu cầu cài WordPress theme Astra'
    },
    {
        id: 'ord-2025-002',
        customerName: 'Trần Thị B',
        customerEmail: 'tranthib@example.com',
        planName: 'Biz Pro',
        planType: 'Business Hosting',
        duration: '6 tháng',
        amount: 888000,
        discount: 0,
        total: 888000,
        status: 'approved',
        createdDate: '2025-10-09'
    },
    {
        id: 'ord-2025-003',
        customerName: 'Lê Văn C',
        customerEmail: 'levanc@example.com',
        planName: 'Mail Pro',
        planType: 'Email Domain',
        duration: '12 tháng',
        amount: 1718000,
        voucher: 'SAVE100K',
        discount: 100000,
        total: 1618000,
        status: 'pending',
        createdDate: '2025-10-10'
    }
];
const mockTickets = [
    {
        id: 't1',
        ticketNumber: 'TK-2025-001',
        customerName: 'Nguyễn Văn A',
        customerEmail: 'nguyenvana@example.com',
        subject: 'Website bị chậm sau khi cập nhật plugin',
        department: 'technical',
        priority: 'high',
        status: 'in-progress',
        serviceId: 's1',
        serviceName: 'WP Pro - VPS-HN-01',
        createdDate: '2025-10-10 09:30',
        updatedDate: '2025-10-10 10:15',
        assignedTo: 'Kỹ thuật viên A',
        messages: [
            {
                id: 'm1',
                sender: 'customer',
                senderName: 'Nguyễn Văn A',
                message: 'Website của tôi bị chậm rất nhiều sau khi cập nhật plugin WooCommerce. Trang admin mất 10s mới load.',
                timestamp: '2025-10-10 09:30'
            },
            {
                id: 'm2',
                sender: 'agent',
                senderName: 'Kỹ thuật viên A',
                message: 'Chào anh, tôi đã kiểm tra và thấy plugin cache đang conflict với WooCommerce. Tôi sẽ tối ưu lại cấu hình.',
                timestamp: '2025-10-10 10:15'
            }
        ]
    },
    {
        id: 't2',
        ticketNumber: 'TK-2025-002',
        customerName: 'Trần Thị B',
        customerEmail: 'tranthib@example.com',
        subject: 'Muốn nâng cấp gói lên Business Pro',
        department: 'sales',
        priority: 'normal',
        status: 'open',
        createdDate: '2025-10-10 14:20',
        updatedDate: '2025-10-10 14:20',
        messages: [
            {
                id: 'm3',
                sender: 'customer',
                senderName: 'Trần Thị B',
                message: 'Em muốn nâng cấp từ gói Biz Basic lên Biz Pro. Chi phí sẽ như thế nào?',
                timestamp: '2025-10-10 14:20'
            }
        ]
    },
    {
        id: 't3',
        ticketNumber: 'TK-2025-003',
        customerName: 'Lê Văn C',
        customerEmail: 'levanc@example.com',
        subject: 'Email không gửi được',
        department: 'technical',
        priority: 'urgent',
        status: 'open',
        serviceId: 's2',
        serviceName: 'Mail Pro - VPS-HN-03',
        createdDate: '2025-10-10 15:45',
        updatedDate: '2025-10-10 15:45',
        messages: [
            {
                id: 'm4',
                sender: 'customer',
                senderName: 'Lê Văn C',
                message: 'Email công ty không gửi được từ sáng nay. Rất cấp, đang có hợp đồng quan trọng!',
                timestamp: '2025-10-10 15:45'
            }
        ]
    },
    {
        id: 't4',
        ticketNumber: 'TK-2025-004',
        customerName: 'Phạm Thị D',
        customerEmail: 'phamthid@example.com',
        subject: 'Hỏi về chính sách backup',
        department: 'technical',
        priority: 'low',
        status: 'waiting',
        createdDate: '2025-10-09 11:00',
        updatedDate: '2025-10-09 16:30',
        assignedTo: 'Kỹ thuật viên B',
        messages: [
            {
                id: 'm5',
                sender: 'customer',
                senderName: 'Phạm Thị D',
                message: 'Cho em hỏi backup được lưu trữ ở đâu và trong bao lâu?',
                timestamp: '2025-10-09 11:00'
            },
            {
                id: 'm6',
                sender: 'agent',
                senderName: 'Kỹ thuật viên B',
                message: 'Backup được lưu offsite, daily 7 ngày, weekly 4 tuần. Bạn cần restore backup nào không?',
                timestamp: '2025-10-09 16:30'
            }
        ]
    },
    {
        id: 't5',
        ticketNumber: 'TK-2025-005',
        customerName: 'Hoàng Văn E',
        customerEmail: 'hoangvane@example.com',
        subject: 'SSL certificate sắp hết hạn',
        department: 'technical',
        priority: 'normal',
        status: 'resolved',
        createdDate: '2025-10-08 10:00',
        updatedDate: '2025-10-08 11:30',
        assignedTo: 'Kỹ thuật viên A',
        messages: [
            {
                id: 'm7',
                sender: 'customer',
                senderName: 'Hoàng Văn E',
                message: 'Nhận được thông báo SSL sắp hết hạn. Làm sao để gia hạn?',
                timestamp: '2025-10-08 10:00'
            },
            {
                id: 'm8',
                sender: 'agent',
                senderName: 'Kỹ thuật viên A',
                message: 'SSL Let\'s Encrypt tự động gia hạn. Tôi đã kiểm tra và chứng chỉ đã được renew thành công.',
                timestamp: '2025-10-08 11:30'
            }
        ]
    }
];
}),
"[project]/app/(main)/support/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SupportPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paperclip.js [app-ssr] (ecmascript) <export default as Paperclip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ticket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ticket.js [app-ssr] (ecmascript) <export default as Ticket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/mockData.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function SupportPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [subject, setSubject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [department, setDepartment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('technical');
    const [priority, setPriority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('normal');
    const [service, setService] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        setSubmitted(true);
        setTimeout(()=>{
            setSubject('');
            setMessage('');
            setService('');
            setSubmitted(false);
            router.push('/my-tickets');
        }, 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 py-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-12 animate-fade-in",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                            className: "h-16 w-16 text-[#034CC9] mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/support/page.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl sm:text-4xl font-bold text-[#0B2B6F] mb-4",
                            children: "Trung tâm hỗ trợ"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/support/page.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg sm:text-xl text-gray-600",
                            children: "Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/support/page.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/support/page.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8 flex flex-wrap justify-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push('/my-tickets'),
                            className: "bg-[#034CC9] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0B2B6F] transition-all hover:scale-105 inline-flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ticket$3e$__["Ticket"], {
                                    className: "h-4 w-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                "Xem ticket của tôi"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/support/page.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push('/blog'),
                            className: "bg-white border-2 border-[#034CC9] text-[#034CC9] px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all hover:scale-105 inline-flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                    className: "h-4 w-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                "Hướng dẫn & FAQ"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/support/page.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/support/page.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:grid-cols-3 gap-6 mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow-md p-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                        className: "h-6 w-6 text-[#034CC9]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/support/page.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-[#0B2B6F] mb-2",
                                    children: "Live Chat"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mb-4",
                                    children: "Trả lời trong 5 phút"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "text-[#034CC9] font-semibold hover:underline",
                                    children: "Bắt đầu chat"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/support/page.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow-md p-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-6 w-6 text-green-600",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 70,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/support/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-[#0B2B6F] mb-2",
                                    children: "Email"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mb-4",
                                    children: "support@vmst.host"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "mailto:support@vmst.host",
                                    className: "text-[#034CC9] font-semibold hover:underline",
                                    children: "Gửi email"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/support/page.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow-md p-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-6 w-6 text-orange-600",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 83,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/support/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-[#0B2B6F] mb-2",
                                    children: "Hotline"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mb-4",
                                    children: "0822 636 676"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "tel:0822636676",
                                    className: "text-[#034CC9] font-semibold hover:underline",
                                    children: "Gọi ngay"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/support/page.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/support/page.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-lg p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-[#0B2B6F] mb-6",
                            children: "Tạo ticket hỗ trợ"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/support/page.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-green-50 border border-green-200 rounded-lg p-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-8 w-8 text-green-600",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M5 13l4 4L19 7"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/support/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold text-green-800 mb-2",
                                    children: "Ticket đã được tạo!"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-green-700",
                                    children: "Chúng tôi sẽ phản hồi trong vòng 2 giờ."
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/support/page.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                                    children: [
                                                        "Bộ phận ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/support/page.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: department,
                                                    onChange: (e)=>setDepartment(e.target.value),
                                                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "technical",
                                                            children: "Kỹ thuật"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/support/page.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "sales",
                                                            children: "Sale"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/support/page.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 110,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                                    children: [
                                                        "Mức độ ưu tiên ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/support/page.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 36
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: priority,
                                                    onChange: (e)=>setPriority(e.target.value),
                                                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "low",
                                                            children: "Thấp"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/support/page.tsx",
                                                            lineNumber: 133,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "normal",
                                                            children: "Thường"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/support/page.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "high",
                                                            children: "Cao"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/support/page.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "urgent",
                                                            children: "Gấp"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/support/page.tsx",
                                                            lineNumber: 136,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 19
                                                }, this),
                                                priority === 'urgent' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 flex items-start bg-red-50 border border-red-200 rounded-lg p-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                            className: "h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/support/page.tsx",
                                                            lineNumber: 140,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-red-700",
                                                            children: "Ticket gấp sẽ được ưu tiên xử lý trong 30 phút"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/support/page.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 124,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                            children: "Dịch vụ cần hỗ trợ"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 150,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: service,
                                            onChange: (e)=>setService(e.target.value),
                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "-- Chọn dịch vụ --"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 19
                                                }, this),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockServices"].map((srv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: srv.id,
                                                        children: [
                                                            srv.planName,
                                                            " - ",
                                                            srv.serverName,
                                                            " (",
                                                            srv.ip,
                                                            ")"
                                                        ]
                                                    }, srv.id, true, {
                                                        fileName: "[project]/app/(main)/support/page.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 21
                                                    }, this)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "general",
                                                    children: "Chung / Chưa có dịch vụ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 153,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 mt-1",
                                            children: "Chọn dịch vụ liên quan để chúng tôi hỗ trợ nhanh hơn"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 166,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                            children: [
                                                "Chủ đề ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 26
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: subject,
                                            onChange: (e)=>setSubject(e.target.value),
                                            required: true,
                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]",
                                            placeholder: "Mô tả ngắn gọn vấn đề"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                            children: [
                                                "Nội dung ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 28
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 186,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: message,
                                            onChange: (e)=>setMessage(e.target.value),
                                            required: true,
                                            rows: 6,
                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]",
                                            placeholder: "Mô tả chi tiết vấn đề của bạn..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                            children: "Đính kèm file"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 200,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#034CC9] transition-colors cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__["Paperclip"], {
                                                    className: "h-8 w-8 text-gray-400 mx-auto mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-600",
                                                    children: "Kéo thả file hoặc click để chọn"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500 mt-1",
                                                    children: "PNG, JPG, PDF (max 10MB)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/support/page.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "w-full bg-[#034CC9] text-white py-4 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors flex items-center justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            className: "h-5 w-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/support/page.tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this),
                                        "Gửi ticket"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/support/page.tsx",
                                    lineNumber: 210,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/support/page.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/support/page.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/support/page.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(main)/support/page.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MessageSquare
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const MessageSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("MessageSquare", [
    [
        "path",
        {
            d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
            key: "1lielz"
        }
    ]
]);
;
 //# sourceMappingURL=message-square.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageSquare",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/paperclip.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Paperclip
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const Paperclip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("Paperclip", [
    [
        "path",
        {
            d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",
            key: "1u3ebp"
        }
    ]
]);
;
 //# sourceMappingURL=paperclip.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/paperclip.js [app-ssr] (ecmascript) <export default as Paperclip>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Paperclip",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paperclip.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/ticket.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Ticket
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const Ticket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("Ticket", [
    [
        "path",
        {
            d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
            key: "qn84l0"
        }
    ],
    [
        "path",
        {
            d: "M13 5v2",
            key: "dyzc3o"
        }
    ],
    [
        "path",
        {
            d: "M13 17v2",
            key: "1ont0d"
        }
    ],
    [
        "path",
        {
            d: "M13 11v2",
            key: "1wjjxi"
        }
    ]
]);
;
 //# sourceMappingURL=ticket.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/ticket.js [app-ssr] (ecmascript) <export default as Ticket>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Ticket",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ticket.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookOpen
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const BookOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("BookOpen", [
    [
        "path",
        {
            d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",
            key: "vv98re"
        }
    ],
    [
        "path",
        {
            d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
            key: "1cyq3y"
        }
    ]
]);
;
 //# sourceMappingURL=book-open.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookOpen",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_a8aab913._.js.map