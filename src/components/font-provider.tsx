import { Inter, Quicksand } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const quicksand = Quicksand({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const FontProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return (
    <div className={`${inter.className} ${quicksand.className}`}>
      {children}
    </div>
  );
};
