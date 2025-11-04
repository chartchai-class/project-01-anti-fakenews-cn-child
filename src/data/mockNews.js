const reporters = ['Alex Chen', 'Mia Wang', 'Leo Zhang', 'Sophie Lin', 'Jason Wu', 'Nina Gao', 'Eric Sun', 'Grace Li']
const places = ['National Stadium', 'City Arena', 'Olympic Sports Center', 'Riverside Stadium', 'Metro Dome', 'University Athletic Field', 'Eastside Arena', 'Central Sports Park']

// 多领域支持
const domains = ['sports', 'music', 'gaming', 'weather', 'economics', 'anime', 'drama']
const domainClaims = {
  sports: [
    'star player transfer confirmed',
    'match-fixing investigation launched',
    'season-ending injury to key player',
    'head coach resignation mid-season',
    'title revoked due to doping',
    'game cancellation due to extreme weather',
    'VAR controversy deciding late penalty',
    'record-breaking performance disputed'
  ],
  music: [
    'stadium concert cancellation confirmed',
    'artist departure mid-tour',
    'lip-sync scandal surfaces',
    'label drops artist abruptly',
    'fake ticketing scam reported',
  ],
  gaming: [
    'AAA release delayed indefinitely',
    'studio closure rumor spreading',
    'e-sports match-fixing investigation',
    'loot box ban rumored in region',
    'lead developer resignation controversy',
  ],
  weather: [
    'city-wide shutdown due to typhoon',
    'bridge closure after flooding',
    'record heatwave cancels events',
    'snowstorm halts metro services',
    'emergency water contamination alert',
  ],
  economics: [
    'market crash imminent rumor',
    'new tax policy announced secretly',
    'company insolvency filing leaked',
    'interest rate shock incoming',
    'currency devaluation rumor spreads',
  ],
  anime: [
    'production delay officially announced',
    'cast change confirmed mid-season',
    'season cancellation rumor',
    'licensing dispute pulls episodes',
    'director resignation mid-project',
  ],
  drama: [
    'series cancelled by network',
    'lead actor departure confirmed',
    'ratings manipulation scandal',
    'finale reshoot rumor spreading',
    'spin-off confirmed then denied',
  ]
}

function makeDetail(i, place, claim, domain) {
  const ref1 = `https://example.com/official/${i}`
  const ref2 = `https://example.com/media/${i}`
  const ref3 = `https://example.com/social/${i}`
  return (
    `Summary: A rumor of "${claim}" at ${place} is spreading across communities and social platforms in the ${domain} domain. Conflicting or incomplete information requires careful verification.

Background: The rumor appears to have originated on community forums and was amplified by aggregator accounts. Unverified photos and short clips were attached without proper context.

Online narratives: Some posts claim "official confirmation" or describe the situation as "chaotic"; others suggest "investigations underway". These statements often lack reliable sourcing, timelines, and official references.

Verified information: According to official channels and professional media, scheduled activities at ${place} continue normally. No evidence matches the alleged scale. Several circulating clips seem to be from past events.

Eyewitness quote: "Operations looked routine at the site, and staff were in place. I didn’t see anything unusual," said a local attendee near the venue.

References (examples): official statement (${ref1}), professional media report (${ref2}), original posts and corrections (${ref3}).

Guidance: Cross-check multiple credible sources and avoid conclusions drawn from isolated clips or posts.`)
}

function makeCaseDetails(i, cityNum, place, claim, reportedAt) {
  const date = new Date(reportedAt)
  const baseTime = date.getTime()
  const step = 15 * 60 * 1000 // 15 minutes
  const timeFmt = (t) => new Date(t).toLocaleString()
  return {
    location: {
      city: `City ${cityNum}`,
      venue: place,
      coordinates: 'N/A',
    },
    timeline: [
      { time: timeFmt(baseTime - step * 4), event: `First posts about "${claim}" appear on community forums.` },
      { time: timeFmt(baseTime - step * 3), event: 'Aggregator accounts share clips without full context.' },
      { time: timeFmt(baseTime - step * 2), event: `Photos or short videos from ${place} circulate.` },
      { time: timeFmt(baseTime - step), event: 'Official channels publish an update clarifying status.' },
      { time: timeFmt(baseTime), event: 'Initial report recorded and verification begins.' },
    ],
    authorityActions: [
      `Official notice clarifies operations at ${place}.`,
      'Professional media denies unconfirmed claims after fact-checking.',
      'Community volunteers publish corrections and context.',
    ],
    involvedParties: ['Official agencies', 'Organizers', 'Attendees', 'Media'],
    riskLevel: 'Low',
    verificationNotes: [
      'Several screenshots originate from past seasons and unrelated events.',
      'No official statements confirming the claim were issued by responsible authorities.',
      'Trusted reporters indicate the rumor is premature or misleading.',
    ],
    tags: ['multi-domain', 'rumor verification', claim, place],
  }
}

function makeItem(i) {
  const id = `n${i}`
  const cityNum = 10 + i
  const place = places[i % places.length]
  const domain = domains[i % domains.length]
  const domainList = domainClaims[domain]
  const claim = domainList[i % domainList.length]
  const topic = `Claim · ${domain} · ${place}: "${claim}" #${i}`
  const shortDetail = `Rumor: "${claim}" at ${place} (${domain}). Conflicting accounts; verify against official and professional media statements.`
  const detail = makeDetail(i, place, claim, domain)
  const reporter = reporters[i % reporters.length]
  const reportedAt = new Date(Date.now() - i * 36e5).toISOString() // staggered by hours
  const imageUrl = `https://picsum.photos/seed/${id}/640/360`
  const fakeBase = (i * 3) % 9
  const notFakeBase = (i * 2) % 9
  const mockVotes = { fake: fakeBase, notFake: notFakeBase }

  const mockComments = Array.from({ length: 24 + (i % 12) }).map((_, idx) => ({
    text: `Observation ${idx + 1}: Regarding "${claim}", perspectives differ. Please review official notices and multi-source evidence before judging authenticity.`,
    imageUrl: idx % 3 === 0 ? `https://picsum.photos/seed/${id}-${idx}/400/240` : '',
    isFake: idx % 2 === 0,
    author: reporters[(i + idx) % reporters.length],
    time: new Date(Date.now() - (i * 36e5) - idx * 18e5).toISOString(),
  }))

  const sources = [
    { title: `Official statement #${i}`, url: `https://example.com/official/${i}`, type: 'official' },
    { title: `Professional media report #${i}`, url: `https://example.com/media/${i}`, type: 'media' },
    { title: `Original posts & corrections #${i}`, url: `https://example.com/social/${i}`, type: 'social' },
  ]

  const caseDetails = makeCaseDetails(i, cityNum, place, claim, reportedAt)

  return { id, domain, topic, shortDetail, detail, reporter, reportedAt, imageUrl, mockVotes, mockComments, sources, caseDetails }
}

export const mockNews = Array.from({ length: 300 }).map((_, i) => makeItem(i + 1))