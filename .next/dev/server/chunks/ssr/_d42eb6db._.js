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
"[project]/services/contacts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteContact",
    ()=>deleteContact,
    "fetchClientIp",
    ()=>fetchClientIp,
    "listContacts",
    ()=>listContacts,
    "submitContact",
    ()=>submitContact,
    "updateContact",
    ()=>updateContact
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
async function fetchClientIp() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const json = await res.json();
        return json?.ip;
    } catch  {
        return undefined;
    }
}
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function submitContact(input) {
    const payload = {
        ...input,
        email: input.email.trim().toLowerCase(),
        trang_thai: input.trang_thai || 'newlead',
        user_agent: input.user_agent ?? (typeof navigator !== 'undefined' ? {
            ua: navigator.userAgent
        } : {})
    };
    const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể gửi liên hệ');
    return res.json();
}
async function listContacts(params) {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.perPage) qs.set('perPage', String(params.perPage));
    if (params?.status) qs.set('status', params.status);
    if (params?.search) qs.set('search', params.search);
    const res = await fetch(`/api/admin/contacts?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách liên hệ');
    return res.json();
}
async function updateContact(id, data) {
    const res = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...data
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật liên hệ');
    return res.json();
}
async function deleteContact(id) {
    const res = await fetch(`/api/admin/contacts?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa liên hệ');
}
}),
"[project]/services/servers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServer",
    ()=>createServer,
    "deleteServer",
    ()=>deleteServer,
    "listServers",
    ()=>listServers,
    "updateServer",
    ()=>updateServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function listServers(params) {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.perPage) qs.set('perPage', String(params.perPage));
    if (params?.status) qs.set('status', params.status);
    if (params?.search) qs.set('search', params.search);
    const res = await fetch(`/api/admin/servers?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách server');
    return res.json();
}
async function createServer(input) {
    const res = await fetch('/api/admin/servers', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo server');
    return res.json();
}
async function updateServer(id, data) {
    const res = await fetch('/api/admin/servers', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...data
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật server');
    return res.json();
}
async function deleteServer(id) {
    const res = await fetch(`/api/admin/servers?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa server');
}
}),
"[project]/services/orders.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildOrderEmail",
    ()=>buildOrderEmail,
    "createMyOrder",
    ()=>createMyOrder,
    "createOrder",
    ()=>createOrder,
    "deleteOrder",
    ()=>deleteOrder,
    "listMyOrders",
    ()=>listMyOrders,
    "listOrders",
    ()=>listOrders,
    "updateOrder",
    ()=>updateOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
