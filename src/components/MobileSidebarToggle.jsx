import { Menu } from "lucide-react";

const MobileSidebarToggle = ({ onClick }) => (
  <button
    onClick={onClick}
    className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-black rounded shadow"
  >
    <Menu className="bg-red-500" size={24} />
  </button>
);

export default MobileSidebarToggle;
