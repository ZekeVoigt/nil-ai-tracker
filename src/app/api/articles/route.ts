import { NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

// Sample articles data for fallback
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

This partnership sets a new standard for NIL deals in Olympic sports and demonstrates the evolving landscape of college athletics marketing. As NIL continues to mature, deals like this show the potential for athletes across all sports to benefit from their personal brands.`,
    excerpt: "LSU gymnastics star Livvy Dunne announces record-breaking $2.5M NIL partnership with Nike, setting new standards for Olympic sports marketing.",
    slug: "livvy-dunne-nike-nil-deal-lsu-gymnastics",
    metaTitle: "Livvy Dunne Signs $2.5M Nike NIL Deal - LSU Gymnastics Star",
    metaDescription: "LSU gymnastics sensation Livvy Dunne announces groundbreaking $2.5M NIL partnership with Nike, marking one of the largest deals in college sports history.",
    keywords: "Livvy Dunne, Nike, NIL deal, LSU gymnastics, college sports",
    wordCount: 285,
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

Jones expressed excitement about representing Adidas and using her platform to inspire young female athletes to pursue their basketball dreams.`,
    excerpt: "Stanford basketball star Haley Jones signs exclusive NIL deal with Adidas, featuring custom footwear and community outreach programs.",
    slug: "haley-jones-adidas-nil-deal-stanford-basketball",
    metaTitle: "Haley Jones Signs Adidas NIL Deal - Stanford Basketball Star",
    metaDescription: "Stanford women's basketball star Haley Jones signs exclusive NIL deal with Adidas, including custom footwear and community partnerships.",
    keywords: "Haley Jones, Adidas, Stanford basketball, NIL deal, women's basketball",
    wordCount: 267,
    readingTime: 2,
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

As Young prepares for the NFL Draft, his NIL success demonstrates the potential for college athletes to build significant personal brands that extend beyond their playing careers.`,
    excerpt: "Alabama quarterback Bryce Young's NIL portfolio surpasses $3.2 million, setting new standards for college athlete earning potential.",
    slug: "bryce-young-nil-portfolio-3-2-million-alabama",
    metaTitle: "Bryce Young's $3.2M NIL Portfolio - Alabama QB Sets Record",
    metaDescription: "Alabama quarterback Bryce Young's NIL portfolio reaches $3.2 million, spanning partnerships with Beats by Dre, Cash App, and BMW.",
    keywords: "Bryce Young, Alabama football, NIL portfolio, quarterback, college sports",
    wordCount: 275,
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
    content: `UConn basketball star Paige Bueckers has been named Gatorade's first-ever college basketball ambassador...`,
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
    content: `Duke basketball star Paolo Banchero has signed a significant NIL deal with Under Armour...`,
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
    content: `Oregon track star Sydney McLaughlin has partnered with New Balance in a groundbreaking NIL deal...`,
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
    content: `Texas quarterback Quinn Ewers has signed an innovative multi-platform NIL deal with Red Bull...`,
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
    content: `UCLA gymnastics captain Nia Dennis has partnered with Athleta for a groundbreaking NIL deal...`,
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

export async function GET() {
  try {
    const articles = await db.getAllArticles()
    
    // If database returns empty or has issues, return sample data
    if (!articles || articles.length === 0) {
      console.log('Database empty, returning sample articles')
      return NextResponse.json(sampleArticles)
    }
    
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles, returning sample data:', error)
    return NextResponse.json(sampleArticles)
  }
} 