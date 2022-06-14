import { REST } from '@discordjs/rest'

import { env } from './env'

export const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN)
