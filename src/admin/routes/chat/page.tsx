import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubble, Spinner } from "@medusajs/icons"
import ConnectyCubeChatWidget from '@connectycube/chat-widget';
import { Container } from "@medusajs/ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useMe, usersQueryKeys } from "../../hooks/api/users";

const Chat = () => {
  const navigate = useNavigate()
  const { user, isLoading } = useMe({fields: '*store'}, { queryKey: usersQueryKeys.me(), refetchOnMount: "always" })

  console.log("user", user);
  
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/404");
    }
  }, [user, navigate]);

  if (isLoading || !user?.store?.name) {
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
        userId={user?.store?.id}
        userName={user?.store?.name}
        userAvatar={user?.avatar_url || undefined}
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