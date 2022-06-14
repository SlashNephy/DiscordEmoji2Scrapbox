import dotenv from 'dotenv'

dotenv.config()

export const env = process.env as {
  DISCORD_TOKEN: string
  DISCORD_GUILD_ID: string
  SCRAPBOX_PROJECT_NAME: string
  SYNC_EMOJIS?: string
  SYNC_STICKERS?: string
}
