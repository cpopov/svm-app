export const siteName = 'SVM'
export const siteOverview = 'Turn Sports Knowledge into Profit'
export const siteBasePath = 'https://www.sportvalue.app/'
export const siteKeywords = `
Crypto Athlete Tokens, Sports Performance Tokens, Athlete-Based Crypto Investments, Sports Tokenization Platform, Tokenized Athlete Performance Rewards, Blockchain Sports Tokens, Sports Investment Crypto, Athlete Token Airdrops, DAO Regulated Sports Tokens, Web3 Sports Investment, Football Crypto Tokens, Basketball Player Tokens, Cricket Athlete Tokens, Tokenized Football Performance, Basketball Crypto Trading, Cricket Sports Tokens, Free Crypto Airdrops, Join Crypto Sports DAO, Web3 Sports Community, Decentralized Sports Tokens, DAO Governance in Sports, Earn Rewards with Athlete Tokens, Performance-Based Crypto Rewards, Trade Athlete Tokens for Profit, Passive Income with Athlete Tokens, Sports Token Profitability, Web3 Sports Protocol, Blockchain-Based Sports Tokens, Decentralized Finance in Sports, Smart Contracts for Athletes, Crypto Trading for Sports Fans, Buy Athlete Tokens, Trade Sports Tokens Online, Invest in Athlete Performance, Real-Time Athlete Token Trading, Manage Athlete Tokens Portfolio.`

export const userNavLinks = [
  // {
  //   title: 'Home',
  //   path: '/'
  // },
  {
    title: 'MARKET',
    path: '/'
  },
  // {
  //   title: 'Rank',
  //   path: '/rank'
  // },
  {
    title: 'PORTFOLIO',
    path: '/portfolio'
  }
]
export const guestNavLinks = [
  {
    title: 'MARKET',
    path: '/'
  }
]
export const FooterLinks = [
  {
    title: '',
    path: '/'
  },
  {
    title: '',
    path: '/'
  },
  {
    title: 'Privacy policy',
    path: '/'
  }
]

export const sports = [
  { key: 'Football', value: 'football', icon: '/soccer.svg' },
  { key: 'Basketball', value: 'basketball', icon: '/soccer.svg' },
  { key: 'Cricket', value: 'cricket', icon: '/soccer.svg' }
]
export function getSportIcon(value) {
  const sport = sports.find(sport => sport.value === value)
  return sport ? sport.icon : '/soccer.svg' // Return null if no match is found
}
