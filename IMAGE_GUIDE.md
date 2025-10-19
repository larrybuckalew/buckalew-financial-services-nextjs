# Image Management Guide

## 📁 Folder Structure

```
public/
  images/
    ├── hero/              # Hero/banner images for page headers
    ├── services/          # Service-related images
    ├── team/              # Team member photos
    ├── testimonials/      # Customer testimonial images
    ├── blog/              # Blog post images
    └── uploads/           # User-uploaded content
```

## 🖼️ How to Add Images to Your Website

### Step 1: Add Your Image Files

1. Place your image in the appropriate folder under `public/images/`
2. Use descriptive filenames (e.g., `life-insurance-hero.jpg`, `larry-profile.jpg`)
3. Recommended formats:
   - **JPEG/JPG** - For photos (smaller file size)
   - **PNG** - For logos and images with transparency
   - **WebP** - Best compression (modern browsers)
   - **SVG** - For icons and simple graphics

### Step 2: Using Images in Your Pages

#### Option A: Using the OptimizedImage Component (Recommended)

```jsx
import OptimizedImage from '@/components/OptimizedImage';

// In your component:
<OptimizedImage
    src="/images/hero/life-insurance.jpg"
    alt="Family enjoying life insurance protection"
    width={1200}
    height={600}
    priority={true}  // For above-the-fold images
/>
```

#### Option B: Using Next.js Image Directly

```jsx
import Image from 'next/image';

<Image
    src="/images/services/health-insurance.jpg"
    alt="Health insurance coverage"
    width={400}
    height={300}
/>
```

#### Option C: Regular HTML img tag (Not Recommended)

```jsx
<img 
    src="/images/team/larry.jpg" 
    alt="Larry Buckalew" 
    className="rounded-lg"
/>
```

## 📝 Common Use Cases

### 1. Hero/Banner Images

```jsx
<div className="relative h-96 w-full">
    <OptimizedImage
        src="/images/hero/homepage-banner.jpg"
        alt="Buckalew Financial Services"
        fill={true}
        objectFit="cover"
        priority={true}
        className="brightness-90"
    />
    <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold">Your Financial Partner</h1>
    </div>
</div>
```

### 2. Service Cards with Images

```jsx
<div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <OptimizedImage
        src="/images/services/life-insurance.jpg"
        alt="Life Insurance Services"
        width={400}
        height={250}
        className="w-full"
    />
    <div className="p-6">
        <h3 className="text-2xl font-bold">Life Insurance</h3>
        <p>Protect your family's future...</p>
    </div>
</div>
```

### 3. Team Member Photos

```jsx
<div className="text-center">
    <OptimizedImage
        src="/images/team/larry-buckalew.jpg"
        alt="Larry Buckalew - Founder"
        width={300}
        height={300}
        className="rounded-full mx-auto"
    />
    <h3 className="mt-4 text-xl font-bold">Larry Buckalew</h3>
    <p className="text-gray-600">Founder & CEO</p>
</div>
```

### 4. Testimonial Images

```jsx
<div className="flex items-center gap-4">
    <OptimizedImage
        src="/images/testimonials/customer-1.jpg"
        alt="Sarah Johnson"
        width={80}
        height={80}
        className="rounded-full"
    />
    <div>
        <p className="font-semibold">Sarah Johnson</p>
        <p className="text-sm text-gray-600">Satisfied Customer</p>
    </div>
</div>
```

### 5. Background Images

```jsx
<section 
    className="py-20 bg-cover bg-center"
    style={{
        backgroundImage: "url('/images/hero/about-background.jpg')"
    }}
>
    <div className="container mx-auto px-4">
        <h2 className="text-4xl text-white font-bold">About Us</h2>
    </div>
</section>
```

## 🎨 Image Optimization Tips

### Recommended Image Sizes:

- **Hero Images**: 1920x1080px (Full width banners)
- **Service Cards**: 800x600px 
- **Team Photos**: 500x500px (Square)
- **Testimonial Photos**: 200x200px (Small squares)
- **Blog Thumbnails**: 800x450px (16:9 ratio)
- **Icons**: 64x64px or SVG

### Before Uploading:

1. **Resize images** to appropriate dimensions
2. **Compress images** using tools like:
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)
   - ImageOptim (Mac)
3. **Use descriptive filenames**: `life-insurance-family.jpg` not `IMG_1234.jpg`

## 🔧 Image Properties Reference

### OptimizedImage Component Props:

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `src` | string | Path to image | `/images/hero/banner.jpg` |
| `alt` | string | Alt text (required for accessibility) | `"Family enjoying life"` |
| `width` | number | Width in pixels | `800` |
| `height` | number | Height in pixels | `600` |
| `fill` | boolean | Fill parent container | `true` |
| `priority` | boolean | Load with high priority | `true` |
| `className` | string | CSS classes | `"rounded-lg shadow-lg"` |
| `objectFit` | string | How image fits | `"cover"`, `"contain"` |

## 📱 Responsive Images

Use the `sizes` prop for responsive images:

```jsx
<OptimizedImage
    src="/images/hero/banner.jpg"
    alt="Banner"
    width={1200}
    height={600}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## ✅ Best Practices

1. **Always include alt text** for accessibility
2. **Use priority={true}** for above-the-fold images
3. **Optimize images** before uploading
4. **Use descriptive filenames**
5. **Choose the right format**: JPEG for photos, PNG for graphics
6. **Use WebP** when possible for better compression
7. **Keep images under 1MB** when possible

## 🚫 Common Mistakes to Avoid

❌ Missing alt text
❌ Using huge unoptimized images (5MB+)
❌ Not specifying width and height
❌ Using absolute URLs (use relative paths)
❌ Forgetting to add images to public folder

## 📋 Quick Checklist

- [ ] Image is in the correct folder under `public/images/`
- [ ] Image is optimized and compressed
- [ ] Filename is descriptive (no spaces)
- [ ] Alt text is meaningful and descriptive
- [ ] Width and height are specified
- [ ] Using OptimizedImage or Next.js Image component

## 🆘 Troubleshooting

### Image not showing?
1. Check the file path is correct (`/images/folder/filename.jpg`)
2. Verify image is in the `public` folder
3. Check filename spelling and extension
4. Restart your development server

### Image too large?
1. Compress the image before uploading
2. Resize to appropriate dimensions
3. Convert to WebP format

### Image looks blurry?
1. Use a higher resolution image
2. Check width/height props match actual image dimensions
3. Use `quality` prop: `quality={90}`

## Example: Complete Page with Images

```jsx
import OptimizedImage from '@/components/OptimizedImage';

export default function AboutPage() {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-96">
                <OptimizedImage
                    src="/images/hero/about-hero.jpg"
                    alt="About Buckalew Financial"
                    fill={true}
                    priority={true}
                />
            </div>

            {/* Content with Image */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h1>About Us</h1>
                        <p>We've been serving families for over 15 years...</p>
                    </div>
                    <OptimizedImage
                        src="/images/team/office.jpg"
                        alt="Our office"
                        width={600}
                        height={400}
                    />
                </div>
            </div>
        </div>
    );
}
```

Need help adding images to a specific page? Just ask!
