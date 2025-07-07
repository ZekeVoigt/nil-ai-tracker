# Student Athlete Income - NIL Tracking Platform

An AI-powered platform that automatically detects, verifies, and generates articles about Name, Image, and Likeness (NIL) deals in college sports.

## 🚀 Features

- **AI-Powered NIL Detection**: Automatically scans multiple sources for authentic NIL deals
- **Real-time Article Generation**: Creates professional, SEO-optimized articles within minutes
- **Comprehensive Database**: Tracks athletes, deals, and article performance
- **Modern UI**: Built with Next.js, Tailwind CSS, and shadcn/ui
- **Free Platform**: No paywalls or subscriptions - completely free for all users

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: SQLite with Prisma ORM
- **AI APIs**: OpenAI GPT-4, Firecrawl for web scraping
- **Authentication**: Ready for Clerk integration
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone and Install**
```bash
cd nil-tracker
npm install
```

2. **Environment Setup**
Create `.env.local` file:
```env
# AI APIs for NIL Detection and Content Generation
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here  # Optional
FIRECRAWL_API_KEY=your_firecrawl_api_key_here

# Database
DATABASE_URL="file:./dev.db"

# NIL Monitoring Sources (Optional)
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
NEWS_API_KEY=your_news_api_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Student Athlete Income"

# Webhook secrets for automation
WEBHOOK_SECRET=your_webhook_secret_here
```

3. **Database Setup**
```bash
npx prisma generate
npx prisma db push
```

4. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your NIL tracking platform!

## 🤖 AI API Setup

### Required APIs

1. **OpenAI API** (Required)
   - Sign up at https://platform.openai.com
   - Create API key and add to `.env.local`
   - Used for: NIL deal extraction, article generation, fact verification

2. **Firecrawl API** (Required)
   - Sign up at https://firecrawl.dev
   - Create API key and add to `.env.local`
   - Used for: Web scraping NIL sources without bot detection

### Optional APIs

3. **Twitter API v2** (Optional)
   - Apply for access at https://developer.twitter.com
   - Enhances NIL detection from social media

4. **Anthropic Claude API** (Optional)
   - Alternative/backup for content generation
   - Sign up at https://console.anthropic.com

## 🔄 Automation Workflow

The platform works through an automated pipeline:

1. **Detection**: AI scans sports news sites, social media, and official sources
2. **Verification**: Cross-references deals using multiple sources and AI fact-checking
3. **Generation**: Creates comprehensive, SEO-optimized articles
4. **Publishing**: Automatically publishes verified content

### Manual Trigger
```bash
curl -X POST http://localhost:3000/api/automation/detect-nil \
  -H "Authorization: Bearer your_webhook_secret"
```

### Scheduled Automation
Set up cron jobs or GitHub Actions to run automation:
```bash
# Every 2 hours
0 */2 * * * curl -X POST https://your-domain.com/api/automation/detect-nil
```

## 📊 Database Schema

The platform tracks:
- **Athletes**: Player profiles and statistics
- **NIL Deals**: Deal details, values, and verification status
- **Articles**: Generated content with SEO metadata
- **Tags**: Content categorization and filtering

## 🎯 Best AI Sources for NIL Detection

### Recommended for Authentic NIL Deals:

1. **ESPN College Sports**: https://www.espn.com/college-sports/nil/
2. **On3 NIL**: https://www.on3.com/nil/
3. **247Sports**: https://247sports.com/nil/
4. **Athletic Business**: https://www.athleticbusiness.com/topics/nil
5. **Sportico**: https://www.sportico.com/leagues/college-sports/

### Social Media Sources:
- Official university athletics accounts
- Verified athlete accounts
- Sports journalists and reporters
- Brand announcement accounts

## 🔒 Security & Privacy

- All API keys secured in environment variables
- Webhook endpoints protected with secret tokens
- Content fact-checked before publication
- GDPR-compliant data handling

## 📈 Scaling Considerations

### Performance Optimization
- Database indexing on frequently queried fields
- API rate limiting and retry logic
- Caching for popular content
- CDN for static assets

### Monitoring
- Processing logs for debugging
- Success/failure metrics
- Content quality scores
- User engagement tracking

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Environment Variables for Production
Update all API keys and set production database URL.

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.js`
- Modify logo and branding in `layout.tsx`
- Customize hero section messaging

### AI Prompts
- Adjust detection criteria in `nil-detector.ts`
- Modify article generation prompts in `article-generator.ts`
- Update verification thresholds

## 📝 Usage Examples

### Manual Article Generation
```typescript
import { articleGenerator } from '@/lib/services/article-generator'

// Generate articles for all pending deals
await articleGenerator.generatePendingArticles()
```

### Custom NIL Detection
```typescript
import { nilDetector } from '@/lib/services/nil-detector'

// Detect deals from custom sources
const deals = await nilDetector.detectNILDeals()
await nilDetector.saveNILDeals(deals)
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with proper TypeScript types
4. Test with real API calls
5. Submit pull request

## 📄 License

MIT License - Use this code to build your own NIL tracking platform!

## 🔗 Useful Resources

- [NIL Guidelines](https://www.ncaa.org/sports/2021/4/28/name-image-likeness.aspx)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Firecrawl Documentation](https://docs.firecrawl.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Built for StudentAthleteIncome.com** 🏈🏀⚾🏐

*Bringing transparency and insights to the NIL landscape in college sports.*
