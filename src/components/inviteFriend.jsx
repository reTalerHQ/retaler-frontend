import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
export const InviteFriend = () => {
  const referralLink = 'https://retaler.com/invite?ref=yourUniqueCode';
  const [showToast, setShowToast] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Invite to ReTaler",
        text: "Join me on ReTaler!",
        url: referralLink,
      });
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };
    return (
        <>
            {showToast && (
        <div className="fixed top-20  bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-all">Link copied to clipboard</div>
      )}
            <div className="flex flex-col justify-between gap-3 lg:flex-col">
                <h1 className="text-lg font-bold lg:text-2xl"> Invite a Friend to ReTaler </h1>
                <section className="flex flex-row gap-4 rounded-xl border bg-white px-4 py-4 w-full md:max-w-[50vw] md:w-[50vw]">
                    <div className="flex flex-col gap-6">
                            <h2 className="text-lg font-semibold">
                                Earn rewards when your friends join ReTaler!
                                <p className="text-sm text-gray-500 font-normal">
                                    When they sign up using your link, you both get resources to increase your earnings.
                                </p>
                            </h2>
                            <h2 className="text-lg font-semibold">
                                Share Your Invite Link
                            </h2>
                            <div className="text-base font-semibold">
                                <Input 
                                    label="Your Referral Link: " 
                                    value={referralLink}
                                    onChange={() => {}}
                                    readOnly
                                    placeholder="https://retaler.com/invite?ref=yourUniqueCode" 
                                    className="bg-gray-100 text-gray-500 border-none w-[70%] h-12"
                                />
                            </div>
                            <div className="flex flex-row gap-4">
                                <Button
                                    variant='secondary'
                                    onClick={handleShare}
                                    className={`w-[140px] min-w-[120px] self-end mt-4`}
                                >
                                    Share Link
                                </Button>
                                <Button
                                    variant='default'
                                    onClick={handleCopy}
                                    className={`w-[140px] min-w-[120px] self-end mt-4`}
                                >
                                    Copy Link
                                </Button>
                            </div>
                    </div>
                </section>
            </div>
        </>
    )
}