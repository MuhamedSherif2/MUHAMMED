import { IServices } from '@/interfaces/server'

// Services.ts
export const ServicesStatic: IServices[] = [
    {
        _id: '1',
        title: 'Design & Development',
        description: 'From concept to launch, I build websites and web apps tailored to your business.',
        points: [
            'Full website development',
            'Interactive web applications',
            'Custom UI/UX design',
            'E-commerce solutions',
            'Admin dashboards',
            'Responsive, mobile-first design',
        ],
    },
    {
        _id: '2',
        title: 'Specialized Services',
        description: 'Technical work that makes your product faster and better connected.',
        points: [
            'Performance optimization (speed, Core Web Vitals)',
            'On-page and technical SEO',
            'Third-party API integration (maps, social media)',
            'Payment gateway integration (Stripe, PayPal)',
            'Single page applications (React, Angular)',
            'Custom content management systems',
        ],
    },
    {
        _id: '3',
        title: 'Maintenance & Growth',
        description: 'Ongoing support so your website stays secure, current, and growing.',
        points: [
            'Updates and security maintenance',
            'Feature additions and enhancements',
            'Bug fixing and troubleshooting',
            'Website redesign and modernization',
            'Ongoing support and consulting',
        ],
    },
]