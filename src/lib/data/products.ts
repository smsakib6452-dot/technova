import type { Category, Product } from '@/lib/types';

export const categories: Category[] = [
  {
    id: 'laptops',
    name: 'Laptops',
    slug: 'laptops',
    description: 'Powerful machines for work and play',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'smartphones',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'The latest flagships in your pocket',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'audio',
    name: 'Audio',
    slug: 'audio',
    description: 'Headphones, earbuds and speakers',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'wearables',
    name: 'Wearables',
    slug: 'wearables',
    description: 'Smartwatches and fitness trackers',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gaming',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Consoles, controllers and gear',
    image:
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Keyboards, mice and more',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
  },
];

export const products: Product[] = [
  {
    id: 'p-aurora-x15',
    slug: 'aurora-x15-ultrabook',
    name: 'Aurora X15 Ultrabook',
    brand: 'NovaTech',
    category: 'laptops',
    price: 165000,
    compareAtPrice: 189000,
    rating: 4.8,
    reviews: 342,
    description:
      'A featherlight ultrabook built around the latest silicon. The Aurora X15 pairs a stunning 15.6" 120Hz display with all-day battery life, making it the perfect travel companion for professionals and creators.',
    features: [
      '15.6" 3K OLED, 120Hz display',
      'Intel Core Ultra 7, 32GB RAM',
      '1TB NVMe SSD storage',
      'All-day 18-hour battery life',
      '1.1kg aluminum chassis',
    ],
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 14,
    badge: 'bestseller',
    featured: true,
  },
  {
    id: 'p-thunderbook-pro',
    slug: 'thunderbook-pro-16',
    name: 'ThunderBook Pro 16',
    brand: 'Voltix',
    category: 'laptops',
    price: 245000,
    rating: 4.7,
    reviews: 218,
    description:
      'A desktop-class workstation with a 16-core CPU and studio-grade GPU. The ThunderBook Pro 16 handles rendering, AI workloads and 4K video editing without breaking a sweat.',
    features: [
      '16-core CPU, 64GB RAM',
      '16" 4K mini-LED display',
      'NVIDIA RTX 5070 GPU',
      '2TB PCIe Gen5 SSD',
      'Professional color accuracy',
    ],
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 8,
    badge: 'new',
    featured: true,
  },
  {
    id: 'p-pixel9-pro',
    slug: 'pixel9-pro-smartphone',
    name: 'Pixel9 Pro',
    brand: 'Google',
    category: 'smartphones',
    price: 125000,
    compareAtPrice: 139000,
    rating: 4.9,
    reviews: 1247,
    description:
      'Google\'s most advanced Pixel yet. The Pixel9 Pro combines a breathtaking camera system with the smoothest Android experience and on-device AI that understands your world.',
    features: [
      '6.7" LTPO OLED, 120Hz',
      '50MP triple camera system',
      'AI-powered photo editing',
      '5000mAh battery, fast charging',
      '7 years of OS updates',
    ],
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 26,
    badge: 'bestseller',
    featured: true,
  },
  {
    id: 'p-whisper-buds',
    slug: 'whisper-buds-pro',
    name: 'Whisper Buds Pro',
    brand: 'Echo Labs',
    category: 'audio',
    price: 16000,
    compareAtPrice: 20000,
    rating: 4.6,
    reviews: 892,
    description:
      'Flagship wireless earbuds with adaptive noise cancellation, spatial audio and crystal-clear call quality. The Whisper Buds Pro deliver studio sound with up to 36 hours of total playback.',
    features: [
      'Adaptive ANC and transparency',
      'Spatial audio with head tracking',
      '36h total battery life',
      'IPX5 water resistance',
      'Multipoint Bluetooth 5.3',
    ],
    image:
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 44,
    badge: 'sale',
  },
  {
    id: 'p-bassline-headphones',
    slug: 'bassline-900-headphones',
    name: 'Bassline 900 Headphones',
    brand: 'Echo Labs',
    category: 'audio',
    price: 45000,
    rating: 4.7,
    reviews: 431,
    description:
      'Over-ear reference headphones with planar-magnetic drivers and studio-grade sound staging. The Bassline 900 offers a premium listening experience for audiophiles on the move.',
    features: [
      'Planar-magnetic drivers',
      'Studio-grade sound staging',
      '60h battery with fast charge',
      'Foldable travel design',
      'Detachable cables included',
    ],
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 19,
    badge: 'new',
  },
  {
    id: 'p-pulse-watch',
    slug: 'pulse-watch-series-7',
    name: 'Pulse Watch Series 7',
    brand: 'Voltix',
    category: 'wearables',
    price: 45000,
    rating: 4.5,
    reviews: 654,
    description:
      'The ultimate health companion. The Pulse Watch Series 7 tracks heart rate, blood oxygen, sleep and workouts with military-grade precision — all in a stunning always-on display.',
    features: [
      'Always-on AMOLED display',
      'ECG and blood oxygen sensor',
      'Sleep and stress tracking',
      '10-day battery life',
      '50m water resistance',
    ],
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 31,
    badge: 'bestseller',
  },
  {
    id: 'p-motion-fit-band',
    slug: 'motion-fit-band',
    name: 'Motion Fit Band',
    brand: 'FitCore',
    category: 'wearables',
    price: 6500,
    rating: 4.3,
    reviews: 1102,
    description:
      'A slim, light fitness band that punches above its weight. Track steps, heart rate and 20+ workout modes, then sync everything to your phone with a single tap.',
    features: [
      '1.47" AMOLED display',
      '20+ workout modes',
      '14-day battery life',
      '5ATM water resistance',
      'Call and message alerts',
    ],
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 58,
  },
  {
    id: 'p-nebula-controller',
    slug: 'nebula-game-controller',
    name: 'Nebula Pro Controller',
    brand: 'PlayTec',
    category: 'gaming',
    price: 8500,
    compareAtPrice: 11000,
    rating: 4.6,
    reviews: 978,
    description:
      'A pro-grade wireless controller with hall-effect sticks, remappable buttons and low-latency wireless. The Nebula Pro is built for competitive play across PC, console and mobile.',
    features: [
      'Hall-effect thumbsticks',
      'Remappable back paddles',
      '2.4GHz + Bluetooth wireless',
      'Built-in rechargeable battery',
      'PC, console and mobile ready',
    ],
    image:
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 37,
    badge: 'sale',
  },
  {
    id: 'p-opti-key-75',
    slug: 'opti-key-75-keyboard',
    name: 'Opti Key 75',
    brand: 'NovaTech',
    category: 'accessories',
    price: 18000,
    rating: 4.7,
    reviews: 523,
    description:
      'A compact 75% mechanical keyboard with gasket-mounted pre-lubed switches and PBT keycaps. The Opti Key 75 delivers a thocky, satisfying typing experience out of the box.',
    features: [
      'Gasket-mounted, pre-lubed switches',
      'Hot-swappable sockets',
      'Tri-mode: USB, 2.4GHz, BT',
      'PBT double-shot keycaps',
      'Aluminum CNC frame',
    ],
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 22,
    badge: 'new',
  },
  {
    id: 'p-glide-mouse',
    slug: 'glide-x2-mouse',
    name: 'Glide X2 Mouse',
    brand: 'FitCore',
    category: 'accessories',
    price: 6000,
    rating: 4.4,
    reviews: 876,
    description:
      'An ultralight 52g esports mouse with a 26K optical sensor and optical switches. The Glide X2 glides across your desk and keeps up with even the fastest flicks.',
    features: [
      '52g ultralight design',
      '26K DPI optical sensor',
      'Optical micro-switches',
      'Flexible paracord cable',
      'On-board DPI profiles',
    ],
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 61,
  },
  {
    id: 'p-titan-gpu',
    slug: 'titan-gpu',
    name: 'Titan Rtx Pro 24GB',
    brand: 'PlayTec',
    category: 'gaming',
    price: 210000,
    rating: 4.9,
    reviews: 167,
    description:
      'The fastest consumer GPU we have ever shipped. The Titan RTX Pro delivers uncompromised 4K performance, AI acceleration and 24GB of GDDR7 memory for the ultimate gaming rig.',
    features: [
      '24GB GDDR7 memory',
      '4K ultra performance',
      'DLSS 4 with multi-frame gen',
      'Triple-fan vapor chamber',
      '0dB idle mode',
    ],
    image:
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 5,
    badge: 'bestseller',
    featured: true,
  },
  {
    id: 'p-sonar-speaker',
    slug: 'sonar-360-speaker',
    name: 'Sonar 360 Speaker',
    brand: 'Echo Labs',
    category: 'audio',
    price: 14000,
    compareAtPrice: 18000,
    rating: 4.5,
    reviews: 288,
    description:
      'A portable 360° speaker that fills any room with sound. With deep bass, 24-hour battery and an IP67 rating, the Sonar 360 is ready for anything from the office to the beach.',
    features: [
      '360° surround sound',
      '24-hour battery life',
      'IP67 dust and water proof',
      'Dual-driver stereo pairing',
      'USB-C fast charging',
    ],
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 33,
    badge: 'sale',
  },
  {
    id: 'p-vista-tablet',
    slug: 'vista-tablet-11',
    name: 'Vista Tablet 11',
    brand: 'NovaTech',
    category: 'laptops',
    price: 72000,
    rating: 4.6,
    reviews: 345,
    description:
      'A versatile 11" tablet that doubles as a laptop with its detachable keyboard. The Vista Tablet 11 brings a gorgeous 2.8K display and desktop-class performance to your bag.',
    features: [
      '11" 2.8K OLED display',
      'Detachable keyboard cover',
      'Active pen support',
      '20-hour battery life',
      '5G optional model',
    ],
    image:
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 18,
  },
  {
    id: 'p-zenith-cam',
    slug: 'zenith-cam-vlog',
    name: 'Zenith Cam Vlog',
    brand: 'PixelPro',
    category: 'accessories',
    price: 95000,
    compareAtPrice: 115000,
    rating: 4.7,
    reviews: 214,
    description:
      'A pocket-sized vlogging camera with a 1-inch sensor, 4K60 recording and face-tracking autofocus. The Zenith Cam Vlog is the fastest way from idea to cinematic content.',
    features: [
      '1-inch CMOS sensor',
      '4K60 / 1080p120 video',
      'Flip-out touchscreen',
      'Face and eye tracking',
      'Compact, gimbal-ready body',
    ],
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 11,
    badge: 'sale',
  },
  {
    id: 'p-skyframe-monitor',
    slug: 'skyframe-34-monitor',
    name: 'SkyFrame 34" Monitor',
    brand: 'Voltix',
    category: 'accessories',
    price: 78000,
    rating: 4.8,
    reviews: 391,
    description:
      'An ultrawide 34" QD-OLED monitor with 175Hz refresh and true HDR. The SkyFrame 34 curves around your field of view for an immersive workspace or battlestation.',
    features: [
      '34" 3440x1440 QD-OLED',
      '175Hz / 0.03ms response',
      'HDR 400 True Black',
      'USB-C 90W power delivery',
      'Height-adjustable stand',
    ],
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 9,
    badge: 'new',
  },
  {
    id: 'p-nexus-g7',
    slug: 'nexus-g7-smartphone',
    name: 'Nexus G7',
    brand: 'Voltix',
    category: 'smartphones',
    price: 95000,
    rating: 4.5,
    reviews: 748,
    description:
      'A gaming-first flagship with a 165Hz AMOLED panel, vapor-chamber cooling and a massive 5500mAh battery. The Nexus G7 is built to keep your games running at full speed.',
    features: [
      '6.8" 165Hz AMOLED',
      'Flagship Snapdragon SoC',
      '5500mAh battery, 120W charge',
      'Vapor-chamber cooling',
      'Stereo speakers + 3.5mm jack',
    ],
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 27,
    featured: true,
  },
  {
    id: 'p-aurora-edge',
    slug: 'aurora-edge-smartphone',
    name: 'Aurora Edge',
    brand: 'NovaTech',
    category: 'smartphones',
    price: 82000,
    compareAtPrice: 99000,
    rating: 4.8,
    reviews: 512,
    description:
      'A sleek all-rounder with an edge-to-edge 120Hz OLED display, advanced camera system and premium finish. The Aurora Edge delivers flagship performance for everyday productivity and entertainment.',
    features: [
      '6.5" 120Hz OLED display',
      '50MP triple camera array',
      '4500mAh battery with 65W fast charge',
      'Wireless charging support',
      'IP68 water resistance',
    ],
    image:
      'https://images.unsplash.com/photo-1512499617640-c2f999fe41b0?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512499617640-c2f999fe41b0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545231005-d02a8f7d11ef?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 35,
    badge: 'new',
  },
  {
    id: 'p-aether-charger',
    slug: 'aether-wireless-charger',
    name: 'Aether Wireless Charger',
    brand: 'FitCore',
    category: 'accessories',
    price: 4200,
    rating: 4.5,
    reviews: 128,
    description:
      'A premium fast wireless charger with magnetic alignment and multi-device support. The Aether Charger keeps your phone, earbuds and smartwatch powered without the clutter of cables.',
    features: [
      '15W fast wireless charging',
      'Magnetic alignment for safe charging',
      'Works with phones, earbuds and wearables',
      'Non-slip silicone base',
      'LED status indicator',
    ],
    image:
      'https://images.unsplash.com/photo-1518444341814-472a1de82dc6?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1518444341814-472a1de82dc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 46,
  },
  {
    id: 'p-rift-vr',
    slug: 'rift-vr-headset',
    name: 'Rift VR Headset',
    brand: 'PlayTec',
    category: 'gaming',
    price: 74000,
    rating: 4.7,
    reviews: 219,
    description:
      'A high-fidelity VR headset with a wide field of view, low-latency tracking and ergonomic design. The Rift VR Headset brings immersive gaming and virtual experiences to life with crisp visuals and comfort.',
    features: [
      '110° field of view',
      '90Hz refresh rate',
      'Inside-out tracking',
      'Comfort-fit head strap',
      'Integrated spatial audio',
    ],
    image:
      'https://images.unsplash.com/photo-1512251933181-8c0f72b209b1?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512251933181-8c0f72b209b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 16,
    badge: 'sale',
  },
  {
    id: 'p-arcadia-monitor',
    slug: 'arcadia-34-ultrawide-monitor',
    name: 'Arcadia 34" Ultrawide Monitor',
    brand: 'Voltix',
    category: 'accessories',
    price: 99500,
    compareAtPrice: 115000,
    rating: 4.8,
    reviews: 256,
    description:
      'A curved 34" QHD ultrawide monitor with vivid color and a fast 180Hz refresh rate. Designed for gamers and creators who need more screen real estate and sharp visuals.',
    features: [
      '34" QHD curved display',
      '180Hz refresh rate',
      'HDR 600',
      'Bluetooth speakers',
      'Height-adjustable stand',
    ],
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518444341814-472a1de82dc6?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 12,
    badge: 'new',
  },
  {
    id: 'p-aurora-edge',
    slug: 'aurora-edge-smartphone',
    name: 'Aurora Edge',
    brand: 'NovaTech',
    category: 'smartphones',
    price: 82000,
    compareAtPrice: 99000,
    rating: 4.8,
    reviews: 512,
    description:
      'A sleek all-rounder with an edge-to-edge 120Hz OLED display, advanced camera system and premium finish. The Aurora Edge delivers flagship performance for everyday productivity and entertainment.',
    features: [
      '6.5" 120Hz OLED display',
      '50MP triple camera array',
      '4500mAh battery with 65W fast charge',
      'Wireless charging support',
      'IP68 water resistance',
    ],
    image:
      'https://images.unsplash.com/photo-1512499617640-c2f999fe41b0?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512499617640-c2f999fe41b0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545231005-d02a8f7d11ef?auto=format&fit=crop&w=1200&q=80',
    ],
    stock: 35,
    badge: 'new',
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((p) => p.category === categoryId);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4) {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  const others = products.filter(
    (p) => p.category !== product.category && p.id !== product.id,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