;
const ORDERS_COLLECTION = 'orders';
function generateOrderCode() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
}
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function listOrders(params) {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.perPage) qs.set('perPage', String(params.perPage));
    if (params?.thanh_toan) qs.set('thanh_toan', params.thanh_toan);
    if (params?.trang_thai_su_dung) qs.set('trang_thai_su_dung', params.trang_thai_su_dung);
    if (params?.search) qs.set('search', params.search);
    if (params?.expand) qs.set('expand', params.expand);
    const res = await fetch(`/api/admin/orders?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách đơn hàng');
    return res.json();
}
async function createOrder(input) {
    const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo đơn hàng');
    return res.json();
}
async function updateOrder(id, data) {
    const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật đơn hàng');
    return res.json();
}
async function deleteOrder(id) {
    const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa đơn hàng');
}
async function listMyOrders(params) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].authStore.isValid || !__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].authStore.model?.id) {
        return {
            items: [],
            page: 1,
            perPage: params?.perPage ?? 20,
            totalPages: 0,
            totalItems: 0
        };
    }
    const userId = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].authStore.model.id;
    const qs = new URLSearchParams();
    qs.set('page', String(params?.page ?? 1));
    qs.set('perPage', String(params?.perPage ?? 20));
    qs.set('search', userId);
    if (params?.expand) qs.set('expand', params.expand);
    const res = await fetch(`/api/admin/orders?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách đơn hàng');
    return res.json();
}
async function createMyOrder(input) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].authStore.isValid || !__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].authStore.model?.id) {
        throw new Error('Bạn cần đăng nhập để tạo đơn hàng');
    }
    const payload = {
        ...input
    };
    if (!payload.khach_hang) payload.khach_hang = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].authStore.model.id;
    if (!payload.ma_don_hang || !String(payload.ma_don_hang).trim()) payload.ma_don_hang = generateOrderCode();
    if (!payload.trang_thai_su_dung) payload.trang_thai_su_dung = 'tat_tam_thoi';
    if (!payload.thanh_toan) payload.thanh_toan = 'cho_thanh_toan';
    [
        'server',
        'ngay_het_han',
        'gia_tri',
        'hoa_hong_cho_aff',
        'host_url',
        'host_username',
        'host_password',
        'ghi_chu_noi_bo'
    ].forEach((k)=>{
        if (payload[k] !== undefined && String(payload[k]).trim() === '') delete payload[k];
    });
    if (payload.san_pham !== undefined) {
        if (Array.isArray(payload.san_pham)) {
            payload.san_pham = payload.san_pham.filter((id)=>typeof id === 'string' && id.trim() !== '');
            if (payload.san_pham.length === 0) delete payload.san_pham;
        } else if (typeof payload.san_pham === 'string' && payload.san_pham.trim() === '') {
            delete payload.san_pham;
        }
    }
    // Use admin API route to create order (orders collection may restrict direct user create)
    const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err?.error || 'Không thể tạo đơn hàng');
    }
    return res.json();
}
function buildOrderEmail(order) {
    const subject = `Thông tin đơn hàng ${order.ma_don_hang || order.id}`;
    const lines = [
        `Xin chào ${order.customerName || ''},`,
        '',
        'Thông tin đơn hàng của bạn:',
        `- Mã đơn hàng: ${order.ma_don_hang || order.id}`,
        `- Trạng thái sử dụng: ${order.trang_thai_su_dung || '-'}`,
        `- Thanh toán: ${order.thanh_toan || '-'}`,
        `- Giá trị: ${order.gia_tri || '-'}`,
        `- Sản phẩm: ${order.san_pham || '-'}`,
        `- Server: ${order.server || '-'}`,
        `- Ngày hết hạn: ${order.ngay_het_han || '-'}`,
        '',
        'Thông tin truy cập dịch vụ:',
        `- URL: ${order.host_url || '-'}`,
        `- Username: ${order.host_username || '-'}`,
        `- Password: ${order.host_password || '-'}`,
        '',
        'Nếu bạn cần hỗ trợ, vui lòng phản hồi email này hoặc liên hệ hotline 0832575905.',
        'Trân trọng,',
        'VMST.HOST'
    ];
    return {
        subject,
        body: lines.join('\n')
    };
}
}),
"[project]/services/products.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createProduct",
    ()=>createProduct,
    "deleteProduct",
    ()=>deleteProduct,
    "listProducts",
    ()=>listProducts,
    "updateProduct",
    ()=>updateProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function listProducts(params) {
    const { page = 1, perPage = 20, status, search } = params || {};
    const filters = [];
    if (status && status !== 'all') filters.push(`trang_thai = "${status}"`);
    if (search) {
        const s = search.replace(/"/g, '\\"');
        filters.push(`(ten_san_pham ~ "${s}" || danh_muc ~ "${s}")`);
    }
    const filter = filters.length ? filters.join(' && ') : undefined;
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].collection('products').getList(page, perPage, {
        filter,
        sort: '-created'
    });
    return {
        items: res.items,
        page: res.page,
        perPage: res.perPage,
        totalPages: res.totalPages,
        totalItems: res.totalItems
    };
}
async function createProduct(input) {
    const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo sản phẩm');
    return res.json();
}
async function updateProduct(id, data) {
    const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...data
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật sản phẩm');
    return res.json();
}
async function deleteProduct(id) {
    const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa sản phẩm');
}
}),
"[project]/services/users.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createUser",
    ()=>createUser,
    "deleteUser",
    ()=>deleteUser,
    "getUserById",
    ()=>getUserById,
    "listUsers",
    ()=>listUsers,
    "updateUser",
    ()=>updateUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function listUsers(params) {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.perPage) qs.set('perPage', String(params.perPage));
    if (params?.search) qs.set('search', params.search);
    if (params?.vai_tro) qs.set('vai_tro', params.vai_tro);
    if (params?.trang_thai) qs.set('trang_thai', params.trang_thai);
    const res = await fetch(`/api/admin/users?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách người dùng');
    return res.json();
}
async function getUserById(id) {
    const res = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể lấy thông tin người dùng');
    return res.json();
}
async function createUser(data) {
    // avatar is a File — must use FormData; send as JSON without avatar for now
    // (avatar upload via admin API route would need multipart support)
    const payload = {
        ...data
    };
    delete payload.avatar;
    const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo người dùng');
    return res.json();
}
async function updateUser(id, data) {
    const payload = {
        id,
        ...data
    };
    delete payload.avatar; // avatar upload not supported via JSON route
    const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật người dùng');
    return res.json();
}
async function deleteUser(id) {
    const res = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa người dùng');
    return true;
}
}),
"[project]/services/blogs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBlog",
    ()=>createBlog,
    "deleteBlog",
    ()=>deleteBlog,
    "getBlogById",
    ()=>getBlogById,
    "getBlogBySlug",
    ()=>getBlogBySlug,
    "getBlogImageUrl",
    ()=>getBlogImageUrl,
    "listBlogs",
    ()=>listBlogs,
    "toSlug",
    ()=>toSlug,
    "updateBlog",
    ()=>updateBlog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
;
async function listBlogs(params = {}) {
    const { page = 1, perPage = 10, search, categoryId, authorId, status, sort = '-created', expand } = params;
    const filters = [];
    if (search) {
        const s = search.replace(/'/g, "\\'");
        filters.push(`(tieu_de~"${s}" || mo_ta_ngan~"${s}" || slug~"${s}")`);
    }
    if (categoryId) filters.push(`danh_muc='${categoryId}'`);
    if (authorId) filters.push(`tac_gia='${authorId}'`);
    if (status) filters.push(`trang_thai='${status}'`);
    const filter = filters.length ? filters.join(' && ') : undefined;
    return await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].collection('blogs').getList(page, perPage, {
        filter,
        sort,
        expand
    });
}
async function getBlogById(id, expand) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].collection('blogs').getOne(id, {
        expand
    });
}
async function getBlogBySlug(slug, expand) {
    const records = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].collection('blogs').getList(1, 1, {
        filter: `slug='${slug}'`,
        expand
    });
    return records.items[0] || null;
}
function toSlug(input) {
    return input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}
// Admin write functions — proxy through /api/admin/blogs
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`
    } : {};
}
async function createBlog(data) {
    const payload = {
        ...data
    };
    if (!payload.slug && data.tieu_de) payload.slug = toSlug(data.tieu_de);
    const needsForm = payload.thumbnail instanceof File || payload.avatar instanceof File;
    if (needsForm) {
        const fd = new FormData();
        Object.keys(payload).forEach((key)=>{
            const val = payload[key];
            if (val === undefined || val === null) return;
            if ((key === 'thumbnail' || key === 'avatar') && val instanceof File) {
                fd.append(key, val);
            } else {
                fd.append(key, String(val));
            }
        });
        const res = await fetch('/api/admin/blogs', {
            method: 'POST',
            headers: authHeaders(),
            body: fd
        });
        if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo blog');
        return res.json();
    }
    const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
            ...authHeaders(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo blog');
    return res.json();
}
async function updateBlog(id, data) {
    const payload = {
        ...data
    };
    if (payload.tieu_de && !payload.slug) payload.slug = toSlug(payload.tieu_de);
    const needsForm = payload.thumbnail instanceof File || payload.avatar instanceof File;
    if (needsForm) {
        const fd = new FormData();
        fd.append('id', id);
        Object.keys(payload).forEach((key)=>{
            const val = payload[key];
            if (val === undefined || val === null) return;
            if ((key === 'thumbnail' || key === 'avatar') && val instanceof File) {
                fd.append(key, val);
            } else {
                fd.append(key, String(val));
            }
        });
        const res = await fetch('/api/admin/blogs', {
            method: 'PATCH',
            headers: authHeaders(),
            body: fd
        });
        if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật blog');
        return res.json();
    }
    const res = await fetch('/api/admin/blogs', {
        method: 'PATCH',
        headers: {
            ...authHeaders(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            ...payload
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật blog');
    return res.json();
}
async function deleteBlog(id) {
    const res = await fetch(`/api/admin/blogs?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa blog');
}
function getBlogImageUrl(record) {
    const filename = record?.thumbnail || record?.avatar || '';
    if (!filename) return '';
    if (/^https?:\/\//.test(filename)) return filename;
    const base = ("TURBOPACK compile-time value", "https://api.vmst.host") || 'https://api.vmst.host';
    return `${base.replace(/\/$/, '')}/api/files/blogs/${record.id}/${filename}`;
}
}),
"[project]/services/categoryBlogs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCategoryBlog",
    ()=>createCategoryBlog,
    "deleteCategoryBlog",
    ()=>deleteCategoryBlog,
    "getCategoryBySlug",
    ()=>getCategoryBySlug,
    "listCategoryBlogs",
    ()=>listCategoryBlogs,
    "updateCategoryBlog",
    ()=>updateCategoryBlog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
;
async function listCategoryBlogs(params) {
    const { page = 1, perPage = 50, search, parentId } = params || {};
    const filters = [];
    if (search && search.trim()) {
        const s = search.trim();
        filters.push(`(name ?~ '${s}' || slug ?~ '${s}' || description ?~ '${s}')`);
    }
    if (parentId && parentId.trim()) {
        filters.push(`danh_muc_cha = '${parentId.trim()}'`);
    }
    const filter = filters.length ? filters.join(' && ') : '';
    return await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].collection('category_blogs').getList(page, perPage, {
        filter,
        sort: 'name'
    });
}
async function getCategoryBySlug(slug) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].collection('category_blogs').getList(1, 1, {
        filter: `slug='${slug}'`
    });
    return res.items[0] || null;
}
// Admin write functions — proxy through /api/admin/category-blogs
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function createCategoryBlog(input) {
    const res = await fetch('/api/admin/category-blogs', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo danh mục');
    return res.json();
}
async function updateCategoryBlog(id, data) {
    const res = await fetch('/api/admin/category-blogs', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...data
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật danh mục');
    return res.json();
}
async function deleteCategoryBlog(id) {
    const res = await fetch(`/api/admin/category-blogs?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa danh mục');
    return true;
}
}),
"[project]/services/affiliate.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAffiliate",
    ()=>createAffiliate,
    "deleteAffiliate",
    ()=>deleteAffiliate,
    "getAffiliate",
    ()=>getAffiliate,
    "getAffiliateByUser",
    ()=>getAffiliateByUser,
    "listAffiliates",
    ()=>listAffiliates,
    "updateAffiliate",
    ()=>updateAffiliate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function listAffiliates(params) {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.perPage) qs.set('perPage', String(params.perPage));
    if (params?.sort) qs.set('sort', params.sort);
    if (params?.filter) qs.set('filter', params.filter);
    const res = await fetch(`/api/admin/affiliate?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách affiliate');
    return res.json();
}
async function getAffiliate(id) {
    const res = await fetch(`/api/admin/affiliate?id=${encodeURIComponent(id)}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải affiliate');
    return res.json();
}
async function getAffiliateByUser(userId) {
    const filter = `user_aff="${userId}"`;
    const res = await fetch(`/api/admin/affiliate?filter=${encodeURIComponent(filter)}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải affiliate');
    const data = await res.json();
    return data.items?.[0] ?? null;
}
async function createAffiliate(input) {
    const res = await fetch('/api/admin/affiliate', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo affiliate');
    return res.json();
}
async function updateAffiliate(id, data) {
    const res = await fetch('/api/admin/affiliate', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...data
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật affiliate');
    return res.json();
}
async function deleteAffiliate(id) {
    const res = await fetch(`/api/admin/affiliate?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa affiliate');
}
}),
"[project]/services/yeuCauThanhToanAff.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createYeuCauThanhToan",
    ()=>createYeuCauThanhToan,
    "deleteYeuCauThanhToan",
    ()=>deleteYeuCauThanhToan,
    "listYeuCauThanhToan",
    ()=>listYeuCauThanhToan,
    "updateYeuCauThanhToan",
    ()=>updateYeuCauThanhToan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function listYeuCauThanhToan(params) {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.perPage) qs.set('perPage', String(params.perPage));
    if (params?.sort) qs.set('sort', params.sort);
    if (params?.filter) qs.set('filter', params.filter);
    const res = await fetch(`/api/admin/yeu-cau-thanh-toan-aff?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách yêu cầu thanh toán');
    return res.json();
}
async function createYeuCauThanhToan(input) {
    const res = await fetch('/api/admin/yeu-cau-thanh-toan-aff', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo yêu cầu thanh toán');
    return res.json();
}
async function updateYeuCauThanhToan(id, data) {
    const res = await fetch('/api/admin/yeu-cau-thanh-toan-aff', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...data
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật yêu cầu thanh toán');
    return res.json();
}
async function deleteYeuCauThanhToan(id) {
    const res = await fetch(`/api/admin/yeu-cau-thanh-toan-aff?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa yêu cầu thanh toán');
}
}),
"[project]/services/settingSystem.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSettings",
    ()=>createSettings,
    "getSettings",
    ()=>getSettings,
    "updateSettings",
    ()=>updateSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function getSettings() {
    const res = await fetch('/api/admin/settings', {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải cài đặt hệ thống');
    return res.json();
}
async function createSettings(input) {
    const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo cài đặt hệ thống');
    return res.json();
}
async function updateSettings(id, data) {
    const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...data
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật cài đặt hệ thống');
    return res.json();
}
}),
"[project]/services/tickets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTicket",
    ()=>createTicket,
    "deleteTicket",
    ()=>deleteTicket,
    "listTickets",
    ()=>listTickets,
    "mapPriorityToLabel",
    ()=>mapPriorityToLabel,
    "mapStatusToLabel",
    ()=>mapStatusToLabel,
    "updateTicket",
    ()=>updateTicket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
function mapPriorityToLabel(p) {
    switch(p){
        case 'thap':
            return 'Thấp';
        case 'trung_binh':
            return 'Trung bình';
        case 'cao':
            return 'Cao';
        default:
            return String(p);
    }
}
function mapStatusToLabel(s) {
    switch(s){
        case 'cho_tech_rep':
            return 'Chờ kỹ thuật phản hồi';
        case 'cho_khach_rep':
            return 'Chờ khách phản hồi';
        case 'dong_ticket':
            return 'Đóng ticket';
        default:
            return String(s);
    }
}
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function createTicket(input) {
    const res = await fetch('/api/admin/tickets', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo ticket');
    return res.json();
}
async function listTickets(params = {}) {
    const qs = new URLSearchParams();
    if (params.page) qs.set('page', String(params.page));
    if (params.perPage) qs.set('perPage', String(params.perPage));
    if (params.status) qs.set('status', params.status);
    if (params.department) qs.set('department', params.department);
    if (params.priority) qs.set('priority', params.priority);
    if (params.userId) qs.set('userId', params.userId);
    if (params.search) qs.set('search', params.search);
    const res = await fetch(`/api/admin/tickets?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách ticket');
    return res.json();
}
async function updateTicket(id, data) {
    const res = await fetch('/api/admin/tickets', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...data
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật ticket');
    return res.json();
}
async function deleteTicket(id) {
    const res = await fetch(`/api/admin/tickets?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa ticket');
}
}),
"[project]/services/vouchers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateVoucherDiscount",
    ()=>calculateVoucherDiscount,
    "createVoucher",
    ()=>createVoucher,
    "deleteVoucher",
    ()=>deleteVoucher,
    "getVoucherByCode",
    ()=>getVoucherByCode,
    "getVoucherById",
    ()=>getVoucherById,
    "listVouchers",
    ()=>listVouchers,
    "updateVoucher",
    ()=>updateVoucher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function listVouchers(params) {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.perPage) qs.set('perPage', String(params.perPage));
    if (params?.sort) qs.set('sort', params.sort);
    if (params?.filter) qs.set('filter', params.filter);
    const res = await fetch(`/api/admin/vouchers?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách voucher');
    return res.json();
}
async function getVoucherById(id) {
    const res = await fetch(`/api/admin/vouchers?id=${encodeURIComponent(id)}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể lấy thông tin voucher');
    return res.json();
}
async function getVoucherByCode(code) {
    try {
        const records = await listVouchers({
            filter: `code_giam_gia = "${code.toUpperCase()}"`,
            perPage: 1
        });
        return records.items.length > 0 ? records.items[0] : null;
    } catch  {
        return null;
    }
}
async function createVoucher(input) {
    const res = await fetch('/api/admin/vouchers', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo voucher');
    return res.json();
}
async function updateVoucher(id, input) {
    const res = await fetch('/api/admin/vouchers', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...input
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật voucher');
    return res.json();
}
async function deleteVoucher(id) {
    const res = await fetch(`/api/admin/vouchers?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa voucher');
}
function calculateVoucherDiscount(voucher, subtotal) {
    const minOrder = parseFloat(voucher.don_toi_thieu || '0');
    if (subtotal < minOrder) {
        return {
            isValid: false,
            discount: 0,
            error: `Đơn hàng tối thiểu ${minOrder.toLocaleString('vi-VN')}₫`
        };
    }
    const totalQty = parseInt(voucher.so_luong || '0');
    const usedQty = parseInt(voucher.da_dung || '0');
    if (usedQty >= totalQty && totalQty > 0) {
        return {
            isValid: false,
            discount: 0,
            error: 'Mã voucher đã hết lượt sử dụng'
        };
    }
    let discount = 0;
    const giaTri = voucher.gia_tri || '0';
    if (giaTri.includes('%')) {
        discount = subtotal * parseFloat(giaTri.replace('%', '')) / 100;
    } else {
        discount = parseFloat(giaTri);
    }
    discount = Math.min(discount, subtotal);
    return {
        isValid: true,
        discount
    };
}
}),
"[project]/services/studentVouchers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addStudentEmails",
    ()=>addStudentEmails,
    "checkStudentEmail",
    ()=>checkStudentEmail,
    "getStudentList",
    ()=>getStudentList,
    "getStudentVoucherStats",
    ()=>getStudentVoucherStats,
    "markStudentEmailUsed",
    ()=>markStudentEmailUsed
]);
// API routes are relative in Next.js — no base URL needed
const API_BASE = '';
async function checkStudentEmail(email) {
    try {
        const response = await fetch(`${API_BASE}/api/student-vouchers/check/${encodeURIComponent(email)}`);
        if (!response.ok) {
            throw new Error('Không thể kiểm tra email');
        }
        return await response.json();
    } catch (error) {
        console.error('Error checking student email:', error);
        throw new Error(error?.message || 'Không thể kiểm tra email');
    }
}
async function markStudentEmailUsed(email, orderId) {
    try {
        const response = await fetch(`${API_BASE}/api/student-vouchers/mark-used`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                orderId
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.error || 'Không thể đánh dấu email đã sử dụng');
        }
    } catch (error) {
        console.error('Error marking student email as used:', error);
        throw new Error(error?.message || 'Không thể đánh dấu email đã sử dụng');
    }
}
async function getStudentList() {
    try {
        const response = await fetch(`${API_BASE}/api/student-vouchers/list`);
        if (!response.ok) {
            throw new Error('Không thể lấy danh sách sinh viên');
        }
        return await response.json();
    } catch (error) {
        console.error('Error getting student list:', error);
        throw new Error(error?.message || 'Không thể lấy danh sách sinh viên');
    }
}
async function addStudentEmails(emails) {
    try {
        const response = await fetch(`${API_BASE}/api/student-vouchers/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emails
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.error || 'Không thể thêm email vào danh sách');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding student emails:', error);
        throw new Error(error?.message || 'Không thể thêm email vào danh sách');
    }
}
async function getStudentVoucherStats() {
    try {
        const response = await fetch(`${API_BASE}/api/student-vouchers/stats`);
        if (!response.ok) {
            throw new Error('Không thể lấy thống kê');
        }
        return await response.json();
    } catch (error) {
        console.error('Error getting stats:', error);
        throw new Error(error?.message || 'Không thể lấy thống kê');
    }
}
}),
"[project]/app/admin/[[...tab]]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminDashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/AdminDashboard.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function AdminPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminDashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/admin/[[...tab]]/page.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=_d42eb6db._.js.map