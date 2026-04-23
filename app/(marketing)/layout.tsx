import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar";
import { AnnouncementBar } from "@/components/layout/announcement-bar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main" className="pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileBottomBar />
    </>
  );
}
