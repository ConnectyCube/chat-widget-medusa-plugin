# Medusa 2.0 chat widget plugin 

Medusa 2.0 plugin to integrate Chat Widget for seller/buyer communication

## Features

- **Easy Integration**
  - Simple script to copy-paste on your website, no coding required
  - No need to handle backend infrastructure — ConnectyCube takes care of it
- **Superior feature set**
  - Not just another basic chat widget - it's a complete chat system!
- **Customizable UI**
  - Modify colors, themes, and layout to match your brand’s design
- **Real-time Messaging**
  - Smooth, instant communication with no delays
- **Moderation tools**
  - Keep chats safe with message filtering, user bans, and admin controls
- **Multimedia support**
  - Send images, files, and emojis for richer conversations

## Installation

1. Add plugin to your Medusa 2.0 core app:

    ```
    yarn add @connectycube/chat-widget-medusa-plugin
    ```

2. Create [ConnectyCube account](https://connectycube.com/signup/) and application, obtain credentials

3. Add the following variables to your `.env` file:

    ```
    VITE_BACKEND_URL=http://localhost:9000
    VITE_CHAT_APP_ID=<YOUR CONNECTYCUBE APP ID>
    VITE_CHAT_AUTH_KEY=<YOUR CONNECTYCUBE AUTH KEY>
    ```

    - `VITE_BACKEND_URL` - The URL of your Medusa backend, required for custom admin components.
    - `VITE_CHAT_APP_ID` - This is essential for authenticating your application with the ConnectyCube platform and accessing its chat services.
    - `VITE_CHAT_AUTH_KEY` - This key is used to authorize your application and ensure secure communication with the ConnectyCube SDK.

3.  Add the following code to your `medusa-config.ts` file:

    ```typescript
      module.exports = defineConfig({
      admin: {
        vite: () => {
            return {
                optimizeDeps: {
                    include: ["qs", "eventemitter3", "@xmpp/iq/callee", "@xmpp/resolve", "@xmpp/session-establishment", "@xmpp/client-core", "@xmpp/sasl-plain", "@xmpp/stream-features", "@xmpp/resource-binding", "@xmpp/reconnect", "@xmpp/middleware", "@xmpp/sasl-anonymous", "@xmpp/websocket", "@xmpp/iq/caller", "@xmpp/sasl"], // Will be merged with config that we use to run and build the dashboard.
                },
            };
        },
      },
      projectConfig: { ... },
      plugins: [
        {
          resolve: "@connectycube/chat-widget-medusa-plugin",
          options: {},
        },
      ],
    })
    ```

    This code connect plugin and helps to resolve an issue similar to [https://github.com/medusajs/medusa/issues/11248](https://github.com/medusajs/medusa/issues/11248).

4.  Start the project:

    ```bash
    yarn dev
    ```

## How can I use it?

## DOCS

- https://developers.connectycube.com/js/chat-widget

## License

Apache 2.0
