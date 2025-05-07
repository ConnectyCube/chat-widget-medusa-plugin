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

### Backend

1. Add plugin to your Medusa 2.0 core app:

    ```
    yarn add @connectycube/chat-widget-medusa-plugin
    ```

2.  Create ConnectyCube account [https://connectycube.com/signup](https://connectycube.com/signup/) and application, obtain credentials

<img width="800" alt="Screenshot 2025-05-07 at 15 19 59" src="https://github.com/user-attachments/assets/77995af3-eb65-4559-8939-e3cc36104862" />


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
        vite: (config) => {
            config.define["__VITE_CHAT_APP_ID__"] = JSON.stringify(process.env.VITE_CHAT_APP_ID);
            config.define["__VITE_CHAT_AUTH_KEY__"] = JSON.stringify(process.env.VITE_CHAT_AUTH_KEY);
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

### Storefront

1. Add chat widget to your Storefront app:

    ```
    yarn add @connectycube/chat-widget
    ```

2. Add the following variables to your `.env` file:

    ```
    NEXT_PUBLIC_CHAT_APP_ID=<YOUR CONNECTYCUBE APP ID>
    NEXT_PUBLIC_CHAT_AUTH_KEY=<YOUR CONNECTYCUBE AUTH KEY>
    NEXT_PUBLIC_STORE_ID=<YOUR MEDUSA STORE ID>
    NEXT_PUBLIC_STORE_NAME=<YOUR MEDUSA STORE NAME>
    ```
    
3. Create `src/ChatWidget.tsx` component with the following content:

   ```typescript
   "use client"

   import React, { useEffect, useState } from "react"
   import ConnectyCubeChatWidget from "@connectycube/chat-widget/react19"
   import { StoreCustomer, StoreProduct } from "@medusajs/types"
    
   export interface ChatWidgetProps {
     customer: StoreCustomer | null
     product: StoreProduct
     chatPerProduct?: boolean
   }
    
   export default function ChatWidget({
      customer,
      product,
      chatPerProduct,
   }: ChatWidgetProps) {
  
    const quickActions = {
       title: "Quick Actions",
       description:
         "Select an action from the options below or type a first message to start a conversation.",
       actions: [
         "Hi, I'm interested in this product.",
         "Can you tell me more about the price and payment options?",
         "Is the product still available?",
         "Can I schedule a viewing?",
       ],
     }

    if (!customer) {
       return null
    }

    const [defaultChat, setDefaultChat] = useState<any>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onOpenCloseWidget = (isOpen: boolean) => {
      setIsOpen(isOpen)
    }

    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const storeName = process.env.NEXT_PUBLIC_STORE_NAME

    useEffect(() => {
      if (isOpen) {
        console.log("Widget is open:", isOpen)
        const defaultChatKey = chatPerProduct ? product.id : storeId
        const defaultChatName = chatPerProduct ? product.title : storeName
  
        setDefaultChat({
          id: defaultChatKey,
          opponentUserId: storeId,
          type: "group",
          name: defaultChatName,
        })
      }
    }, [isOpen])

    return (
      <div>
        <ConnectyCubeChatWidget
          // credentials
          appId={process.env.NEXT_PUBLIC_CHAT_APP_ID}
          authKey={process.env.NEXT_PUBLIC_CHAT_AUTH_KEY}
          userId={customer.id}
          userName={`${customer.first_name} ${customer.last_name}`}
          // settings
          showOnlineUsersTab={false}
          splitView={true}
          // quick actions
          quickActions={quickActions}
          // notifications
          showNotifications={true}
          playSound={true}
          // moderation
          enableContentReporting={true}
          enableBlockList={true}
          // last seen
          enableLastSeen={true}
          // url preview
          enableUrlPreview={true}
          limitUrlsPreviews={1}
          // attachments settings
          attachmentsAccept={"image/*,video/*,.pdf,audio/*"}
          // default chat
          defaultChat={defaultChat}
          onOpenChange={onOpenCloseWidget}
        />
      </div>
    )
   }
   ```


4. update `tsconfig.json`:

   ```typescript
   {
     "compilerOptions": {
       "module": "nodenext",
       "moduleResolution": "nodenext",
       ...
     }
   }
   ```

6. update `storefront/src/app/[countryCode]/(main)/products/[handle]/page.tsx` to retrieve customer info and pass it to `ProductTemplate`:

   ```typescript
   const customer = await retrieveCustomer()
   return (
     <ProductTemplate
       product={pricedProduct}
       region={region}
       countryCode={params.countryCode}
       customer={customer}
     />
   )
   ```

7. Finally, connect `ChatWidget` component on product details page, e.g. `src/modules/products/templates/index.tsx`
   
   ```typescript
   <ChatWidget
     customer={customer}
     product={product}
     chatPerProduct={true}
   />
   ```

## Demo app

The complete demo app (backend + storefront) available https://github.com/ConnectyCube/chat-widget-medusa-plugin-demo-app

## How can I use it?

## DOCS

- https://developers.connectycube.com/js/chat-widget

## License

Apache 2.0
