import { Outlet } from "react-router-dom";
// import { useState } from "react";

// Components
// import ChatBotModal from "../features/chat-bot/ChatBotModal";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
// import Navbar from "../components/navbar/Navbar";

// Assets
// import chatBotIcon from "../assets/header/chatbot.png";

const Layout = () => {
  // const [isChatBotModalOpen, setisChatBotModalOpen] = useState<boolean>(false);

  // const toggleChatBotModal = () => setisChatBotModalOpen(!isChatBotModalOpen);
  // const closeChatBotModal = () => setisChatBotModalOpen(false);
  return (
    <div className="flex flex-col min-h-svh justify-between items-center w-full bg-green-50 dark:bg-slate-900 gap-5 lg:min-h-screen">
      <Header />

      <div className="flex-grow flex items-center justify-center mt-[100px]">
        <Outlet />
      </div>

      <Footer />
      {/* 
      <div
        onClick={toggleChatBotModal}
        className="fixed bottom-5 right-5 top w-16 h-16 rounded-full bg-white cursor-pointer"
      >
        <img className="w-16 h-16" src={chatBotIcon} alt="" />
      </div> */}

      {/* <ChatBotModal isOpen={isChatBotModalOpen} onClose={closeChatBotModal} /> */}
    </div>
  );
};

export default Layout;
