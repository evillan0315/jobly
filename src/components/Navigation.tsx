import {
  FaUserCircle,
  FaLaptopCode,
  FaStar,
  FaQuoteRight,
} from "react-icons/fa";

// Define the interface for navigation items,
// using a generic type to allow for different icon libraries
interface NavigationItem<T> {
  name: string;
  link: string;
  icon: React.ReactNode;
}

// Create an array of navigation items,
// specifying the icon library type as `typeof FaUserCircle`
const navigationItems: NavigationItem<typeof FaUserCircle>[] = [
  {
    name: "About Me",
    link: "/about",
    icon: <FaUserCircle />,
  },
  {
    name: "Projects",
    link: "/projects",
    icon: <FaLaptopCode />,
  },
  {
    name: "Highlights",
    link: "/highlights",
    icon: <FaStar />,
  },
  {
    name: "Testimonials",
    link: "/testimonials",
    icon: <FaQuoteRight />,
  },
  /*   {
    name: "Blogs",
    link: "/blogs",
    icon: <FaBlog />,
  },
  {
    name: "Resume",
    link: "/resume",
    icon: <FaFileAlt />, 
  },*/
];
export default navigationItems;
// ... rest of the Navigation component using navigationItems ...
