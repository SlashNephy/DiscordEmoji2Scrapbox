import { REST } from '@discordjs/rest'
import { APIEmoji, APISticker, Routes } from 'discord-api-types/v10'
import { exec } from 'child_process'
import { setTimeout } from 'timers/promises'
import dotenv from 'dotenv'

dotenv.config()
const env = process.env as {
  DISCORD_TOKEN: string
  DISCORD_GUILD_ID: string
  SCRAPBOX_PROJECT_NAME: string
  SYNC_EMOJIS?: string
  SYNC_STICKERS?: string
}

const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN)

const fetchGuildEmojis = async (guildId: string): Promise<APIEmoji[]> => {
  const emojis = await rest.get(Routes.guildEmojis(guildId))
  return emojis as APIEmoji[]
}

const fetchGuildStickers = async (guildId: string): Promise<APISticker[]> => {
  const stickers = await rest.get(Routes.guildStickers(guildId))
  return stickers as APISticker[]
}

const convertEmoji = (emoji: APIEmoji): string => {
  const url = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'webp'}?quality=lossless`
  const body = `[${url}]\n\n#DiscordEmoji\n`
  
  return `https://scrapbox.io/${env.SCRAPBOX_PROJECT_NAME}/${encodeURIComponent(emoji.name!)}?body=${encodeURIComponent(body)}`
}

const convertSticker = (sticker: APISticker): string => {
  const url = `https://media.discordapp.net/stickers/${sticker.id}.webp?size=160`
  const body = `[${url}]\n\n#DiscordSticker\n`
  
  return `https://scrapbox.io/${env.SCRAPBOX_PROJECT_NAME}/${encodeURIComponent(sticker.name)}?body=${encodeURIComponent(body)}`
}

const openScrapboxUrl = async (url: string) => {
  await setTimeout(100)
  await exec(`open ${url}`)
}

if (env.SYNC_EMOJIS) {
  fetchGuildEmojis(env.DISCORD_GUILD_ID)
    .then(emojis => emojis.map(convertEmoji))
    .then(urls => {
      for (const url of urls) {
        openScrapboxUrl(url).then(() => console.log(url))
      }
    })
}

if (env.SYNC_STICKERS) {
  fetchGuildStickers(env.DISCORD_GUILD_ID)
    .then(stickers => stickers.map(convertSticker))
    .then(urls => {
      for (const url of urls) {
        openScrapboxUrl(url).then(() => console.log(url))
      }
    })
}
