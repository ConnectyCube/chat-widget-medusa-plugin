# Medusa 2.0 chat widget plugin 

Medusa 2.0 plugin to integrate Chat Widget for seller/buyer communication

## Features

- **Easy Integration:**
  - Quickly plug the widget into your current web app with minimal setup.
  - No need to handle backend infrastructure — ConnectyCube takes care of it.
- **Customizable Interface:**
  - Tailor the look and feel of the widget to match your brand identity.
  - Modify styles, layout, and behavior to fit your UI/UX needs.
- **Real-time Messaging:**
  - Enjoy fast and reliable message delivery using ConnectyCube’s robust backend services.
  - Support for private and group chat.
- **Responsive Design:**
  - Fully functional across all devices — desktops, tablets, and mobile phones.
  - Optimized for various screen sizes and orientations.
- **Modular and Extensible:**
  - Adapt the widget’s functionality to meet your specific business requirements.
  - Extend core features with custom logic and plugins.
- **User Presence:**
  - Display online/offline indicators for users in real time.
  - Enhance user experience with presence-aware features.
- **File Sharing:**
  - Easily send and receive files, images, and other attachments during chat sessions.

## Installation

1.  Add plugin:

    ```
    yarn add @connectycube/chat-widget-medusa-plugin
    ```

2.  Add the following variables to your `.env` file:

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
                    include: ["qs", "eventemitter3", "@xmpp/iq/callee", "@xmpp/resolve", "@xmpp/session-establishment", "@xmpp/client-core", "@xmpp/sasl-plain", "@xmpp/stream-features", "@xmpp/   resource-binding", "@xmpp/reconnect", "@xmpp/middleware", "@xmpp/sasl-anonymous", "@xmpp/websocket", "@xmpp/iq/caller", "@xmpp/sasl"], // Will be merged with config that we use to run and build the dashboard.
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

## DOCS

- https://developers.connectycube.com/js/chat-widget

## License

Apache 2.0
