# 🖼️ Media & Icons

## Definition
Components for displaying visual content.

## Characteristics
- Present images or media
- Support visual communication
- Often decorative or informative
- Various formats and sizes
- Enhance user understanding

## Qualification Test
> "Is the main purpose to display visual content?"

## Components in this category

### ✅ Currently Implemented (0)
*No media components implemented yet*

### 🔜 Planned Components
- **Avatar** - User/entity representation
- **Avatar Group** - Multiple avatars
- **Icon** - Symbolic graphics
- **Image** - Photo/graphic display
- **Video Player** - Video playback
- **Audio Player** - Audio playback
- **Gallery** - Image collection
- **Carousel** - Image slider
- **Logo** - Brand identity
- **Thumbnail** - Image preview

## Usage Guidelines

### When to use
- User identification (avatars)
- Visual communication (icons)
- Content illustration (images)
- Media playback
- Brand representation
- Visual navigation aids

### Best Practices
1. **Optimized loading** - Lazy load, proper formats
2. **Responsive images** - Multiple resolutions
3. **Alt text** - Descriptive alternatives
4. **Consistent sizing** - Use size tokens
5. **Fallback content** - Handle loading errors
6. **Performance** - Optimize file sizes

## Accessibility Requirements
- **Alt text** - Meaningful descriptions
- **Decorative indicators** - alt="" for decorative
- **Keyboard controls** - For media players
- **Captions** - For videos
- **Transcripts** - Audio content
- **Focus indicators** - For interactive media

## Token Structure
```json
{
  "media": {
    "[component]": {
      "size": { "xs", "sm", "md", "lg", "xl", "2xl" },
      "variant": { "circle", "square", "rounded" },
      "aspectRatio": { "square", "video", "portrait", "landscape" }
    }
  }
}
```

## Media Types
- **Raster** - JPG, PNG, WebP
- **Vector** - SVG icons
- **Video** - MP4, WebM
- **Audio** - MP3, WAV
- **Animated** - GIF, APNG

## Performance Optimization
- **Lazy Loading** - Load on viewport entry
- **Responsive Images** - srcset/sizes
- **Image CDN** - Optimized delivery
- **Format Selection** - Modern formats
- **Compression** - Balanced quality

## Related Categories
- **Badges & Labels** - Avatar badges
- **Actions & Controls** - Media controls
- **Overlays & Modals** - Lightbox viewing