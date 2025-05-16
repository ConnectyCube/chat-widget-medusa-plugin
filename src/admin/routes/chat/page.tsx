import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ChatBubble, Spinner } from "@medusajs/icons";
import ConnectyCubeChatWidget from "@connectycube/chat-widget";
import { Container } from "@medusajs/ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/api/store";

const Chat = () => {
  const navigate = useNavigate();
  const { store, isLoading } = useStore(
    { fields: "id,name" },
    { refetchOnMount: "always" }
  );

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
    );
  }

  const portalStyles: React.CSSProperties = {
    minHeight: "calc(100vh - 110px)",
  };

  //@ts-ignore
  const appId = import.meta.env.VITE_CHAT_APP_ID || __VITE_CHAT_APP_ID__;
  //@ts-ignore
  const authKey = import.meta.env.VITE_CHAT_AUTH_KEY || __VITE_CHAT_AUTH_KEY__;

  return (
    <Container>
      <ConnectyCubeChatWidget
        appId={appId}
        authKey={authKey}
        userId={store.id}
        userName={store.name}
        splitView={true}
        open={true}
        embedView={true}
        hideWidgetButton={true}
        portalStyle={portalStyles}
        onUnreadCountChange={(count: number) =>
          console.log("unread messages count:", count)
        }
        onOnlineUsersCountChange={(count: number) =>
          console.log("online users count:", count)
        }
      />
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Chat",
  icon: ChatBubble,
});

export default Chat;
