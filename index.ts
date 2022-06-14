import { exec } from 'child_process'
import { setTimeout } from 'timers/promises'

import { Routes } from 'discord-api-types/v10'

import { rest } from './lib/discord'
import { env } from './lib/env'

import type { APIEmoji, APISticker } from 'discord-api-types/v10'

const fetchGuildEmojis = async (guildId: string): Promise<APIEmoji[]> => {
  const emojis = await rest.get(Routes.guildEmojis(guildId))
  return emojis as APIEmoji[]
}

const fetchGuildStickers = async (guildId: string): Promise<APISticker[]> => {
  const stickers = await rest.get(Routes.guildStickers(guildId))
  return stickers as APISticker[]
}

const convertEmoji = (emoji: APIEmoji): string => {
  const url = `https://cdn.discordapp.com/emojis/${emoji.id}.${
    emoji.animated ? 'gif' : 'webp'
  }?quality=lossless`
  const body = `[${url}]\n\n#DiscordEmoji\n`

  return `https://scrapbox.io/${env.SCRAPBOX_PROJECT_NAME}/${encodeURIComponent(
    emoji.name!
  )}?body=${encodeURIComponent(body)}`
}

const convertSticker = (sticker: APISticker): string => {
  const url = `https://media.discordapp.net/stickers/${sticker.id}.webp?size=160`
  const body = `[${url}]\n\n#DiscordSticker\n`

  return `https://scrapbox.io/${env.SCRAPBOX_PROJECT_NAME}/${encodeURIComponent(
    sticker.name
  )}?body=${encodeURIComponent(body)}`
}

const openScrapboxUrl = async (url: string) => {
  await setTimeout(100)
  exec(`open ${url}`)
}

if (env.SYNC_EMOJIS) {
  void fetchGuildEmojis(env.DISCORD_GUILD_ID)
    .then((emojis) => emojis.map(convertEmoji))
    .then(async (urls) => {
      for (const url of urls) {
        await openScrapboxUrl(url).then(() => console.log(url))
      }
    })
}

if (env.SYNC_STICKERS) {
  void fetchGuildStickers(env.DISCORD_GUILD_ID)
    .then((stickers) => stickers.map(convertSticker))
    .then(async (urls) => {
      for (const url of urls) {
        await openScrapboxUrl(url).then(() => console.log(url))
      }
    })
}
