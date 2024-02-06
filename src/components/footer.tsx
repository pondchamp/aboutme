import { SocialIcon, SocialIconProps } from "react-social-icons";

export const Footer = () => {
  const socialIconStyle: Partial<SocialIconProps> = {
    bgColor: "#FFEDDD",
    fgColor: "#160D02",
    style: { height: 35, width: 35 },
  };
  return (
    <div className="z-20 fixed bottom-0 inset-x-0 h-20 bg-gradient-to-t from-brown2 from-60% to-transparent flex items-end">
      <div className="p-3 absolute left-1/2 transform -translate-x-1/2 w-full max-w-[800px] flex justify-end gap-3">
        <SocialIcon
          url="https://linkedin.com/in/julianblair"
          {...socialIconStyle}
        />
        <SocialIcon
          url="https://github.com/pondchamp/aboutme"
          {...socialIconStyle}
        />
      </div>
    </div>
  );
};
