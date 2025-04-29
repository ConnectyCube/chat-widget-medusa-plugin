import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubble, Spinner } from "@medusajs/icons"
import ConnectyCubeChatWidget from '@connectycube/chat-widget';
import { Container } from "@medusajs/ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useStore } from "../../hooks/api/store";

const Chat = () => {
  const navigate = useNavigate()
  const { store, isLoading } = useStore({fields: 'id,name'}, { refetchOnMount: "always" })
  
  useEffect(() => {
    if (!store && !isLoading) {
      navigate("/404");
    }
  }, [store, navigate]);

  if (isLoading || !store) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="text-ui-fg-interactive animate-spin" />
      </div>
    )
  }

  const myStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    right: '0',
    top: '0',
    minWidth: '100%',
    minHeight: '100%',
    zIndex: '0',
  };

  const quickActions = {
    title: 'Quick Actions',
    description: 'Select an action from the options below or type a first message to start a conversation.',
    actions: [
      'Hello there!',
      'How are you doing today?',
      'What features of the ConnectyCube SDK do you find most useful and how have they improved your development process?',
      'Goodbye and take care!',
    ],
  };

  return (
    <Container>
      <ConnectyCubeChatWidget   
        appId={import.meta.env.VITE_CHAT_APP_ID}
        authKey={import.meta.env.VITE_CHAT_AUTH_KEY}
        userId={store.id}
        userName={store.name}
        splitView={true}
        open={true}
        hideWidgetButton={true}
        portalStyle={myStyles}
        quickActions={quickActions}
      />
    </Container>
  )
}


export const config = defineRouteConfig({
  label: "Chat",
  icon: ChatBubble,
})

export default Chat