import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

// Sample articles data (matches the main API)
const sampleArticles = [
  {
    id: '1',
    title: "LSU Star Gymnast Livvy Dunne Signs Multi-Million Dollar NIL Deal with Nike",
    content: `LSU gymnastics sensation Livvy Dunne has announced a groundbreaking multi-million dollar NIL partnership with Nike, marking one of the largest deals in college sports history.

The social media powerhouse, who boasts over 10 million followers across platforms, will serve as a brand ambassador for Nike's women's athletics division. The deal includes signature merchandise, exclusive content creation, and appearances at major Nike events.

## Record-Breaking Partnership

This partnership represents a watershed moment for NIL deals in gymnastics, a sport that has historically received less commercial attention than football and basketball. Industry experts estimate the deal's value at $2.5 million over two years.

"Livvy embodies everything Nike represents - athletic excellence, determination, and inspiring the next generation," said Nike VP of Marketing Sarah Johnson.

## Impact on College Gymnastics

The deal is expected to elevate the profile of college gymnastics significantly. LSU Head Coach Jay Clark expressed enthusiasm about the partnership's potential to bring more visibility to the sport.

Dunne's massive social media following, combined with her athletic achievements, makes her one of the most marketable athletes in college sports. Her TikTok videos regularly receive millions of views, providing Nike with unprecedented reach among Gen Z consumers.

## Looking Forward

This partnership sets a new standard for NIL deals in Olympic sports and demonstrates the evolving landscape of college athletics marketing. As NIL continues to mature, deals like this show the potential for athletes across all sports to benefit from their personal brands.

The deal also includes performance incentives tied to LSU's team success and Dunne's competition results, creating alignment between her athletic goals and commercial partnerships.

With this partnership, Nike gains access to one of the most engaged social media audiences in college sports, while Dunne secures financial stability that allows her to focus on both her athletic and academic pursuits at LSU.`,
    excerpt: "LSU gymnastics star Livvy Dunne announces record-breaking $2.5M NIL partnership with Nike, setting new standards for Olympic sports marketing.",
    slug: "livvy-dunne-nike-nil-deal-lsu-gymnastics",
    metaTitle: "Livvy Dunne Signs $2.5M Nike NIL Deal - LSU Gymnastics Star",
    metaDescription: "LSU gymnastics sensation Livvy Dunne announces groundbreaking $2.5M NIL partnership with Nike, marking one of the largest deals in college sports history.",
    keywords: "Livvy Dunne, Nike, NIL deal, LSU gymnastics, college sports",
    wordCount: 320,
    readingTime: 3,
    publishedAt: new Date().toISOString(),
    aiModel: 'Gemini 1.5 Flash',
    athlete: {
      name: "Livvy Dunne",
      sport: "Gymnastics",
      school: "Louisiana State University",
      position: "All-Around",
      year: "Senior"
    },
    nilDeal: {
      title: "Nike Brand Ambassador Partnership",
      dealValue: "$2.5M",
      dealType: "Endorsement",
      brand: "Nike"
    },
    tags: [
      { tag: { name: "Gymnastics", slug: "gymnastics" } },
      { tag: { name: "NIL", slug: "nil" } },
      { tag: { name: "Nike", slug: "nike" } }
    ]
  },
  {
    id: '2',
    title: "Stanford Basketball's Haley Jones Partners with Adidas for Exclusive Footwear Deal",
    content: `Stanford women's basketball star Haley Jones has signed an exclusive NIL deal with Adidas, becoming the latest high-profile college athlete to secure a major footwear partnership.

The deal, announced today, includes custom Adidas footwear, apparel collaborations, and social media partnerships. Jones will wear exclusive Adidas designs during Stanford's upcoming season.

## Rising Star Power

Jones, who led Stanford to the 2021 NCAA Championship, has emerged as one of the most recognizable faces in women's college basketball. Her combination of on-court excellence and authentic personality has attracted major brand interest.

"Haley represents the future of women's basketball," said Adidas Basketball Director Mike Torres. "Her dedication to excellence and community impact aligns perfectly with our brand values."

## Community Focus

A unique aspect of this partnership involves community outreach programs. Jones will work with Adidas to provide basketball clinics and equipment donations to underserved communities in the Bay Area.

The deal also includes performance bonuses tied to Stanford's team success and Jones' individual achievements, creating incentives aligned with her athletic goals.

## Women's Basketball Growth

This partnership reflects the growing commercial value of women's college basketball. Following the popularity of stars like Paige Bueckers and Caitlin Clark, brands are increasingly investing in women's basketball talent.

Jones expressed excitement about representing Adidas and using her platform to inspire young female athletes to pursue their basketball dreams.

The partnership also includes exclusive access to Adidas design teams, allowing Jones to provide input on future women's basketball products and colorways.

As women's college basketball continues to grow in popularity and commercial value, partnerships like this demonstrate the significant opportunities available for top female athletes in the NIL era.`,
    excerpt: "Stanford basketball star Haley Jones signs exclusive NIL deal with Adidas, featuring custom footwear and community outreach programs.",
    slug: "haley-jones-adidas-nil-deal-stanford-basketball",
    metaTitle: "Haley Jones Signs Adidas NIL Deal - Stanford Basketball Star",
    metaDescription: "Stanford women's basketball star Haley Jones signs exclusive NIL deal with Adidas, including custom footwear and community partnerships.",
    keywords: "Haley Jones, Adidas, Stanford basketball, NIL deal, women's basketball",
    wordCount: 295,
    readingTime: 3,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    aiModel: 'Gemini 1.5 Flash',
    athlete: {
      name: "Haley Jones",
      sport: "Basketball",
      school: "Stanford University",
      position: "Forward",
      year: "Senior"
    },
    nilDeal: {
      title: "Adidas Exclusive Partnership",
      dealValue: "Undisclosed",
      dealType: "Footwear & Apparel",
      brand: "Adidas"
    },
    tags: [
      { tag: { name: "Basketball", slug: "basketball" } },
      { tag: { name: "NIL", slug: "nil" } },
      { tag: { name: "Adidas", slug: "adidas" } }
    ]
  },
  {
    id: '3',
    title: "Alabama QB Bryce Young's Record NIL Portfolio Reaches $3.2 Million",
    content: `Alabama quarterback Bryce Young has reached a new milestone in college sports marketing, with his NIL deal portfolio now valued at over $3.2 million according to industry analysts.

Young's partnerships span multiple industries, from athletic apparel to luxury automotive, making him one of the highest-earning college athletes in the NIL era.

## Diverse Partnership Portfolio

His current deals include partnerships with Beats by Dre, Cash App, BMW, and regional restaurant chains. Each partnership leverages Young's authentic personality and massive social media following.

The Beats by Dre deal, worth an estimated $400,000, features Young in national advertising campaigns and custom product collaborations. His Cash App partnership includes exclusive content and fan engagement initiatives.

## Setting New Standards

Young's success has established new benchmarks for quarterback NIL valuations. His approach focuses on long-term brand building rather than short-term promotional deals.

"Bryce understands that NIL is about building sustainable partnerships," said his representative Sarah Mitchell. "Each deal aligns with his personal values and career goals."

## Impact on Alabama Football

The success of Young's NIL portfolio has elevated Alabama's recruiting profile even further. Prospective players see the potential for significant earning opportunities within the program.

Head Coach Nick Saban has embraced the NIL landscape, viewing it as an additional tool for player development and program building.

## Future Prospects

As Young prepares for the NFL Draft, his NIL success demonstrates the potential for college athletes to build significant personal brands that extend beyond their playing careers.

The quarterback's approach to NIL has become a case study for other athletes, showing how strategic partnerships can create lasting value beyond college sports.

Young's success also highlights the importance of professional representation and careful brand management in maximizing NIL opportunities while maintaining eligibility and team focus.`,
    excerpt: "Alabama quarterback Bryce Young's NIL portfolio surpasses $3.2 million, setting new standards for college athlete earning potential.",
    slug: "bryce-young-nil-portfolio-3-2-million-alabama",
    metaTitle: "Bryce Young's $3.2M NIL Portfolio - Alabama QB Sets Record",
    metaDescription: "Alabama quarterback Bryce Young's NIL portfolio reaches $3.2 million, spanning partnerships with Beats by Dre, Cash App, and BMW.",
    keywords: "Bryce Young, Alabama football, NIL portfolio, quarterback, college sports",
    wordCount: 310,
    readingTime: 3,
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    aiModel: 'Gemini 1.5 Flash',
    athlete: {
      name: "Bryce Young",
      sport: "Football",
      school: "University of Alabama",
      position: "Quarterback",
      year: "Junior"
    },
    nilDeal: {
      title: "Multi-Brand Portfolio",
      dealValue: "$3.2M",
      dealType: "Multiple Partnerships",
      brand: "Various"
    },
    tags: [
      { tag: { name: "Football", slug: "football" } },
      { tag: { name: "NIL", slug: "nil" } },
      { tag: { name: "Alabama", slug: "alabama" } }
    ]
  },
  {
    id: '4',
    title: "UConn Basketball Star Paige Bueckers Signs Exclusive Deal with Gatorade",
    content: `UConn basketball star Paige Bueckers has been named Gatorade's first-ever college basketball ambassador, marking a historic moment in both NIL history and sports marketing.

The groundbreaking partnership represents a significant milestone for women's college basketball and demonstrates Gatorade's commitment to supporting emerging athletic talent.

## Breaking New Ground

This partnership marks the first time Gatorade has created a dedicated college sports ambassador role, reflecting the growing importance of college athletics in sports marketing strategies.

"Paige embodies the spirit of determination and excellence that Gatorade represents," said Gatorade Brand Director Lisa Chen. "Her impact on women's basketball and her authentic connection with fans make her the perfect partner for this historic role."

## Platform for Change

Bueckers plans to use her partnership with Gatorade to advocate for women's sports and inspire the next generation of female athletes. The collaboration includes content creation, community engagement, and youth basketball initiatives.

The deal also includes custom Gatorade products and exclusive access to the brand's sports science team to optimize her performance and recovery.

## Women's Basketball Impact

This partnership comes at a crucial time for women's college basketball, which has seen unprecedented growth in viewership and fan engagement. Bueckers' star power has been instrumental in driving this surge.

Her social media presence and authentic personality have attracted millions of followers, making her one of the most marketable athletes in college sports.

## Looking Ahead

As Bueckers continues her college career at UConn, this partnership positions her as a leader both on and off the court. The collaboration sets a new standard for how brands can meaningfully engage with college athletics.

The success of this partnership could pave the way for similar arrangements between major brands and college athletes across all sports.`,
    excerpt: "UConn basketball star Paige Bueckers becomes Gatorade's first college basketball ambassador in groundbreaking NIL partnership.",
    slug: "paige-bueckers-gatorade-nil-deal-uconn-basketball",
    metaTitle: "Paige Bueckers Signs Historic Gatorade NIL Deal - UConn Basketball",
    metaDescription: "UConn basketball star Paige Bueckers becomes Gatorade's first college basketball ambassador in historic NIL partnership.",
    keywords: "Paige Bueckers, Gatorade, UConn basketball, NIL deal, women's basketball",
    wordCount: 285,
    readingTime: 2,
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    aiModel: 'Gemini 1.5 Flash',
    athlete: {
      name: "Paige Bueckers",
      sport: "Basketball",
      school: "University of Connecticut",
      position: "Guard",
      year: "Senior"
    },
    nilDeal: {
      title: "Gatorade Brand Ambassador",
      dealValue: "Undisclosed",
      dealType: "Sports Drink Partnership",
      brand: "Gatorade"
    },
    tags: [
      { tag: { name: "Basketball", slug: "basketball" } },
      { tag: { name: "NIL", slug: "nil" } },
      { tag: { name: "Gatorade", slug: "gatorade" } }
    ]
  },
  {
    id: '5',
    title: "Duke Basketball Phenom Paolo Banchero Partners with Under Armour",
    content: `Duke basketball star Paolo Banchero has signed a significant NIL deal with Under Armour, strengthening the brand's presence in college basketball and adding another marquee name to their roster.

The partnership comes as Banchero prepares for what many expect to be his final season at Duke before entering the NBA Draft.

## Strategic Partnership

Under Armour's deal with Banchero represents a strategic investment in one of college basketball's most promising talents. The forward has shown exceptional versatility and leadership on the court.

"Paolo represents the future of basketball," said Under Armour Basketball VP Marcus Williams. "His combination of size, skill, and basketball IQ aligns perfectly with our brand's commitment to innovation and performance."

## Performance Focus

The partnership includes access to Under Armour's cutting-edge performance technology and training resources. Banchero will work closely with the company's product development team to test and refine basketball footwear and apparel.

Custom colorways and exclusive designs will be part of the collaboration, giving Banchero input on products that will eventually reach consumers.

## Duke Connection

This deal strengthens Under Armour's existing relationship with Duke University, where the brand serves as the official athletic apparel partner. Banchero's endorsement adds another layer to this partnership.

The collaboration includes appearances at Under Armour events and participation in youth basketball camps and clinics sponsored by the brand.

## Market Impact

Banchero's signing continues Under Armour's aggressive pursuit of top college basketball talent as they compete with Nike and Adidas for market share in the basketball category.

His authentic personality and strong social media presence provide Under Armour with valuable marketing opportunities to reach younger demographics.`,
    excerpt: "Duke basketball star Paolo Banchero signs major NIL deal with Under Armour, strengthening brand's college basketball presence.",
    slug: "paolo-banchero-under-armour-nil-deal-duke-basketball",
    metaTitle: "Paolo Banchero Signs Under Armour NIL Deal - Duke Basketball",
    metaDescription: "Duke basketball star Paolo Banchero partners with Under Armour in significant NIL deal, strengthening brand's college basketball presence.",
    keywords: "Paolo Banchero, Under Armour, Duke basketball, NIL deal, college basketball",
    wordCount: 290,
    readingTime: 2,
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    aiModel: 'Gemini 1.5 Flash',
    athlete: {
      name: "Paolo Banchero",
      sport: "Basketball",
      school: "Duke University",
      position: "Forward",
      year: "Sophomore"
    },
    nilDeal: {
      title: "Under Armour Performance Partnership",
      dealValue: "Undisclosed",
      dealType: "Footwear & Apparel",
      brand: "Under Armour"
    },
    tags: [
      { tag: { name: "Basketball", slug: "basketball" } },
      { tag: { name: "NIL", slug: "nil" } },
      { tag: { name: "Under Armour", slug: "under-armour" } }
    ]
  },
  {
    id: '6',
    title: "Oregon Track Star Sydney McLaughlin Partners with New Balance",
    content: `Oregon track star Sydney McLaughlin has partnered with New Balance in a groundbreaking NIL deal that focuses on performance innovation and women's athletics empowerment.

The partnership represents New Balance's continued investment in track and field and their commitment to supporting the next generation of Olympic hopefuls.

## Innovation Partnership

McLaughlin will work directly with New Balance's research and development team to test and refine track spikes and training footwear. Her feedback will influence product design for future releases.

"Sydney's dedication to performance and innovation aligns perfectly with our brand values," said New Balance Track & Field Director Sarah Thompson. "Her insights will help us create better products for all athletes."

## Olympic Preparation

The partnership includes comprehensive support for McLaughlin's training and competition needs as she prepares for future Olympic competition. New Balance will provide custom equipment and technical support.

Access to the company's sports science team and performance analytics will help optimize her training regimen and competition preparation.

## Women's Athletics Advocacy

A significant component of this partnership involves promoting women's participation in track and field. McLaughlin will serve as a mentor and ambassador for youth athletics programs.

The collaboration includes sponsorship of high school track meets and scholarship opportunities for young female athletes.

## Technology Integration

McLaughlin will have early access to New Balance's latest performance technologies, including advanced cushioning systems and lightweight materials designed for elite competition.

Her role as a product tester will provide valuable real-world feedback for continuous improvement of athletic footwear.

## Future Impact

This partnership positions both McLaughlin and New Balance for long-term success in track and field. The collaboration extends beyond college into her professional career aspirations.

The focus on innovation and performance makes this partnership a model for how brands can meaningfully support collegiate athletes while advancing sports technology.`,
    excerpt: "Oregon track star Sydney McLaughlin partners with New Balance in groundbreaking NIL deal focused on performance innovation.",
    slug: "sydney-mclaughlin-new-balance-nil-deal-oregon-track",
    metaTitle: "Sydney McLaughlin Signs New Balance NIL Deal - Oregon Track",
    metaDescription: "Oregon track star Sydney McLaughlin partners with New Balance in NIL deal focused on performance innovation and women's athletics.",
    keywords: "Sydney McLaughlin, New Balance, Oregon track, NIL deal, track and field",
    wordCount: 305,
    readingTime: 2,
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    aiModel: 'Gemini 1.5 Flash',
    athlete: {
      name: "Sydney McLaughlin",
      sport: "Track & Field",
      school: "University of Oregon",
      position: "Sprinter/Hurdler",
      year: "Junior"
    },
    nilDeal: {
      title: "New Balance Innovation Partnership",
      dealValue: "Undisclosed",
      dealType: "Performance Footwear",
      brand: "New Balance"
    },
    tags: [
      { tag: { name: "Track & Field", slug: "track-field" } },
      { tag: { name: "NIL", slug: "nil" } },
      { tag: { name: "New Balance", slug: "new-balance" } }
    ]
  },
  {
    id: '7',
    title: "Texas Football QB Quinn Ewers Signs Multi-Platform Deal with Red Bull",
    content: `Texas quarterback Quinn Ewers has signed an innovative multi-platform NIL deal with Red Bull that goes beyond traditional sponsorship to focus on content creation and performance enhancement.

The partnership represents Red Bull's strategic entry into college football NIL deals and their commitment to supporting elite athletic performance.

## Beyond Traditional Sponsorship

This partnership differs from typical endorsement deals by emphasizing content creation and storytelling. Ewers will produce behind-the-scenes content showcasing his training regimen and game preparation.

Red Bull's expertise in action sports marketing brings a unique perspective to college football content, promising innovative and engaging material for fans.

## Performance Enhancement

The deal includes access to Red Bull's sports science team and performance nutrition specialists. Ewers will work with experts to optimize his training, recovery, and game-day preparation.

Custom nutrition plans and hydration strategies will be developed specifically for his needs as a college quarterback competing at the highest level.

## Content Creation Focus

Ewers will create exclusive content for Red Bull's digital platforms, including training videos, game analysis, and personal insights into life as a college quarterback.

The content will showcase the dedication and preparation required to compete in Big 12 football while maintaining academic excellence.

## Texas Football Connection

This partnership aligns with Texas football's return to national prominence and provides additional exposure for the program. Ewers serves as a key figure in the team's championship aspirations.

Red Bull's innovative marketing approach will bring new audiences to Texas football and showcase the program's commitment to excellence.

## Innovation in NIL

The deal represents an evolution in NIL partnerships, moving beyond simple product endorsements to comprehensive brand partnerships that benefit both athlete and sponsor.

Ewers' authentic personality and leadership qualities make him an ideal partner for Red Bull's brand values of pushing limits and achieving peak performance.

## Long-term Vision

This partnership is designed to grow with Ewers throughout his college career and potentially beyond. The focus on content creation and personal branding provides lasting value for both parties.`,
    excerpt: "Texas quarterback Quinn Ewers signs innovative multi-platform NIL deal with Red Bull focusing on content creation and performance.",
    slug: "quinn-ewers-red-bull-nil-deal-texas-football",
    metaTitle: "Quinn Ewers Signs Red Bull NIL Deal - Texas Football QB",
    metaDescription: "Texas quarterback Quinn Ewers signs innovative multi-platform NIL deal with Red Bull focusing on content creation and performance enhancement.",
    keywords: "Quinn Ewers, Red Bull, Texas football, NIL deal, college football",
    wordCount: 315,
    readingTime: 3,
    publishedAt: new Date(Date.now() - 518400000).toISOString(),
    aiModel: 'Gemini 1.5 Flash',
    athlete: {
      name: "Quinn Ewers",
      sport: "Football",
      school: "University of Texas",
      position: "Quarterback",
      year: "Sophomore"
    },
    nilDeal: {
      title: "Red Bull Multi-Platform Partnership",
      dealValue: "Undisclosed",
      dealType: "Content & Performance",
      brand: "Red Bull"
    },
    tags: [
      { tag: { name: "Football", slug: "football" } },
      { tag: { name: "NIL", slug: "nil" } },
      { tag: { name: "Red Bull", slug: "red-bull" } }
    ]
  },
  {
    id: '8',
    title: "UCLA Gymnastics Captain Nia Dennis Partners with Athleta for Empowerment Campaign",
    content: `UCLA gymnastics captain Nia Dennis has partnered with Athleta for a groundbreaking NIL deal that focuses on mental health advocacy and empowerment in women's sports.

This partnership represents Athleta's commitment to supporting female athletes who use their platforms to drive positive social change.

## Empowerment Focus

The collaboration centers on Athleta's "Power of She" campaign, which aims to empower women through sport and physical activity. Dennis will serve as a key spokesperson and advocate for the initiative.

Her personal experience with mental health challenges and advocacy work make her an authentic voice for Athleta's mission of supporting women's overall well-being.

## Mental Health Advocacy

Dennis will work with Athleta to create content and programs focused on mental health awareness in college athletics. This includes workshops, speaking engagements, and digital content.

The partnership acknowledges the unique pressures faced by college athletes and aims to provide resources and support for mental wellness.

## Creative Expression

Known for her innovative floor routines that celebrate Black culture and self-expression, Dennis will collaborate with Athleta on campaigns that showcase authenticity and creativity in sports.

Her artistic approach to gymnastics aligns with Athleta's brand values of encouraging women to express themselves confidently.

## Community Impact

The partnership includes community outreach programs in underserved areas, providing gymnastics equipment and instruction to young women who might not otherwise have access to the sport.

Dennis will personally participate in clinic sessions and mentoring programs designed to inspire the next generation of female athletes.

## Breaking Boundaries

This deal represents a new model for NIL partnerships that prioritize social impact alongside commercial value. Both Dennis and Athleta are committed to using their platforms for positive change.

The collaboration demonstrates how NIL can be leveraged to address important social issues while supporting athlete development and brand growth.

## Long-term Partnership

The relationship extends beyond Dennis's college career, with opportunities for continued collaboration as she pursues her post-graduation goals in gymnastics and advocacy work.

This partnership sets a precedent for how brands can authentically support athletes who are making a difference both in their sport and in their communities.`,
    excerpt: "UCLA gymnastics captain Nia Dennis partners with Athleta for groundbreaking NIL deal focused on empowerment and mental health advocacy.",
    slug: "nia-dennis-athleta-nil-deal-ucla-gymnastics-empowerment",
    metaTitle: "Nia Dennis Signs Athleta NIL Deal - UCLA Gymnastics Captain",
    metaDescription: "UCLA gymnastics captain Nia Dennis partners with Athleta for NIL deal focused on empowerment and mental health advocacy in women's sports.",
    keywords: "Nia Dennis, Athleta, UCLA gymnastics, NIL deal, mental health, empowerment",
    wordCount: 350,
    readingTime: 2,
    publishedAt: new Date(Date.now() - 604800000).toISOString(),
    aiModel: 'Gemini 1.5 Flash',
    athlete: {
      name: "Nia Dennis",
      sport: "Gymnastics",
      school: "University of California, Los Angeles",
      position: "All-Around",
      year: "Senior"
    },
    nilDeal: {
      title: "Athleta Empowerment Partnership",
      dealValue: "Undisclosed",
      dealType: "Advocacy & Empowerment",
      brand: "Athleta"
    },
    tags: [
      { tag: { name: "Gymnastics", slug: "gymnastics" } },
      { tag: { name: "NIL", slug: "nil" } },
      { tag: { name: "Athleta", slug: "athleta" } },
      { tag: { name: "Mental Health", slug: "mental-health" } }
    ]
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // Try to get from database first
    try {
      const article = await db.getArticleBySlug(slug)
      if (article) {
        return NextResponse.json(article)
      }
    } catch (dbError) {
      console.log('Database error, trying sample data:', dbError)
    }

    // Fallback to sample data
    const sampleArticle = sampleArticles.find(article => article.slug === slug)
    
    if (!sampleArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    console.log(`Returning sample article: ${sampleArticle.title}`)
    return NextResponse.json(sampleArticle)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 