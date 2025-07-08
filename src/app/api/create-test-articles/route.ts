import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('🧪 Creating test articles for homepage display...')

    // Sample test articles data - 8 articles total
    const testArticles = [
      {
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
        wordCount: 285,
        readingTime: 2,
        published: true,
        publishedAt: new Date().toISOString(),
        aiGenerated: true,
        aiModel: 'test-generation'
      },
      {
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
        wordCount: 267,
        readingTime: 2,
        published: true,
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        aiGenerated: true,
        aiModel: 'test-generation'
      },
      {
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
        wordCount: 275,
        readingTime: 2,
        published: true,
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        aiGenerated: true,
        aiModel: 'test-generation'
      },
      {
        title: "UConn Basketball Star Paige Bueckers Signs Exclusive Deal with Gatorade",
        content: `University of Connecticut basketball sensation Paige Bueckers has inked a major NIL deal with Gatorade, becoming the sports drink giant's first college basketball ambassador.

The partnership marks a significant milestone for women's college basketball and demonstrates Gatorade's commitment to supporting emerging female athletes. Bueckers will feature in national advertising campaigns and develop signature hydration products.

## Breaking Barriers

As one of the most recognizable faces in women's college basketball, Bueckers brings exceptional value to the Gatorade brand. Her dynamic playing style and authentic personality have earned her millions of fans nationwide.

"Paige represents the next generation of basketball excellence," said Gatorade Brand Manager Lisa Chen. "Her dedication to the game and inspiring leadership make her the perfect ambassador for our brand."

## Product Development

The partnership includes collaborative development of new Gatorade products specifically designed for basketball performance. Bueckers will work with the company's sports science team to create innovative hydration solutions.

Her input will help shape products that address the unique demands of basketball training and competition, benefiting athletes at all levels.

## Cultural Impact

This deal reflects the growing recognition of women's college basketball as a major commercial force. Following the success of the NCAA Women's Tournament, brands are increasingly investing in female basketball talent.

Bueckers' partnership with Gatorade sets a new standard for NIL deals in women's sports and opens doors for future female athletes.`,
        excerpt: "UConn basketball star Paige Bueckers becomes Gatorade's first college basketball ambassador in groundbreaking NIL partnership.",
        slug: "paige-bueckers-gatorade-nil-deal-uconn-basketball",
        wordCount: 245,
        readingTime: 2,
        published: true,
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        aiGenerated: true,
        aiModel: 'test-generation'
      },
      {
        title: "Duke Basketball Phenom Paolo Banchero Partners with Under Armour",
        content: `Duke basketball freshman Paolo Banchero has signed a lucrative NIL deal with Under Armour, joining the brand's elite roster of college basketball athletes.

The 6'10" forward, projected as a top NBA Draft pick, will represent Under Armour throughout his college career and beyond. The partnership includes custom footwear, apparel collaborations, and marketing campaigns.

## Rising Star Power

Banchero's combination of size, skill, and basketball IQ has made him one of the most sought-after prospects in college basketball. His versatile playing style and professional demeanor have attracted major brand interest.

"Paolo embodies the values we champion at Under Armour," said Basketball Marketing Director Mike Rodriguez. "His work ethic and commitment to excellence align perfectly with our brand mission."

## Performance Focus

The partnership emphasizes performance enhancement and innovation. Banchero will work with Under Armour's design team to develop basketball products that meet the demands of elite competition.

His feedback will help create footwear and apparel that benefits players at all levels, from youth leagues to professional basketball.

## Duke Connection

This deal strengthens Under Armour's relationship with Duke University, where the brand has been the official athletic apparel provider since 2015. Banchero's partnership adds significant star power to this existing relationship.

Duke Head Coach Mike Krzyzewski praised the partnership, noting how it provides valuable experience for Banchero in managing his personal brand.

## Future Prospects

As Banchero prepares for a potential NBA career, this NIL deal provides important experience in brand management and professional partnerships.`,
        excerpt: "Duke basketball star Paolo Banchero signs major NIL deal with Under Armour, strengthening brand's college basketball presence.",
        slug: "paolo-banchero-under-armour-nil-deal-duke-basketball",
        wordCount: 268,
        readingTime: 2,
        published: true,
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        aiGenerated: true,
        aiModel: 'test-generation'
      },
      {
        title: "Oregon Track Star Sydney McLaughlin Partners with New Balance",
        content: `University of Oregon track and field sensation Sydney McLaughlin has announced a major NIL partnership with New Balance, marking the brand's entry into college track and field sponsorship.

The world record holder in the 400-meter hurdles will collaborate with New Balance on performance footwear and training apparel designed specifically for track athletes.

## Record-Breaking Athlete

McLaughlin's incredible achievements on the track have made her one of the most marketable athletes in college sports. Her recent world record performance has elevated her profile significantly.

"Sydney represents the pinnacle of athletic achievement," said New Balance Track Director Sarah Williams. "Her dedication to pushing boundaries aligns with our commitment to innovation."

## Product Innovation

The partnership focuses on developing cutting-edge track and field equipment. McLaughlin will work directly with New Balance engineers to create spikes and training shoes that enhance performance.

Her expertise in hurdles technique and sprint mechanics will inform product development that benefits track athletes worldwide.

## Oregon Legacy

This deal builds on Oregon's rich tradition in track and field excellence. The University of Oregon has produced numerous Olympic champions and world record holders.

Track and Field Head Coach Robert Johnson expressed enthusiasm about the partnership and its potential to inspire other Oregon athletes.

## Olympic Preparation

As McLaughlin prepares for the upcoming Olympics, this partnership provides crucial support for her training and competition needs. The collaboration will continue as she pursues Olympic gold.`,
        excerpt: "Oregon track star Sydney McLaughlin partners with New Balance in groundbreaking NIL deal focused on performance innovation.",
        slug: "sydney-mclaughlin-new-balance-nil-deal-oregon-track",
        wordCount: 251,
        readingTime: 2,
        published: true,
        publishedAt: new Date(Date.now() - 432000000).toISOString(),
        aiGenerated: true,
        aiModel: 'test-generation'
      },
      {
        title: "Texas Football QB Quinn Ewers Signs Multi-Platform Deal with Red Bull",
        content: `University of Texas quarterback Quinn Ewers has inked an innovative NIL deal with Red Bull that spans multiple platforms and includes content creation, training support, and lifestyle partnerships.

The dynamic partnership leverages Ewers' leadership on the field and authentic personality off the field to create compelling content for Red Bull's diverse audience.

## Next-Level Partnership

This deal goes beyond traditional endorsement agreements, incorporating content creation, training optimization, and lifestyle elements that showcase Ewers' complete athletic journey.

"Quinn embodies the energy and determination that Red Bull represents," said Red Bull Sports Marketing Director Alex Thompson. "His approach to football and life perfectly aligns with our brand values."

## Content Creation Focus

A major component of the partnership involves creating exclusive content that provides behind-the-scenes access to Ewers' training, preparation, and game day experiences.

The content will be distributed across Red Bull's extensive digital platforms, reaching millions of sports fans and energy drink consumers.

## Performance Enhancement

Red Bull's sports science team will work with Ewers to optimize his training and nutrition programs. This collaboration aims to enhance his on-field performance while supporting his overall athletic development.

The partnership includes access to Red Bull's state-of-the-art training facilities and performance analysis tools.

## Texas Football Impact

This high-profile partnership elevates the profile of Texas football and demonstrates the program's appeal to major national brands.

Head Coach Steve Sarkisian praised the deal as an example of how NIL can benefit both student-athletes and the broader program.`,
        excerpt: "Texas quarterback Quinn Ewers signs innovative multi-platform NIL deal with Red Bull focusing on content creation and performance.",
        slug: "quinn-ewers-red-bull-nil-deal-texas-football",
        wordCount: 259,
        readingTime: 2,
        published: true,
        publishedAt: new Date(Date.now() - 518400000).toISOString(),
        aiGenerated: true,
        aiModel: 'test-generation'
      },
      {
        title: "UCLA Gymnastics Captain Nia Dennis Partners with Athleta for Empowerment Campaign",
        content: `UCLA gymnastics team captain Nia Dennis has signed an inspiring NIL deal with Athleta that focuses on empowering young female athletes and promoting body positivity in sports.

The partnership celebrates Dennis' advocacy for athlete mental health and her efforts to create inclusive spaces in gymnastics and broader athletic communities.

## Empowerment Focus

This unique partnership emphasizes social impact alongside athletic performance. Dennis will work with Athleta to develop programs that support young female athletes' mental health and self-confidence.

"Nia's commitment to empowering others makes her an ideal partner," said Athleta Brand Director Jennifer Martinez. "Her authentic voice and positive influence align with our mission to inspire confidence in all women."

## Mental Health Advocacy

A significant component of the partnership involves mental health awareness and support programs for student-athletes. Dennis will help develop resources and content that address the unique pressures facing college athletes.

Her personal experiences and insights will inform programs designed to support athlete wellbeing at all levels of competition.

## Creative Expression

The partnership also celebrates Dennis' creative expression through her viral floor routines that have garnered millions of social media views and mainstream media attention.

Athleta will support Dennis in continuing to push creative boundaries while maintaining her focus on gymnastics excellence.

## UCLA Pride

This partnership strengthens UCLA's reputation as a program that develops well-rounded student-athletes who make positive impacts beyond competition.

Gymnastics Head Coach Valorie Kondos Field praised Dennis' ability to use her platform for positive change and inspiring others.`,
        excerpt: "UCLA gymnastics captain Nia Dennis partners with Athleta for groundbreaking NIL deal focused on empowerment and mental health advocacy.",
        slug: "nia-dennis-athleta-nil-deal-ucla-gymnastics-empowerment",
        wordCount: 264,
        readingTime: 2,
        published: true,
        publishedAt: new Date(Date.now() - 604800000).toISOString(),
        aiGenerated: true,
        aiModel: 'test-generation'
      }
    ]

    let successCount = 0
    
    // Insert test articles
    for (const article of testArticles) {
      try {
        const { data, error } = await supabase
          .from('Article')
          .insert(article)
          .select()
          .single()

        if (error) {
          console.log(`⚠️ Could not insert article "${article.title}":`, error.message)
        } else {
          console.log(`✅ Created test article: "${article.title}"`)
          successCount++
        }
      } catch (insertError) {
        console.log(`⚠️ Error inserting article "${article.title}":`, insertError)
      }
    }

    // Get current article count
    const { data: articles, error: countError } = await supabase
      .from('Article')
      .select('*')
      .eq('published', true)
      .order('publishedAt', { ascending: false })

    if (countError) {
      console.log('⚠️ Error counting articles:', countError)
    }

    return NextResponse.json({
      success: true,
      message: `${successCount} test articles created successfully!`,
      data: {
        articlesCreated: successCount,
        totalArticles: articles?.length || 0,
        articles: articles?.slice(0, 8) || []
      }
    })

  } catch (error) {
    console.error('❌ Error creating test articles:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test Article Generator',
    endpoint: '/api/create-test-articles',
    method: 'POST',
    description: 'Creates sample articles for homepage display testing'
  })
} 