# DiscordEmoji2Scrapbox

Discord サーバーに登録されている絵文字を Scrapbox に追加するだけのスクリプトです。

ただし、ページの作成処理はスクリプト内で行っておらず、絵文字の数だけ **大量にブラウザのタブ** が開きます。  
参照: [ページを作る - Scrapbox ヘルプ](https://scrapbox.io/help-jp/%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%92%E4%BD%9C%E3%82%8B#58ae7c9a97c29100005b886b)

**このスクリプトを迷惑行為に使用しないでください。このスクリプトを使用して損害について一切の責任を負いません。(MIT ライセンス)**

## Format

ページは次のようなフォーマットで作成されるようになっています。

- ページタイトル
  - 絵文字の名前 (e.g. `jager`)
- 本文
  ```
  [https://cdn.discordapp.com/emojis/716242541460062332.png]

  #DiscordEmoji
  ```

Scrapbox からは `[jager.icon]` で絵文字を呼び出せるようになります。

## Get Started

環境変数をいい感じにします。

```console
$ code .env
```

```dotenv
DISCORD_TOKEN=xxx
DISCORD_GUILD_ID=xxx
SCRAPBOX_PROJECT_NAME=xxx
SYNC_EMOJIS=1
SYNC_STICKERS=1
```

yarn または npm で起動します。

```console
$ yarn
$ yarn start
```
