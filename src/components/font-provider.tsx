import { Inter, Quicksand } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const quicksand = Quicksand({ weight: ["500", "600"], subsets: ["latin"] });

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
